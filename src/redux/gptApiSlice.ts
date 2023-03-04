import { apiSlice } from "./apiSlice"

export const gptApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder: any) => ({
        gpt: builder.mutation({
            query: (prompt: any) => ({
                url: '/gpt',
                method: 'POST',
                body: { ...prompt, user_id: localStorage.getItem('user_id') }
            })
        }),
    })
})

export const {
    useGptMutation
} = gptApiSlice