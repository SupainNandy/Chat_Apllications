import React from 'react'
import Sidebar from '../component/Sidebar'
import MessageArea from '../component/MessageArea'
import { useSelector } from 'react-redux'
import getMessage from '../customHooks/getMessage'

const Home = () => {
  const { selectedUser } = useSelector((state) => state.user)
  getMessage()

  return (
    <div className='relative flex w-full h-[100dvh] overflow-hidden bg-[var(--color-app-bg)] text-[var(--color-text-primary)]'>
      <Sidebar />
      <MessageArea />
    </div>
  )
}

export default Home