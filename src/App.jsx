import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Landing from './pages/Landing'
import { useSelector, useDispatch } from 'react-redux'
import Home from './pages/Home'
import Profile from './pages/Profile'
import { setOnlineUser, setUserData, setOtherUser } from './redux/userSlice'
import { initSocket, disconnectSocket } from './socket'
import api from './api'

const App = () => {
  const { userData } = useSelector(state => state.user);
  const dispatch = useDispatch();

  // Fetch current user and other users on mount
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const result = await api.get('/api/user/current');
        dispatch(setUserData(result.data.user || result.data));
      } catch (err) {
        console.error('Failed to fetch current user:', err);
      }
    };
    const fetchOtherUsers = async () => {
      try {
        const result = await api.get('/api/user/others');
        dispatch(setOtherUser(result.data.users || []));
      } catch (err) {
        console.error('Failed to fetch other users:', err);
      }
    };
    fetchCurrentUser();
    fetchOtherUsers();
  }, [dispatch]);

  // Socket handling for online users
  useEffect(() => {
    if (userData) {
      const socket = initSocket(userData._id);
      socket.on('getOnlineUsers', users => {
        dispatch(setOnlineUser(users));
      });
      return () => {
        disconnectSocket();
      };
    } else {
      disconnectSocket();
    }
  }, [userData, dispatch]);



  return (
    <div>
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
