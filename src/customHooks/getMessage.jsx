import api from "../api";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { setMessages } from "../redux/messageSlice"

const getMessage = () =>{
    const dispatch = useDispatch()
    let {userData,selectedUser} = useSelector((state)=>state.user)

    useEffect(()=>{
        const fetchUsers=async()=>{
            if (!selectedUser) return;
            try{
                let result = await api.get('/api/message/get/');
                dispatch(setMessages(Array.isArray(result.data) ? result.data : (result.data.data || [])))

            }catch(err){
                console.log(err)
            }
        }

        fetchUsers()
    }, [selectedUser,userData])
}

export default getMessage