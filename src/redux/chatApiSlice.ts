import { apiSlice } from "./apiSlice"

export const chatApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder: any) => ({
        getChatList: builder.mutation({
            query: (user_id: any) => ({
                url: '/chat',
                method: 'POST',
                body: { ...user_id }
            })
        }),
        getChatHistory: builder.mutation({
            query: (chat_id: any) => ({
                url: '/chat/history',
                method: 'POST',
                body: { ...chat_id }
            })
        }),
        createChat: builder.mutation({
            query: (user_id: any) => ({
                url: '/chat/create',
                method: 'POST',
                body: { ...user_id }
            })
        }),
        deleteChat: builder.mutation({
            query: (chat_id: any) => ({
                url: '/chat/delete',
                method: 'POST',
                body: { ...chat_id }
            })
        })
    })
})

export const {
    useGetChatListMutation, useGetChatHistoryMutation, useCreateChatMutation, useDeleteChatMutation
} = chatApiSlice