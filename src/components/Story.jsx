import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { AuthContext } from '../usercontext/AuthContext';

const Story = () => {
  const {user} = useContext(AuthContext)
  return (
    <Link to={`/addstory/${user?._id}`} className="border border-white w-[200px] m-3 flex justify-center items-center flex-col rounded-[5px] h-[100px] bg-transparent shadow-2xl">
      <h2 className='text-white font-bold text-xl text-center'>Add New Story</h2>
      <MdOutlineCreateNewFolder className='text-4xl text-white' />
    </Link>
  )
} 

export default Story

