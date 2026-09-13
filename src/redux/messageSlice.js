import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: "message",
    initialState: {
        messages: []
    },

    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload || [];
        },
        addMessage: (state, action) => {
            const newMsg = action.payload;
            if (!newMsg) return;
            const exists = state.messages.some(m => m._id === newMsg._id);
            if (!exists) {
                state.messages.push(newMsg);
            }
        },
        removeMessage: (state, action) => {
            state.messages = state.messages.filter(m => m._id !== action.payload);
        }
    }
});

export const { setMessages, addMessage, removeMessage } = messageSlice.actions;

export default messageSlice.reducer;