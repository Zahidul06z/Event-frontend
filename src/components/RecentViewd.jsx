import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../usercontext/AuthContext"
import { Link } from "react-router-dom"
import { TbCurrencyTaka } from "react-icons/tb"
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const RecentViewd = () => {

  const [count,setCount] = useState(0)

  const {resentView,} = useContext(AuthContext)

  const [itemsToShow, setItemsToShow] = useState(1);

  useEffect(() => {
    const updateItems = () => {
    const width = window.innerWidth;
    if (width <= 500) {
      setItemsToShow(1); // mobile
    }
    else if(width > 500 && width < 640){
      setItemsToShow(2)
    }
    else if(width >= 640 && width <= 768){
      setItemsToShow(2)
    }
    else if (width > 768 && width < 1024) {
      setItemsToShow(3); // tablet
    } else {
      setItemsToShow(3); // desktop
    }
  };

  updateItems();
  window.addEventListener('resize', updateItems);
  return () => window.removeEventListener('resize', updateItems);
  }, []);


  return ( 
    <>
    {resentView && <div className=' mb-8 flex flex-col justify-center relative '>
        {resentView && <div className="mt-5 font-semibold capitalize text-xl text-gray-800 ">
            <h2>Recently Viewed Products : </h2>
        </div>}
      <div className='flex flex-nowrap gap-5 overflow-x-auto mt-5 snap-x snap-mandatory scroll-smooth '>
        {
        resentView && Object.values(resentView).map((product)=>{
            
            return <div className='flex-shrink-0 w-[200px] snap-start border-1 border-white bg-gray-100 py-2 shadow-2xl sm:w-[230px] sm:py-3 md:w-[200px] lg:w-[220px] xl:w-[290px]' key={product?._id}>
                <Link className='flex flex-col items-center justify-center' to={`/products/${product?._id}`}>
                    <img className='w-[110px] h-[125px] mb-2 sm:w-[130px] sm:h-[150px] lg:w-[140px] lg:h-[150px] xl:w-[180px] xl:h-[200px]' src={`https://event-backend-dx9k.vercel.app/uploads/product/images/${product.image}`} alt="image" />
                    <h2 className='uppercase px-2 text-md font-semibold text-gray-800 text-center'>{product?.title}</h2>
                    <div className='text-gray-800  mt-2 flex'>
                        <TbCurrencyTaka className='text-[25px]' />
                        <h3 className=' text-gray-800 font-semibold text-[18px]'>{product?.price}</h3>
                    </div>

                    {product?.average !== 0 && (() => {
                      const score = parseFloat(product?.average);
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

                      {product?.stock === 0 && <div className=' font-semibold text-red-600 text-center mt-1'>
                    <h3>Out of Stock</h3>
                  </div>} 

                    <button className='mt-1 bg-amber-500 uppercase py-1 px-1 text-sm font-bold cursor-pointer hover:bg-amber-400'>view details</button>
                </Link>
                 {/* {user?.role === 'admin' && <RiDeleteBin6Line className="absolute top-4 right-3 text-[25px] text-gray-800 hover:text-red-600 cursor-pointer" onClick={() => handleClick(product?._id)} />} */}
                 
            </div>
        })
      }
      
      </div>
      {/* <button className="absolute top-45 right-3 text-gray-800 text-[30px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed md:right-1 md:text-[40px] md:top-40" disabled={count+1 === resentView?.length}  onClick={()=>setCount(count+1)}><IoIosArrowForward/></button>
      <button className="absolute top-45 left-3  text-gray-800 text-[30px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed md:left-1 md:text-[40px] md:top-40" disabled={count === 0} onClick={()=>setCount(count-1)}><IoIosArrowBack /></button> */}
    </div> 
    }
    </>
  )
}

export default RecentViewd
