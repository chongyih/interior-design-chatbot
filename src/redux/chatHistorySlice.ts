import { createSlice } from '@reduxjs/toolkit'

interface IChatHistory {
    gpt: string[]
    dalle: string[]
}

const initialState: IChatHistory = {
    gpt: [],
    dalle: [],
}

export const menuSlice = createSlice({
    name: 'chatHistory',
    initialState: initialState,
    reducers: {
        updateChatHistory: (state, action) => {
            state.gpt = [...state.gpt, action.payload.GPTPrompt]
            state.dalle = action.payload.DALLEPrompt
        },
    }
})

export const { updateChatHistory } = menuSlice.actions
export default menuSlice.reducer
export const getGPTHistory = (state: any) => state.menu.showMenu