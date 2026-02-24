import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { TbCurrencyTaka } from "react-icons/tb";
import { AuthContext } from '../usercontext/AuthContext';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

const GetProduct = ({products,onSend}) => {
  
  const {user} = useContext(AuthContext)

  const handleClick=(id)=>{
    onSend(id)
  }

  return (
    <div className=' mb-15 flex justify-center  '>
      <div className='flex flex-wrap gap-3 justify-center sm:gap-7'>
        {
        products && Object.values(products).map((product)=>{
            
            return <div className='w-[160px] border-1 border-white bg-gray-100 py-2 shadow-2xl relative sm:w-[250px] md:w-[300px] lg:w-[300px] xl:w-[380px]' key={product?._id}>
                <Link className='flex flex-col items-center justify-center' to={`/products/${product?._id}`}>
                    <img className='w-[100px] mb-2 sm:w-[120px] md:w-[200px] lg:w-[250px] xl:w-[300px]' src={`uploads/product/images/${product.image}`} alt="image" />
                    <h2 className='uppercase px-1 text-sm font-semibold text-gray-800 text-center lg:text-lg lg:mt-5'>{product?.title}</h2>
                    {/* <h3 className='mt-3 text-gray-800 text-[15px] font-semibold'>{product?.rating}</h3> */}
                    <div className='text-gray-800  mt-1 flex lg:mt-3'>
                        <TbCurrencyTaka className='text-[20px] lg:text-[30px]' />
                        <h3 className=' text-gray-800 font-semibold text-[15px] lg:text-[20px]'>{product?.price}</h3>
                    </div>

                    {product?.average !== 0 && (() => {
                      const score = parseFloat(product?.average);
                      const full = Math.floor(score);
                      const half = score % 1 >= 0.5;
                      const empty = 5 - full - (half ? 1 : 0);
                    
                        return (
                            <div className="flex space-x-1 text-amber-500 text-md mt-1 lg:mt-3 lg:text-xl">
                                {[...Array(full)].map((_, i) => <FaStar key={`full-${i}`} />)}
                                {half && <FaStarHalfAlt key="half" />}
                                {[...Array(empty)].map((_, i) => <FaRegStar key={`empty-${i}`} />)}
                            </div>
                        );
                    })()}

                      {product?.stock === 0 && <div className=' font-semibold text-red-600 text-center mt-3'>
                    <h3>Out of Stock</h3>
                  </div>} 

                    <button className='mt-2 bg-amber-500 uppercase py-2 px-3 font-bold cursor-pointer hover:bg-amber-400 lg:my-3 lg:text-lg'>view details</button>
                </Link>
                 {user?.role === 'admin' && <RiDeleteBin6Line className="absolute top-4 right-3 text-[25px] text-gray-800 hover:text-red-600 cursor-pointer" onClick={() => handleClick(product?._id)} />}
                 
            </div>
        })
      }
      </div>
    </div>
  )
}

export default GetProduct
