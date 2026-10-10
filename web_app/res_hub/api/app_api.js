import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { supabase } from '../lib/supabase';


export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({

        baseUrl: "https://glgrqftlgnoccabxcndo.supabase.co/functions/v1",
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
    endpoints: (builder) =>({

        fetchListings:builder.query({
            query:()=>({
                url:'/get_residence_listings',
                method: 'GET'
            })
        }),

        uploadResidence:builder.mutation({
            query:(body)=>({
                url:"/upload-residence",
                method:"POST",
                body
            })
        }),

        fetchResInfo:builder.query({
            query:(res_id)=>({
                url:'/get_res_info',
                method:"GET",
                params:{res_id}
            })
        }),

        sendReviews:builder.mutation({
            query:(body)=>({
                url:'/send-reviews',
                method:"POST",
                body
            })
        })



    })
})

export const {useFetchListingsQuery, useUploadResidenceMutation, useFetchResInfoQuery, useSendReviewsMutation}=appApi;
       
