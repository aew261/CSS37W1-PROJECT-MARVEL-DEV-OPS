//SEND REVIEWS

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js';

const corsHeaders = {
    'Access-Control-Allow-Origin': 'http://localhost:5173',
    'Access-Control-Allow-Headers':'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async(req)=>{
    if (req.method === 'OPTIONS') {
        return new Response(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'authorization, content-type',
            'Access-Control-Allow-Methods': 'POST',
        },});
    }

    if(req.method !== "POST"){
        return new Response(JSON.stringify({
            message:"Method not allowed"
        }),{status:401, headers:corsHeaders})
    }

    try{
        const authHeader=req.headers.get('Authorization')

        const supabase = createClient(
            Deno.env.get('SUPABASE_URL')!,
            Deno.env.get('SUPABASE_ANON_KEY')!, 
            { global: { headers: { Authorization: authHeader } } }
        );

        const {data:{user},error}= await supabase.auth.getUser()
        if (error || !user) return new Response('Unauthorized', { status: 401 });

        const {review, ratings, res_id}= await req.json()

        const {data,error:reviewError} = await supabase.from("reviews")
                                           .insert({
                                                residence_id:res_id,
                                                comment:review
                                           })
        if(reviewError){
            return new Response(JSON.stringify({
                error:reviewError,
                success:false
            }),{status:400, headers:corsHeaders})
        }

        const landlord=ratings.landlord;
        const infrastructure=ratings.infrastructure;
        const service=ratings.service;

        if(landlord > 0 || infrastructure > 0 || service >0){
                const {data:ratingData,error:ratingError}=await supabase.from("ratings")
                                        .upsert({
                                            res_id,
                                            landlord:ratings.landlord || 0 ,
                                            infrastructure:ratings.infrastructure || 0,
                                            service:ratings.service || 0
                                        })
                if(ratingError){
                    return new Response(JSON.stringify({
                        error:ratingError,
                        message:"An error occured"
                    }),{status:400, headers:corsHeaders})
                }
        }

        return new Response(JSON.stringify({
            successs:true,
            messagge:"Submition successfull"
        }),{status:200, headers:corsHeaders})
        
    }catch(error){
        return new Response(JSON.stringify({
            error:error.message,
        }),{status:500, headers:corsHeaders})
    }
})


// SEARCH
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js';

const corsHeaders = {
    'Access-Control-Allow-Origin': 'http://localhost:5173',
    'Access-Control-Allow-Headers':'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async(req)=>{
    if(req.method === 'OPTIONS'){
         return new Response(null, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'authorization, content-type',
                'Access-Control-Allow-Methods': 'POST',
            },});
    }

    if(req.method !== 'POST'){
        return new Response(JSON.stringify({
            message:"Method not allowed"
        }),{status:401, headers:corsHeaders})
    }
   try{
        const authHeader= await req.headers.get("Authorization")
        const supabase = createClient(
            Deno.env.get('SUPABASE_URL')!,
            Deno.env.get('SUPABASE_ANON_KEY')!, 
            { global: { headers: { Authorization: authHeader } } }
        );

        const {data:{user},error}= await supabase.auth.getUser()
        if (error || !user) return new Response('Unauthorized', { status: 401 });

        const {searchTerm}= await req.json();




   }catch(error){
        return new Response(JSON.stringify({
            error:error
        }),{status:500})
   }
})




// FETCH RESIDENCE INFOMATION
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js';

const corsHeaders = {
    'Access-Control-Allow-Origin': 'http://localhost:5173',
    'Access-Control-Allow-Headers':'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async(req)=>{

    if(req.method === 'OPTIONS'){
         return new Response(null, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'authorization, content-type',
                'Access-Control-Allow-Methods': 'POST',
            },});
    }

    if(req.method !== 'POST'){
        return new Response(JSON.stringify({
            message:"Method not allowed"
        }),{status:401, headers:corsHeaders})
    }


    try{
        const authHeader= await req.headers.get('Authorization')
        const supabase = createClient(
            Deno.env.get('SUPABASE_URL')!,
            Deno.env.get('SUPABASE_ANON_KEY')!, 
            { global: { headers: { Authorization: authHeader } } }
        );

        const {data:{user}, error}= await supabase.auth.getUser();
        if (error || !user) return new Response('Unauthorized', { status: 401 });

        const {student_email}= await req.json()

        const {data,error:profileError}=await supabase.from("users_profiles")
                                         .select('student_email')
                                         .eq('student_email', student_email)
                                         .maybeSingle()
        if(profileError){
            return new Response(JSON.stringify({
                success:false,
                error:profileError,
                message:"Student Email Not Found"
            }),{status:400, headers:corsHeaders})
        }

        const {error:updateError}=await supabase.from("users_profiles")
                                                .update({role:"admin"})
                                                .eq("student_email", student_email)
        if(updateError){
            return new Response(JSON.stringify({
                success:false,
                error:updateError,
                message:"Could not add Admin try again later"
            }),{status:400, headers:corsHeaders})
        }

        return new Responses(JSON.stringify({
            success:true,
            message:"Successfuly added admin"
        }),{status:200, headers:corsHeaders})
        

    }catch(error){
        return new Response(JSON.stringify({
            error:error.message
        }),{status:500, headers:corsHeaders})
    }
})


