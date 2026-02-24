import React, { useContext, useEffect } from 'react'
import { FiPlus } from 'react-icons/fi'
import { HiMinus } from 'react-icons/hi2'
import { TbCurrencyTaka } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { AuthContext } from '../usercontext/AuthContext'
import { MdOutlineNavigateNext } from "react-icons/md";
import RatingReview from './RatingReview'
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { ClockFading, Heart } from 'lucide-react';
import { FcLike } from "react-icons/fc";



const SingleProduct = ({product,desc,reviews,setDesc,setreviews ,rating =0 }) => {

    const [count,setCount] = useState(1)
    const [message,setMessage] = useState('')
    const [liked, setLiked] = useState(false);
    

    const { setProduct,addRecentView,addWishLists,addWishList } = useContext(AuthContext)

    useEffect(() => {
    const isLiked = addWishList.some(
        wishlist => wishlist?._id?.toString() === product?._id?.toString()
    );
    setLiked(isLiked);
    }, [addWishList, product]);



    const addLocal = {
        _id : product?._id,
        category : product?.category,
        title : product?.title,
        image : product?.image,
        price : product?.price,
        totalPrice : product?.price * count,
        quntity : count

    }

    const recentView = {
        _id : product?._id,
        category : product?.category,
        title : product?.title,
        image : product?.image,
        price : product?.price,
        average : product?.average,
        stock : product?.stock

    }

    addRecentView(recentView)

    

    const hnadleClick = (e) =>{
        e.preventDefault()
        const result =setProduct(addLocal)
        setMessage(result)
    }

    const handleWishList = () =>{
        addWishLists(recentView)
        setLiked(!liked)
    }
    // const rating = product.average
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
  return (
        <div className='flex flex-col justify-self-center items-center w-full '>
            <div className=' flex flex-col items-center justify-center pt-20  text-gray-900 lg:flex-row lg:w-[80%]'>
                <div className=' w-full   sm:relative '>
                    <img className='w-full px-4  sm:h-[500px] xl:h-[600px]'  src={`/uploads/product/images/${product?.image}`} alt="image" />
                    
                </div>
                <div className='w-full flex flex-col items-center justify-center '>
                    <h2 className='text-2xl font-semibold w-full px-4 text-center mt-3'>{product.title}</h2>
                    {/* <h3 className='font-semibold text-[18px] mt-5'>{product?.rating}</h3> */}
                    <div className='  mt-2 flex'>
                        <TbCurrencyTaka className='text-[25px]' />
                        <h3 className=' font-semibold text-[18px]'>{product?.price}</h3>
                    </div>
                    {rating !== 0 && <div className="flex space-x-1 text-amber-500 text-xl mt-3 ">
                        {[...Array(fullStars)].map((_, i) => (
                            <FaStar key={"full-" + i} />
                        ))}
                        {hasHalfStar && <FaStarHalfAlt />}
                        {[...Array(emptyStars)].map((_, i) => (
                            <FaRegStar key={"empty-" + i} />
                        ))}
                    </div>}
                    <div className='mt-5 font-semibold'>
                        <h2 className={product?.stock ? '' : 'text-red-600 capitalize'}>{product?.stock ? `Hurry! Only ${product?.stock} ${product?.category}s left.` : "out of stock"}</h2>
                    </div>
                    
                    {message?.message && <div className='mt-5 font-semibold w-[249px]'>
                        <h2 className={message?.status === 'alredyexist' ? 'text-red-600' : 'text-green-6 00'}>{message?.message}</h2>
                    </div>}
                    <div className='flex items-center mt-5 gap-2'>
                        <div className={`flex justify-center  border-1 border-gray-100 py-1 px-2 w-[160px] ${product.stock === 0 ? 'opacity-50 pointer-events-none' : ''}`}>
                            <h2 className=' mr-1 bg-gray-100 py-1.5 px-2 text-[12px]'>Quntity </h2>
                            <div className='flex justify-center items-center bg-gray-100  px-2'>
                                <HiMinus className={`mr-3.5 text-xl cursor-pointer ${
                                    count <= 1 ? 'text-gray-400 cursor-not-allowed' : ''
                                    }`} onClick={()=>{if(count > 1){setCount(prev => prev - 1);}}} />
                                <p className='select-none'>{count}</p>
                                <FiPlus className={`ml-3 text-xl cursor-pointer ${count === product?.stock ? 'opacity-50 pointer-events-none' : ''}`} onClick={()=>setCount(count+1)} />
                            </div>
                        
                        </div>
                        <div className=''>
                            <button className='bg-amber-500 text-black text-[12px] font-bold uppercase py-2.5 px-3 hover:bg-amber-400 cursor-pointer select-none     disabled:opacity-50 disabled:cursor-not-allowed' disabled={product?.stock === 0} onClick={hnadleClick}>add to cart</button>
                        </div>
                        <button className='flex items-center gap-2 border-1 border-white px-2 py-1.5 cursor-pointer' onClick={handleWishList}>
                            {liked ? <h2 className='font-semibold  capitalize hidden sm:flex'>Remove from wishlist</h2> : <h2 className='font-semibold capitalize hidden sm:flex'>Add to wishlist</h2>}
                            <div className='py-1'>
                                <svg
                                    aria-label='Like'
                                    // color={liked ? "rgb(237, 73, 86)" : ""}
                                    fill={liked ? "rgb(237, 73, 86)" : "transparent"}
                                    height='17'
                                    role='img'
                                    viewBox='0 0 24 22'
                                    width='19'
                                    className='text-red-500 '
                                    // onClick={handleLikeAndUnlike}
                                    >
                                    <path
                                        d='M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                    ></path>
				                </svg>
                            </div>
                        </button>
                        
                    </div>
                    
                    
                    <Link to={'/cart'} className={`w-[324px] my-3 py-2 font-bold uppercase text-black  flex justify-center bg-amber-500 hover:bg-amber-400 select-none ${liked ? 'sm:w-[485px]' : 'sm:w-[435px]'}`}>view cart</Link>
                    <div className='mt-2 w-full px-4 ' onClick={()=>{setDesc(true) ,setreviews(false)}}>
                        <div className='flex justify-between items-center  cursor-pointer px-2 py-1 bg-gray-100 '>
                            <h2 className='text-md font-semibold'>Description : </h2>
                            <MdOutlineNavigateNext className={`text-[27px] transition-transform duration-300 ${desc ? 'rotate-90' : ''}`} />
                        </div>
                        
                       
                    </div>
                    <div className='mt-3 w-full px-4' onClick={()=>{
                        setreviews(true)
                        setDesc(false)
                    }
                        
                        }>
                        <div className='flex justify-between items-center px-2  cursor-pointer py-1 bg-gray-100'>
                            <h2 className='text-md font-semibold'>Reviews : </h2>
                            <MdOutlineNavigateNext className={`text-[27px] transition-transform duration-300 ${reviews ? 'rotate-90' : ''}`} />
                        </div>
                        
                       
                    </div>
                </div>
                
            </div>
             <div className="w-full ">
            
                <hr className="text-gray-400 mt-5" />
            </div>
            
        </div>
    
  )
}

export default SingleProduct
