import axios from "../api";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setOtherUser } from "../redux/userSlice"

const getOtherUsers = () =>{
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.user)

    useEffect(()=>{
        const fetchUsers=async()=>{
            // Only fetch if a user is logged in
            if (!userData) return;
            
            try{
                let result = await axios.get(`/api/user/others`)
                dispatch(setOtherUser(result.data.users || result.data))

            }catch(err){
                console.log(err)
            }
        }

        fetchUsers()
    }, [dispatch, userData])
}

export default getOtherUsers