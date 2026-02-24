
import { TbCurrencyTaka } from 'react-icons/tb'
import { RxCross2 } from 'react-icons/rx'
import { Link } from 'react-router-dom'


const UserOrder = ({orderProduct}) => {
    
  return (
    <div className='flex justify-center pb-10'>
      <div className=' flex flex-col items-center justify-center text-gray-800'>
        {orderProduct && <h2 className='font-semibold text-lg  md:text-2xl'>
            Your Ordered Products : 
        </h2>}
        <div className='flex flex-wrap justify-center    lg:gap-8'>
            {orderProduct && Object.values(orderProduct).map(product=>{
                   return <div key={product?._id} className='flex flex-col items-center justify-center border-1 border-gray-100 shadow-xl w-[335px] px-3 mt-10 sm:w-[540px] md:w-[680px] lg:w-[450px] xl:w-[510px]'>

                    <div className='mt-5 flex flex-col items-center justify-center'>
                        <h2 className='font-semibold'>Product ID : {product?._id}</h2>
                        <h2 className='font-semibold mt-2 capitalize'>Status : {product?.orderStatus}</h2>
                    </div>
                   
                   {Object.values(product?.items).map((item,index)=>{

                    return <div  className='w-full' key={index} >
                                  <div className='flex w-full justify-between items-center bg-gray-100 px-3 py-2 my-5'>
                                    <div className='flex gap-2 justify-between items-center'>
                                      <img className='w-[60px] md:w-[70px] md:mr-3' src={`/uploads/product/images/${item.image}`} alt="image" />
                                      <div className='flex flex-col'>
                                        <h4 className='w-[200px] text-justify mb-3 md:w-[450px] lg:w-[300px]'>{item.title}</h4>
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
                              
                   })} 

                   <div className='mb-5 text-center'>
                        <Link className='cursor-pointer bg-amber-500 py-1 px-2 text-gray-800 font-semibold hover:bg-amber-400' to={`/product/tarck/${product._id}`}>Track Your Product</Link>
                    </div>       
                   
                   </div>   
                              
                           
                })
                
            }
           
        </div>
      </div>
    </div>
  )
}

export default UserOrder
