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
        editDalle: builder.mutation({
            query: (params: any) => ({
                url: '/dalle/edit',
                method: 'POST',
                body: { ...params }
            })
        }),
    })
})

export const {
    useDalleMutation, useEditDalleMutation
} = dalleApiSlice