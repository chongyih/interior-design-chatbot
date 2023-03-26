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
        uploadBase: builder.mutation({
            query: (payload: any) => ({
                url: '/dalle/upload',
                method: 'POST',
                body: { ...payload },
            })
        }),
        getBase: builder.mutation({
            query: (chat_id: any) => ({
                url: '/dalle/get',
                method: 'POST',
                body: { chat_id }
            })
        }),
        deleteBase: builder.mutation({
            query: (chat_id: any) => ({
                url: '/dalle/delete',
                method: 'POST',
                body: { chat_id }
            })
        }),
        editBase: builder.mutation({
            query: (payload: any) => ({
                url: '/dalle/edit',
                method: 'POST',
                body: { ...payload }
            })
        })
    })
})

export const {
    useDalleMutation, useUploadBaseMutation, useGetBaseMutation, useDeleteBaseMutation, useEditBaseMutation
} = dalleApiSlice