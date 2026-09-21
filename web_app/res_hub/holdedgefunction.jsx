import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js"; 
import { z } from "npm:zod";
import { Redis } from "https://esm.sh/@upstash/redis@v1.36.4";
import { Resend } from "npm:resend";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL"),
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
);

const redis = new Redis({
        url: Deno.env.get("REDIS_REST_URL"),
        token: Deno.env.get("REDIS_TOKEN")
})

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const signupSchema=z.object({
    firstName: z.string()
    .trim()
    .min(1, "Required")
    .regex(/^[A-Za-z\s]+$/, "Field must contain letters"),

      lastName: z.string()
        .trim()
        .min(1, "Required")
        .regex(/^[A-Za-z\s]+$/, "Field must contain letters"),
      terms_version:z.string()
                  .trim()
                  .min(1, "Required"),

      email: z.string()
        .trim()
        .min(1, "Required")
        .email("Invalid email address"),
      
      deviceInfo:z.object({
        brand:z.string().min(1,"Required"),
        deviceName:z.string().min(1,"Required")
      }),
      password: z.string()
        .trim()
        .min(1, "Required")
        .min(8, "Must be at least 8 characters long")
        .regex(/^(?=.*[A-Z]).*$/, "Must contain at least 1 uppercase letter")
        .regex(/^(?=.*[a-z]).*$/, "Must contain at least 1 lowercase letter")
        .regex(/^(?=.*\d).*$/, "Must contain at least 1 number")
        .regex(/^(?=(?:.*[\W_]){2,}).*$/, "Must contain at least 2 special characters"),

        location: z.object({
            latitude: z.number(),
            longitude: z.number(),
            country: z.string().optional()
        }).nullable().optional()

  
})

async function hashIp(ip) {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip); // convert string to Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  
  // Convert ArrayBuffer to hex
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

