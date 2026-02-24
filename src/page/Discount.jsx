import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../usercontext/AuthContext'

const Discount = () => {

    const {user} = useContext(AuthContext)

  return (
    <div className='flex justify-center flex-wrap gap-3 mb-10'>
        <Link to={`/addcoupon/${user?._id}`} className='border border-white w-[200px] mt-3  flex justify-center items-center flex-col rounded-[5px] h-[100px] bg-transparent shadow-2xl">
        '>
            <h2 className='text-white text-2xl uppercase'>add coupon</h2>
        </Link>
    </div>
  )
}

export default Discount
