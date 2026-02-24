import React, { useContext, useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { FiPlus } from "react-icons/fi";
import { HiMinus } from "react-icons/hi2";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AuthContext } from '../usercontext/AuthContext';
import { TbCurrencyTaka } from 'react-icons/tb';
import useSubmitCoupon from '../hooks/useSubmitCoupon';
import useGetToRated from '../hooks/useGetToRated';
import TopRated from './TopRated';

const ProductCart = () => {
  
    const { getProduct,removeSingleProduct,decreaseQuantity,increaseQuantity,user } = useContext(AuthContext)

    const [totalPrice,setTotalPrice] = useState('')

    const getTotalPrice = () =>{
        const quntity = getProduct && Object.values(getProduct).map((product)=> product.totalPrice)
        const sum = quntity && quntity.reduce((acc,val)=> acc + val, 0)
        return sum
    }
        
    useEffect(() => {
        const total = getTotalPrice();
        setTotalPrice(total)
    },[getProduct]);

    const navigate = useNavigate()

    const [coupon,setCoupon] = useState('')

    const  { handleSubmit,discount,message,error,isLoading } = useSubmitCoupon(coupon,setCoupon)

    const topRated = useGetToRated()
    

  return (
    <div className='min-h-screen flex pt-10  items-center flex-col select-none md:pt-25'>
        <h2 className='text-gray-800 text-2xl uppercase font-bold md:text-3xl'>Shopping cart</h2>
      <div className='mt-10  lg:flex lg:items-center lg:justify-between lg:gap-6'>
        <div className='flex flex-col gap-10 '>
            
            {getProduct && Object.values(getProduct).map((product)=>{
                return <div className='flex justify-center items-center bg-gray-100 w-[340px] px-10 pb-8 pt-5 shadow-md relative border-1 border-white sm:w-[550px] md:w-[650px] lg:w-[480px] xl:w-[550px] ' key={product._id}>
                <img className='w-[50px] h-[70px]  mr-2 sm:w-[100px] sm:h-[120px] sm:mr-5 md:w-[150px] md:h-[180px] md:mr-7 lg:w-[110px] lg:h-[130px] lg:mr-2' src={`/uploads/product/images/${product.image}`} alt="image" />
                <div className='flex flex-col items-center'>
                    <Link to={`/products/${product._id}`} className=' text-sm hover:underline font-semibold w-[270px] sm:text-lg md:w-[440px] md:text-xl lg:w-[350px] xl:w-[400px]'>{product.title}</Link>
                    <div className='  mt-2 flex'>
                        <TbCurrencyTaka className='text-[20px] sm:text-[25px] md:text-[30px]' />
                        <h3 className=' font-semibold text-[15px] sm:text-[20px] md:text-[23px]'>{Number(product?.totalPrice.toFixed(2))}</h3>
                    </div>
                    <div className='flex justify-center mt-2 border-1 border-white py-1 px-2 md:mt-4 md:py-2 '>
                        <h2 className=' mr-2 bg-white py-1 px-2 text-gray-800 md:text-lg'>Quntity : </h2>
                        <div className='flex justify-center items-center bg-white text-gray-800  px-3'>
                            <HiMinus className='mr-5 text-2xl cursor-pointer md:text-3xl' onClick={()=>decreaseQuantity(product._id)}/>
                            <p>{product.quntity}</p>
                            <FiPlus className='ml-5 text-2xl cursor-pointer md:text-3xl' onClick={()=>increaseQuantity(product._id)} />
                        </div>
                    </div>
                </div>
                <RiDeleteBin6Line className='absolute top-5 right-1 text-gray-800 text-2xl cursor-pointer sm:right-3' onClick={()=> removeSingleProduct(product._id)} />
            </div>
            })}
        </div>

        <div className=' bg-gray-100 w-full  pt-3 shadow-md mt-10 flex justify-center flex-col items-center border-1 border-white lg:w-[480px] xl:w-[550px]'>
            <div className=' flex items-center uppercase font-semibold text-xl text-gray-800'>
                <h2>Total : </h2>
                <div className=' flex text-gray-800'>
                    <TbCurrencyTaka className='text-[30px]' />
                    {discount ? <h3 className=' font-semibold text-xl'>{Number(totalPrice)*(1-discount/100).toFixed(2)}</h3> : <h3 className=' font-semibold text-2xl'>{Number(totalPrice).toFixed(2)}</h3>}
                </div>
            </div>
            <div className=' mt-5'>
                {error && <h2 className='text-center mb-3 capitalize font-semibold text-red-600'>{error}</h2>}
                {message && <h2 className='text-center mb-3 capitalize font-semibold text-green-600'>{message}</h2>}
                <form onSubmit={handleSubmit} className='flex'>
                    <input className='bg-white mr-2 w-[214px] py-2 px-3 sm:w-[340px] md:w-[485px] md:py-3 md:mr-4 lg:w-[335px]' type="text" name='coupon' id='coupon' placeholder='Add coupon' value={coupon} onChange={(e)=>setCoupon(e.target.value)}/>
                    <button className='bg-amber-500 w-[100px] py-2 px-3 uppercase font-semibold cursor-pointer hover:bg-amber-400' type='submit'>{isLoading ? 'LOAIDING...' : 'APPLY'}</button>
                </form>
            </div>
            <div className='mt-5 bg-amber-500 mb-6 hover:bg-amber-400'>
                <button className='uppercase font-semibold w-[334px] py-2 cursor-pointer sm:w-[450px] md:w-[600px] md:py-3 lg:w-[450px]' onClick={()=>navigate(`/order/${user?._id}`)}>place to order</button>
            </div>
        </div>
      </div>
      <TopRated topRated={topRated} />
    </div>
  )
}

export default ProductCart
