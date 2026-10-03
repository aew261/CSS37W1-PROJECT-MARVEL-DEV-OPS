import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { supabase } from "../lib/supabase";

export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL ?? "http://localhost:3000/api",
        // Send the logged-in user's token so the backend can check the admin role.
        prepareHeaders: async (headers) => {
            try {
                const { data } = await supabase.auth.getSession()
                const token = data?.session?.access_token
                if (token) {
                    headers.set('Authorization', `Bearer ${token}`)
                }
            } catch (error) {
                console.error('Error getting auth token:', error)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({

        // Admin: add a new residence (multipart/form-data).
        // Fields: name, address, suburb, city, distance_km, landlord_name,
        //         landlord_phone, rooms, description, status,
        //         amenities (JSON array string), cover_photo (file), photos (file, repeated)
        createResidence: builder.mutation({
            query: (formData) => ({
                url: '/admin/residences',
                method: 'POST',
                body: formData,
            }),
        }),

    })
})

export const { useCreateResidenceMutation } = appApi