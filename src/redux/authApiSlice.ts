import { apiSlice } from "./apiSlice"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder: any) => ({
        createUser: builder.mutation({
            query: (name: any) => ({
                url: '/user/create',
                method: 'POST',
                body: { ...name }
            })
        }),
    })
})

export const {
    useCreateUserMutation
} = authApiSlice