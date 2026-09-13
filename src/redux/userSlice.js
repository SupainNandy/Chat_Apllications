import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        userData:null,
        otherUsers:null,
        selectedUser:null,
        socket:null,
        onlineUser:null
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
        },
        setSocket:(state,action)=>{
            state.socket = action.payload
        },
        setOnlineUser:(state,action)=>{
            state.onlineUser = action.payload
        }
    }
})

export const { setUserData, setOtherUser, clearUserData, setSelectedUser, setSocket, setOnlineUser } = userSlice.actions

export default userSlice.reducer