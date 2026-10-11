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






