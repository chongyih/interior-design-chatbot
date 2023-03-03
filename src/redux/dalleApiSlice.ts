import { apiSlice } from "./apiSlice"

export const dalleApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder: any) => ({
        dalle: builder.mutation({
            query: (prompt: any) => ({
                url: '/dalle',
                method: 'POST',
                body: { ...prompt }
            })
        }),
    })
})

export const {
    useDalleMutation
} = dalleApiSlice