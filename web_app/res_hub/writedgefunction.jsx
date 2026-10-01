
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js';

const corsHeaders = {
    'Access-Control-Allow-Origin': 'http://localhost:5173',
    'Access-Control-Allow-Headers':'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async(req)=>{
    try{

        if(req.method !== "GET"){
            return new Response(JSON.stringify({
                message:"Method not allowed"
            }),{status:405,
                headers:corsHeaders
            })
        }
        

        const authHeader = req.headers.get('Authorization')!;
        const supabase = createClient(
              Deno.env.get('SUPABASE_URL')!,
              Deno.env.get('SUPABASE_ANON_KEY')!,
              { global: { headers: { Authorization: authHeader } } }
        );

        const { data: { user }, error } = await supabase.auth.getUser();
        if (error || !user) return new Response('Unauthorized', { status: 401 });

        const {data:res_data, error:residenceError}=await supabase.from("residence_listings")
                                          .select('*')

        if(residenceError){
            return new Response(JSON.stringify({
                error:residenceError.message,
                message:"Unable to fecth, refresh your page"
            }),{satus:400,
                headers:corsHeaders
            })
        }

        
    }catch(error){

        return new Response(JSON.stringify({
            error:error.message,
            data:res_data
        }),{status:500,
            headers: {
                ...corsHeaders,
                'Content-Type': 'application/json'
            }
        })

    }
})

