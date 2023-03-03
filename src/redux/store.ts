import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './apiSlice'
import chatHistorySlice from './chatHistorySlice'

export default configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        chatHistory: chatHistorySlice,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})
