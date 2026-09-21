
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js';

const corsHeaders = {
    'Access-Control-Allow-Origin': 'http://localhost:5173',
    'Access-Control-Allow-Headers':'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async(req)=>{
    try{
        if(req.method !== "POST"){
            return new Response(JSON.stringify({
                message:"Method not allowed",
                status:204,
                headers:corsHeaders
            }),{status:400})
        }

        const authHeader = req.headers.get('Authorization')!;
        const supabase = createClient(
              Deno.env.get('SUPABASE_URL')!,
              Deno.env.get('SUPABASE_ANON_KEY')!,
              { global: { headers: { Authorization: authHeader } } }
        );

        const body = await req.json()
        const {student_email, password}= body

        const {data:loginData,error:loginError}= await supabase.auth.signInWithPassword({email: student_email, password});

        if(loginError){
            return new Response(JSON.stringify({
                error:loginError,
                message:"Something went wrong."
            }),{status:400,
                headers: {
                    ...corsHeaders,
                    'Content-Type': 'application/json'
                }
            })
        }

        return new Response(JSON.stringify({
            success:true,
            message:"Account created"
        }),{status:200,
            headers: {
                 ...corsHeaders,
                'Content-Type': 'application/json'
            }
        })

    }catch(error){

        return new Response(JSON.stringify({
            error:error.message
        }),{status:500,
            headers: {
                ...corsHeaders,
                'Content-Type': 'application/json'
            }
        })

    }
})

