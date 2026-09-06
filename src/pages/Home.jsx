import React from 'react'
import Sidebar from '../component/Sidebar'
import MessageArea from '../component/MessageArea'

const Home = () => {
  return (
    <div className='flex w-full h-[100vh] overflow-hidden '>
      <Sidebar/>
      <MessageArea/>
    </div>
  )
}

export default Home