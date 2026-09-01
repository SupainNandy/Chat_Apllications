import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        userData:null,
        otherUsers:null,
        selectedUser:null
    },
    reducers:{
        setUserData:(state,action)=>{
            state.userData = action.payload
        },

        setOtherUser:(state,action)=>{
            state.otherUsers = action.payload
        },

        clearUserData:(state)=>{
            state.userData = null
            state.otherUsers = []
            state.selectedUser = null
        },

        setSelectedUser:(state,action)=>{
            state.selectedUser = action.payload
        }
    }
})

export const { setUserData, setOtherUser, clearUserData, setSelectedUser } = userSlice.actions

export default userSlice.reducer