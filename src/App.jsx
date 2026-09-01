import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import SignUp from './pages/SignUp'
import Login from './pages/Login'
import getCurrentUser from './customHooks/getCurrentUser'
import getOtherUsers from './customHooks/getOtherUsers'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import Profile from './pages/Profile'

const App = () => {
  getCurrentUser()
  getOtherUsers()
  let {userData} = useSelector(state=>state.user)
  return (
    <div>
      <Routes>
        <Route path='/' element={userData?<Home/>:<Navigate to="/login" />} />
        <Route path='/profile' element={userData?<Profile/>:<Navigate to="/login" />} />
        <Route path='/login' element={!userData?<Login/>:<Navigate to="/" />} />
        <Route path='/signup' element={!userData?<SignUp/>:<Navigate to="/profile" />} />
        {/* <Route path='*' element={<Navigate to='/login'  />} /> */}
      </Routes>
      
    </div>
  )
}

export default App
