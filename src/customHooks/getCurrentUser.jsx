import axios from "../api";
import { useEffect } from "react"
import { serverUrl } from "../config"
import { useDispatch, useSelector } from "react-redux"
import { setUserData } from "../redux/userSlice"

const getCurrentUser = () =>{
    const dispatch = useDispatch()
    let {userData} = useSelector(state=>state.user)
    useEffect(()=>{
        const fetchUser=async()=>{
            try{
                let result = await axios.get(`${serverUrl}/api/user/current`, {
                    withCredentials: true,
                })
                dispatch(setUserData(result.data.user || result.data))

            }catch(err){
                console.log(err)
            }
        }

        fetchUser()
    },[])
}

export default getCurrentUser