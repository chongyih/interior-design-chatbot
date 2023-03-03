import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'same-origin',
    // prepareHeaders: (headers: Headers, { getState }: any) => {
    //     const token = getState().auth.token
    //     if (token) {
    //         headers.set("authorization", `Bearer ${token}`)
    //     }
    //     return headers
    // }
})

export const apiSlice: any = createApi({
    baseQuery: baseQuery,
    endpoints: builder => ({})
})