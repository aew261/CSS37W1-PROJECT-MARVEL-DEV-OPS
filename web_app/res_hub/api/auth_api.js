import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { supabase } from '../lib/supabase';
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://glgrqftlgnoccabxcndo.supabase.co/functions/v1',
        prepareHeaders: async (headers, { getState }) => {
                        try {
                                // Get current session
                                const { data } = await supabase.auth.getSession();
                                const token = data?.session?.access_token;
                                                    
                                if (token) {
                                    headers.set('Authorization', `Bearer ${token}`);
                                }
                                return headers;
                        } catch (error) {
                                console.error('Error getting auth token:', error);
                                return headers;
                        } 
                }
    }),
    endpoints: (builder)=>({
        
        // Sign Up
        signup:builder.mutation({
            query:(body)=>({
                url:'/signup_user',
                method:'POST',
                body
            })
        }),

        // Log in
        login:builder.mutation({
            query:(body)=>({
                url:'/login-user',
                method:'POST',
                body
            })
        })


    })
})

export const {useSignupMutation, useLoginMutation}=authApi