serve(async(req)=>{
  try{

      if(req.method !== 'POST'){
          return new Response(JSON.stringify({
            error:"Method not allowed"
        }),{status:405})
      }

      const body = await req.json();
      const result = signupSchema.safeParse(body);

      if(!result.success){
          return new Response(JSON.stringify({
              error: result.error.flatten().fieldErrors
          }),{status:400})
      }

      const {firstName,lastName,email,password,location,terms_version, deviceInfo}=result.data
      

      const raw = req.headers.get('x-forwarded-for')||req.headers.get("cf-connecting-ip") 
                ||req.headers.get("x-real-ip") || "unknown"
      const ip = raw ? raw.split(',')[0].trim() : 'unknown';//ip address of the user

      const ipKey = `signup:ip:${ip}`;

      const attempts = await redis.incr(ipKey);

      if (attempts === 1) {
          await redis.expire(ipKey, 3600); // 1 hour
      }

      if (attempts > 5) {
          return new Response(
              JSON.stringify({
                  message: "Too many accounts created. Please try again later."
              }),
              { status: 429 }
          );
      }

      const ipHash=await hashIp(ip)

      
      let country = "UNKNOWN";
      try {
        const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
        const geoData = await geoRes.json();
        country = geoData.country_name ||req.headers.get("cf-ipcountry") ||location?.country || "UNKNOWN"; // country of the user
      } catch (_) {}

      const{data:emailData,error:emailError}=await supabase.from("users_profiles")
                            .select('*')
                            .eq("email",email)

      if(emailData && emailData.length > 0){
          return new Response(JSON.stringify({
                        error:emailError, message:"Email already exists"
          }),{status:400,headers: { "Content-Type": "application/json" }})
      }
     
      const {data:createData,error:createError}=await supabase.auth.signUp({
          email,
          password,
          email_confirm:true,
          user_metadata:{
             first_name:firstName,
             last_name:lastName
          }
      })

      if(createError){
          return new Response(JSON.stringify({
              error:createError,
              message:'Signup error could not signup'
          }))
      }
       const lower_case_email=email.toLowerCase()
      const {data:rpcData,error:rpcError}= await supabase.rpc('create_user_profile',{
            p_user_id: createData.user.id,
            p_first_name: firstName,
            p_last_name: lastName,
            p_email: lower_case_email,
            p_ip_hash: ipHash,
            p_country: country,
            p_lat: location?.latitude ?? null,
            p_long: location?.longitude ?? null,
            p_terms_version:terms_version,
            p_device_info:deviceInfo
      })

      if (rpcError) {

            return new Response(JSON.stringify({
              error: rpcError,
              message: "Profile creation failed"
            }), { status: 500 });
            
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      await redis.set(`otp:${email.toLowerCase()}`, otp, { ex: 300 });
    try{
      const results= await resend.emails.send({
          from: "GH app <onboarding@resend.dev>",
          to: email,
          subject: "Verify your account",
          html: `
            <div style="font-family: sans-serif">
              <h2>Verify your email</h2>
              <p>Your OTP is:</p>
              <h1 style="letter-spacing: 4px">${otp}</h1>
              <p>This code expires in 5 minutes.</p>
            </div>
          `
      });

      if (results.error) {
          console.error("Resend error:", result.error);

          return new Response(JSON.stringify({
            success: false,
            message: "Email failed",
            error: results.error
          }), { status: 500 });
      }
    }catch(err){
        console.error("Email send failed:", err);

        return new Response(JSON.stringify({
          success: false,
          message: "Failed to send email",
          error: err.message
        }), { status: 500 });
    }
     

    const expiresAt = Date.now() + 300000;

    return new Response(JSON.stringify({
            success:true,
            expiresAt:expiresAt,
            message:"Successfully created account, Verify email account",
            otp:otp
    }),{status:201})

  }catch(err){

    return new Response(JSON.stringify({
      error: err.message
    }), { status: 500 })
    
  }
})



import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js';
import { Redis } from "https://esm.sh/@upstash/redis@v1.36.4";
import { z } from "npm:zod";

const loginSchema=z.object({
    email:z.string().min(1,"Required"),
    password:z.string().min(1,"Required")
})
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, content-type',
        'Access-Control-Allow-Methods': 'POST, GET',
      },
    });
  }

  try {
    const authHeader = req.headers.get('Authorization')!;
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!, 
      { global: { headers: { Authorization: authHeader } } }
    );

    const redis = new Redis({ url: Deno.env.get('REDIS_REST_URL')!, token: Deno.env.get('REDIS_TOKEN')! });

    
    const body = await req.json()
    const result= loginSchema.safeParse(body)

    if(!result.success){
        return new Response(JSON.stringify({
              success:false,
              error: result.error.flatten().fieldErrors
        }),{status:400})
    }

    const ip =req.headers.get("x-forwarded-for") ??req.headers.get("cf-connecting-ip") ??"unknown";

    const {email, password}= result.data

    const emailKey=`login:user-email:${email}`
    const ipKey = `login:ip:${ip}`;

    const emailAttempts= await redis.incr(emailKey)
    const ipAttempts = await redis.incr(ipKey);

    if (ipAttempts === 1) {
        await redis.expire(ipKey, 60);
    }
    if(emailAttempts === 1){
        await redis.expire(emailKey, 60);
    }



    if (emailAttempts > 5) {
        return new Response(JSON.stringify({
            message: "Too many login attempts."
        }),{status: 429});
    }

    if (ipAttempts > 50) {
        return new Response(
            JSON.stringify({
                message: "Too many login attempts from this network."
            }),
            { status: 429 }
        );
    }

    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({ email, password })

    if(loginError){
        return new Response(JSON.stringify({
            success:false,
            error:loginError,
            message:"Something went wrong"
        }),{status:400})
    }

    await redis.del(emailKey);

    return new Response(JSON.stringify({
        success:true,
        loginData
    }),{status:200})


  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  }
});




