import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { serverUrl } from "../config"
import { setOtherUser } from "../redux/userSlice"

const getOtherUsers = () =>{
    const dispatch = useDispatch()

    useEffect(()=>{
        const fetchUsers=async()=>{
            try{
                let result = await axios.get(`${serverUrl}/api/user/others`, {
                    withCredentials: true,
                })
                dispatch(setOtherUser(result.data.users || result.data))

            }catch(err){
                console.log(err)
            }
        }

        fetchUsers()
    }, [dispatch])
}

export default getOtherUsers