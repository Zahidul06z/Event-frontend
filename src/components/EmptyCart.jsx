import React from 'react'
import { Link } from 'react-router-dom'
import { GiShoppingCart } from "react-icons/gi";
const EmptyCart = () => {
  return (
    <div className='w-full py-15 flex flex-col gap-y-5 items-center justify-center md:py-30'>
        <div>
            <h2 className='text-2xl uppercase font-semibold text-gray-800 md:text-4xl'>Shopping cart</h2>
        </div>
        <div className='flex flex-col justify-center items-center  text-gray-800'>
           <GiShoppingCart className='text-9xl mb-3 text-white' />
            <h2 className='uppercase text-2xl text-center font-bold text-red-600 md:text-4xl'>Your cart is currently empty</h2>
            <h3 className='mt-5 capitalize font-semibold text-xl text-center md:text-2xl'>You have no items in your cart. Go find the product you like.</h3>
            <Link to={'/products'} className='bg-amber-500 mt-8 text-black font-bold py-2 px-4 uppercase hover:bg-amber-400 md:text-xl'>Shopping</Link>
        </div>
    </div>
  )
}

export default EmptyCart
