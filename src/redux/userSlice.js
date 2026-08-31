import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        userData:null,
        otherUsers:null
        
    },
    reducers:{
        setUserData:(state,action)=>{
            state.userData = action.payload
        },

        setOtherUser:(state,action)=>{
            state.otherUsers = action.payload
        }
    
    }
})

export const {setUserData,setOtherUser}=userSlice.actions

export default userSlice.reducer