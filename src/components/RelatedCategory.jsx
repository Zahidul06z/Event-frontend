import React from 'react'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'
import { TbCurrencyTaka } from 'react-icons/tb'
import { Link } from 'react-router-dom'

const RelatedCategory = ({relatedCategory}) => {

  return (
    <div className='text-gray-800'>
      {relatedCategory && <div>

            {relatedCategory && <h2 className='font-semibold capitalize text-xl'>related Category : </h2>}
            <div className='flex flex-nowrap gap-5  overflow-x-auto mt-5 snap-x snap-mandatory scroll-smooth'>
                {relatedCategory && Object.values(relatedCategory).map((category)=>{
                return <div className='flex-shrink-0 w-[200px] snap-start border-1 border-white bg-gray-100 py-2 shadow-2xl sm:w-[230px] sm:py-3 md:w-[200px] lg:w-[220px] xl:w-[290px]' key={category?._id}>
                    <Link className='flex flex-col items-center justify-center' to={`/products/${category?._id}`}>
                        <img className='w-[110px] h-[125px] mb-2 sm:w-[130px] sm:h-[150px] lg:w-[140px] lg:h-[150px] xl:w-[180px] xl:h-[200px]' src={`https://event-backend-dx9k.vercel.app/uploads/product/images/${category.image}`} alt="image" />
                        <h2 className='uppercase px-2 text-md font-semibold text-gray-800 text-center'>{category?.title}</h2>
                        <div className='text-gray-800  mt-2 flex'>
                            <TbCurrencyTaka className='text-[25px]' />
                            <h3 className=' text-gray-800 font-semibold text-[18px]'>{category?.price}</h3>
                        </div>

                        {category?.average !== 0 && (() => {
                        const score = parseFloat(category?.average);
                        const full = Math.floor(score);
                        const half = score % 1 >= 0.5;
                        const empty = 5 - full - (half ? 1 : 0);
                        
                        return (
                            <div className="flex space-x-1 text-amber-500 text-sm mt-1">
                                {[...Array(full)].map((_, i) => <FaStar key={`full-${i}`} />)}
                                {half && <FaStarHalfAlt key="half" />}
                                {[...Array(empty)].map((_, i) => <FaRegStar key={`empty-${i}`} />)}
                            </div>
                        );
                        })()}

                        {category?.stock === 0 && <div className=' font-semibold text-red-600 text-center mt-1'>
                        <h3>Out of Stock</h3>
                    </div>} 

                        <button className='mt-1 bg-amber-500 uppercase py-1 px-1 text-sm font-bold cursor-pointer hover:bg-amber-400'>view details</button>
                    </Link>
                    {/* {user?.role === 'admin' && <RiDeleteBin6Line className="absolute top-4 right-3 text-[25px] text-gray-800 hover:text-red-600 cursor-pointer" onClick={() => handleClick(product?._id)} />} */}
                    
                </div>
                })}
            </div>
        </div>}
    </div>

//     <div className='text-gray-800'>
//   {relatedCategory && (
//     <div>
//       <h2 className='font-semibold capitalize text-xl'>Related Category :</h2>

//       <div className='flex flex-nowrap gap-5 overflow-x-auto mt-5'>
//         {Object.values(relatedCategory).map((category) => (
//           <div
//             className=' w-[200px] border-1 border-white bg-gray-100 py-2 shadow-2xl sm:w-[230px] sm:py-3 md:w-[200px] lg:w-[220px] xl:w-[290px]'
//             key={category?._id}
//           >
//             <Link className='flex flex-col items-center justify-center' to={`/products/${category?._id}`}>
//               <img
//                 className='w-[200px] h-[125px] mb-2 sm:w-[130px] sm:h-[150px] lg:w-[140px] lg:h-[150px] xl:w-[180px] xl:h-[200px]'
//                 src={`/uploads/product/images/${category.image}`}
//                 alt='image'
//               />
//               <h2 className='uppercase px-2 text-md font-semibold text-gray-800 text-center'>
//                 {category?.title}
//               </h2>
//               <div className='text-gray-800 mt-2 flex'>
//                 <TbCurrencyTaka className='text-[25px]' />
//                 <h3 className='text-gray-800 font-semibold text-[18px]'>{category?.price}</h3>
//               </div>

//               {category?.average !== 0 && (() => {
//                 const score = parseFloat(category?.average);
//                 const full = Math.floor(score);
//                 const half = score % 1 >= 0.5;
//                 const empty = 5 - full - (half ? 1 : 0);

//                 return (
//                   <div className='flex space-x-1 text-amber-500 text-sm mt-1'>
//                     {[...Array(full)].map((_, i) => <FaStar key={`full-${i}`} />)}
//                     {half && <FaStarHalfAlt key='half' />}
//                     {[...Array(empty)].map((_, i) => <FaRegStar key={`empty-${i}`} />)}
//                   </div>
//                 );
//               })()}

//               {category?.stock === 0 && (
//                 <div className='font-semibold text-red-600 text-center mt-1'>
//                   <h3>Out of Stock</h3>
//                 </div>
//               )}

//               <button className='mt-1 bg-amber-500 uppercase py-1 px-1 text-sm font-bold cursor-pointer hover:bg-amber-400'>
//                 View Details
//               </button>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   )}
// </div>

  )
}

export default RelatedCategory
