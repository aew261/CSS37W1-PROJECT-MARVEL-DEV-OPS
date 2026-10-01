import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, content-type',
        'Access-Control-Allow-Methods': 'POST',
      },
    });
  }

  try {
    const authHeader = req.headers.get('Authorization')!;
    const jwt = authHeader.replace('Bearer ', '');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!, 
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return new Response('Unauthorized', { status: 401 });

    const { limit, cursor } = await req.json();

    const {data:rpcData,error:rpcError}= await supabase.rpc("get_user_posts",{
        p_user_id:user.id,
        p_limit:limit,
        p_cursor:cursor
    })

    //const nextCursor =rpcData.length > 0 ? rpcData[rpcData.length - 1].reshared_at: null;

    
  
    if(rpcError){
      return new Response(JSON.stringify({
         error:rpcError.message,
         message:'posting unsuccesful'
      }),{status:400})
    }

    return new Response(JSON.stringify(rpcData),{status:200})
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({message:err.message}), { status: 500 });
  }
});







