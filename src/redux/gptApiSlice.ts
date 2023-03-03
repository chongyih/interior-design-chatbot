import { apiSlice } from "./apiSlice"

export const gptApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder: any) => ({
        gpt: builder.mutation({
            query: (prompt: any) => ({
                url: '/gpt3',
                method: 'POST',
                body: { ...prompt }
            })
        }),
    })
})

export const {
    useGptMutation
} = gptApiSlice