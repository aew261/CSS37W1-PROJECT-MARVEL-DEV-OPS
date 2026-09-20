import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://wwfmxbqrdilecwkwkjcp.supabase.co',
    }),
    endpoints: (builder)=>({
        
        // Log in
        signup:builder.mutation({
            query:(body)=>({
                url:'',
                method:'POST',
                body
            })
        }),

        // Signup
        login:builder.mutation({
            query:(body)=>({
                url:'',
                method:'POST',
                body
            })
        })


    })
})

export const {useSignupMutation, useLoginMutation}=authApi