import React from 'react'
import { Link } from 'react-router-dom'
import { TfiShoppingCartFull } from "react-icons/tfi";
import { MdPendingActions } from "react-icons/md";
import { CgMail } from "react-icons/cg";
import useSendMailAllSubscriber from '../hooks/useSendMailAllSubscriber';

const OrderInfo = () => {

  const { handleClick,loading } = useSendMailAllSubscriber()

  return (
    <div className='flex justify-center flex-wrap gap-3 mb-10'>
      <Link className="border border-white w-[200px] m-3 flex justify-center items-center flex-col rounded-[5px] h-[100px] bg-transparent shadow-2xl">
        <h2 className='text-white font-bold text-xl text-center uppercase'>pending delevery</h2>
        <div className='flex gap-3 '>
            <h2 className='text-white text-2xl'>50</h2> 
            <MdPendingActions className='text-4xl text-white' />
        </div>
      </Link>
      <Link className="border border-white w-[200px] m-3 flex justify-center items-center flex-col rounded-[5px] h-[100px] bg-transparent shadow-2xl">
        <h2 className='text-white font-bold text-xl text-center uppercase'>total order</h2>
        <div className='flex gap-3'>
            <h2 className='text-white text-2xl'>100</h2>
            <TfiShoppingCartFull className='text-4xl text-white' />
        </div>
      </Link>
      <button className='border border-white w-[200px] m-3 flex justify-center items-center flex-col rounded-[5px] h-[100px] bg-transparent shadow-2xl font-bold cursor-pointer' onClick={handleClick}>
        {loading ? <h2 className='text-white text-2xl uppercase'>Loading...</h2> : <div className='flex flex-col flex-center items-center'>
          <h2 className='text-white text-2xl uppercase'>Send Mail All Subscriber</h2>
          <CgMail className='text-4xl text-white' /> 
        </div> }
      </button>
    </div>
  )
}

export default OrderInfo
