import { fetchBaseQuery,createApi } from "@reduxjs/toolkit/query";

export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api",
    }),
    endpoints: (builder) =>({
        
    })
})