import React from 'react'
import { useParams } from 'react-router-dom'
import useGetTrackProduct from '../hooks/useGetTrackProduct'
import { TbCurrencyTaka } from 'react-icons/tb'
import { RxCross2 } from 'react-icons/rx'
import { MdPendingActions } from "react-icons/md";
import { FcShipped } from "react-icons/fc";
import { FaShoppingBag, FaShoppingBasket } from "react-icons/fa";
import { IoMdArrowDropup } from "react-icons/io";
import { BaggageClaim } from 'lucide-react';



import { FaShoppingCart, FaUser, FaBoxOpen, FaFileInvoice, FaCheck } from 'react-icons/fa';


// export default function OrderProgress() {
//   return (
//     <div className="flex flex-col items-center space-y-6">
//       <div className="text-green-500 text-4xl">
//         <FaShoppingCart />
//       </div>
//       <div className="text-gray-400 text-4xl">
//         <FaUser />
//       </div>
//       <div className="text-gray-400 text-4xl">
//         <FaBoxOpen />
//       </div>
//       <div className="text-gray-400 text-4xl">
//         <FaFileInvoice />
//       </div>
//       <div className="text-gray-400 text-4xl">
//         <FaFileInvoice />
//       </div>
//     </div>
//   );
// }



const ProductTrackPage = () => {

  const {id} = useParams()
  
  const { trackProduct,trackStatus,isloading,error } = useGetTrackProduct(id)
  console.log(trackStatus)

return (
    <div className="bg-white p-6  my-20 w-full text-gray-800 md:my-30">
      <div className="text-center ">
    

        {error && <p className="text-red-500 mt-4">{error}</p>}

          {/* Loading */}
           {isloading && <div className="flex justify-center items-center h-full mt-10">
      <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
    </div>}


        
          {trackProduct && 
            <div  className="mt-6 space-y-3 text-start  flex flex-col items-center justify-center">

              <div className='mb-15 uppercase font-bold text-2xl'><h2>order status</h2></div>

              {trackStatus && <div className='space-y-3'>


            {trackStatus && Object.values(trackStatus).map((status, index) => {
              const isoString = status?.createdAt;
              const date = new Date(isoString);

              const optionsDate = { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Dhaka' };
              const formattedDate = date.toLocaleDateString('en-GB', optionsDate);

              const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Dhaka' };
              const formattedTime = date.toLocaleTimeString('en-GB', optionsTime);

              return (
                <div key={status?._id} className="flex flex-col">
                  <div className="flex items-center   gap-3 capitalize">
                    <div className='flex flex-col items-center justify-center'>
                      <div className={`text-4xl p-1.5 rounded-full ${index === 0 ? 'bg-green-500' : 'bg-gray-200'}`}>
                        {status?.title === 'pending' && <MdPendingActions className='text-white' />}
                        {status?.title === 'confirm' && <FaCheck className='text-white'/>}
                        {status?.title === 'shipped' && <FcShipped />}
                        {status?.title === 'delivered' && <BaggageClaim className="text-white w-8 h-8" />}
                      </div>
        
                    {index !== trackStatus.length - 1 && (
                      <div className="w-px h-20  border-l-2 border-dotted border-gray-400 mt-3 "></div>
                    )}
                  </div>

          <div className='-mt-20'>
            <h2 className={`font-semibold ${status?.title === 'pending'? 'mt-15' : ''}`}>{status?.title}</h2>
            <h2>{status?.description}</h2>
            <div className="flex gap-2">
              <h2>{formattedDate},</h2>
              <h2>{formattedTime}</h2>
            </div>
          </div> 

      </div>
    </div>
  );
})}

          </div>}
           
            <div>
              <div>
                <h2 className='capitalize text-lg font-semibold mb-5 md:text-2xl mt-13'>order summary : </h2>
              </div>
              <div>
                
                {trackProduct?.items && Object.values(trackProduct?.items).map((item,index)=>{
                  
                  return <div  className='w-full ' key={index} >
                      <div className='flex w-full  justify-between items-center bg-gray-100 px-3 py-2 my-5'>
                        <div className='flex gap-2 justify-between items-center'>
                          <img className='w-[60px] md:w-[80px] md:mr-3' src={`/uploads/product/images/${item.image}`} alt="image" />
                          <div className='flex flex-col'>
                            <h4 className='w-[250px] text-justify mb-3 sm:w-[280px] md:w-[500px]'>{item.title}</h4>
                            <div className='flex gap-3 items-center'>
                              <div className=' flex'>
                                <TbCurrencyTaka className='text-[20px]' />
                                <h3>{item?.price}</h3>
                              </div>
                              <RxCross2 className='text-black ' />
                              <h4 className=''> {item.quantity}</h4>
                            </div>
                          </div>
                          
                          
                        </div>
                        <div>
                          <div className=' flex'>
                            <TbCurrencyTaka className='text-[20px]' />
                            <h3 className=' font-semibold text-[15px]'>{item?.total}</h3>
                          </div>
                        </div>
                      </div>
                      {/* <hr className='my-3 text-gray-400' /> */}
                  </div>
               
                })
                }
              </div>
              <div className='flex justify-between bg-gray-100 py-2 px-3'>
                <h4 className=' font-semibold'>Shipping {trackProduct?.shippingCost === 100 ? 'Barisal' : 'Outside Barisal'}</h4>
                <div className=' flex'>
                  <TbCurrencyTaka className='text-[20px]' />
                  <h3 className=' font-semibold text-[15px]'>{trackProduct?.shippingCost}</h3>
                </div>
              </div>
             
              <div className='flex justify-between mb-7 bg-gray-100 px-3 py-2 mt-5'>
                <h3 className='text-xl font-semibold'>Total</h3>
                <div className=' flex'>
                  <TbCurrencyTaka className='text-[28px] font-normal' />
                  <h3 className=' font-semibold text-xl'>{trackProduct?.totalAmount}</h3>
                </div>
              </div>
              
                 <div>
                <h3 className='capitalize text-lg font-semibold mb-2'>Shipping address</h3>
                <div>
                  <h3>{trackProduct?.customerName}</h3>
                </div>
                <div>
                  <h3>{trackProduct?.paymentMethod === 'cod' ? 'Cash on delivery' : 'sslcommerz'}</h3>
                  <h3>{trackProduct?.shippingAddress?.delivaryAddress}</h3>
                  <h3>{trackProduct?.shippingAddress?.city}</h3>
                  <h3>{trackProduct?.shippingAddress?.postCode}</h3>
                  <h3>{trackProduct?.shippingAddress?.country}</h3>
                  <h3>{trackProduct?.phone}</h3>
                  {/* <h3>Cash On Delivery</h3> */}
                </div>
              </div>
              
            </div>
            <div>
              <p className="text-sm text-gray-600">Date</p>
              <p className="font-semibold">{new Date(trackProduct.createdAt).toLocaleString()}</p>
            </div>
          </div>
          }
      

        <div className="mt-6">
          <button
            onClick={() => window.location.href = '/products'}
            className="w-[300px] bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductTrackPage
