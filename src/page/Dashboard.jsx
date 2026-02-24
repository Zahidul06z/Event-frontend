import React from 'react'
import AddProduct from '../components/Product'
import AddBlog from '../components/Blog'
import AddStory from '../components/Story'
import OrderInfo from '../components/OrderInfo'
import Discount from './Discount'

const Dashboard = () => {
  return (
    <div className='min-h-screen pt-40 bg-indigo-900 w-full'>
      <div className='flex justify-center flex-wrap gap-3'>
        <AddProduct />
        <AddBlog />
        <AddStory />
      </div>
      <div className='mt-10 flex justify-center'>
        <OrderInfo />
      </div>
      <div className=' flex justify-center'>
        <Discount />
      </div>
    </div>
  )
}

export default Dashboard
