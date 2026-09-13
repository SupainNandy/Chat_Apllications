import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Landing from './pages/Landing'
import getCurrentUser from './customHooks/getCurrentUser'
import getOtherUsers from './customHooks/getOtherUsers'
import { useSelector, useDispatch } from 'react-redux'
import Home from './pages/Home'
import Profile from './pages/Profile'
import { setOnlineUser } from './redux/userSlice'
import { initSocket, disconnectSocket } from './socket'

const App = () => {
  getCurrentUser()
  getOtherUsers()
  let {userData,onlineUser} = useSelector(state=>state.user)
  let dispatch = useDispatch()

  useEffect(()=>{
    if(userData){
      const socketio = initSocket(userData._id)

      socketio.on("getOnlineUsers",(users)=>{
        dispatch(setOnlineUser(users))
      })

      return ()=>{
        disconnectSocket()
      }
    } else {
      disconnectSocket()
    }
  },[userData])



  return (
    <div>ssss
      <Routes>
        <Route path='/' element={userData ? <Home/> : <Landing />} />
        <Route path='/profile' element={userData ? <Profile/> : <Navigate to="/login" />} />
        <Route path='/login' element={!userData ? <Login/> : <Navigate to="/" />} />
        <Route path='/signup' element={!userData?<SignUp/>:<Navigate to="/profile" />} />
        {/* <Route path='*' element={<Navigate to='/login'  />} /> */}
      </Routes>
      
    </div>
  )
}

export default App
