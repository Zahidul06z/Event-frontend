import { Link,NavLink } from "react-router-dom"
import { FaCartPlus } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../usercontext/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";
import { FcLike } from "react-icons/fc";


const Header = () => {
    const { user,getProduct,addWishList } = useContext(AuthContext)

    const [numberOfQuntity,setNumberOfQuntity] = useState('')

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const totalQuantity = () =>{
      const quntity = getProduct && Object.values(getProduct).map((product)=> product.quntity)
      const sum = quntity && quntity.reduce((acc,val)=> acc + val, 0)
      return sum
    }
    
    useEffect(() => {
      const total = totalQuantity();
      setNumberOfQuntity(total)
    },[getProduct]);
 
     
//   return (
//     <div className="w-full top-0  fixed z-10 shadow-lg  bg-gray-100 py-4 px-2 flex justify-between">
//         <div className="w-[20%] flex justify-center">
//             <Link to={'/'} className="text-gray-700 text-xl font-bold" ><img className="w-[30px]" src="./D3.png" alt="logo" /></Link>
            
            
//         </div>
//         <div className="flex justify-end items-center w-[80%] mr-10">
//             <nav className="flex gap-6 ">
//                 <NavLink
//                     to="/products"
//                     className={({ isActive }) =>
//                     isActive
//                         ? "text-amber-600 font-semibold border-b-2 border-amber-600 hidden"
//                         : "text-gray-700 hover:text-amber-600 font-bold transition-colors duration-500  hidden"
//                     }
//                 >
//                     PRODUCTS
//                 </NavLink>

//                 <NavLink
//                     to="/blog"
//                     className={({ isActive }) =>
//                     isActive
//                         ? "text-amber-600 font-semibold border-b-2 border-amber-600 hidden"
//                         : "text-gray-700 hover:text-amber-600 font-bold transition-colors duration-500 hidden"
//                     }
//                 >
//                     BLOG
//                 </NavLink>

//                 {user?.role === 'admin' && <NavLink
//                     to="/dashboard"
//                     className={({ isActive }) =>
//                     isActive
//                         ? "text-amber-600 font-semibold border-b-2 border-amber-600 hidden"
//                         : "text-gray-700 hover:text-amber-600 font-bold transition-colors duration-500 hidden"
//                     }
//                 >
//                     DASHBOARD
//                 </NavLink>}

//                 <NavLink
//                     to="/ourstory"
//                     className={({ isActive }) =>
//                     isActive
//                         ? "text-amber-600 font-semibold border-b-2 border-amber-600 hidden"
//                         : "text-gray-700 hover:text-amber-600 font-bold transition-colors duration-500 hidden"
//                     }
//                 >
//                     OUR STORY
//                 </NavLink>

//                 <div className="relative">
//                     <NavLink
//                         to={`/profile/${user?._id}`}
//                         className={({ isActive }) =>
//                         isActive
//                             ? "text-amber-600 font-semibold text-2xl "
//                             : "text-gray-700 hover:text-amber-600 font-bold text-2xl transition-colors duration-500 "
//                         }
//                         >
//                         <CgProfile/>
//                     </NavLink>
//                     {user && <p className="w-[8px] h-[8px] bg-green-600 absolute top-1 left-5 rounded-[50%]"></p>}
//                 </div>
           

//                 <div>
                    
//                     <NavLink to={'/cart'} className={({ isActive }) =>
//                     isActive
//                         ? "text-amber-600 font-semibold text-2xl absolute "
//                         : "text-gray-700 hover:text-amber-600 font-bold  text-2xl absolute transition-colors duration-500 "
//                     }><FaCartPlus /></NavLink>
//                     <p className=" relative top-[-18px] left-2 text-gray-700 font-bold lg:text-[13px]top-[-14px]">{numberOfQuntity || 0}</p>
//                 </div>
//                 <NavLink
//                     to="/ourstory"
//                     className={({ isActive }) =>
//                     isActive
//                         ? "text-amber-600 font-semibold border-b-2 text-2xl ml-6 border-amber-600 "
//                         : "text-gray-700 hover:text-amber-600 font-bold text-2xl ml-6 transition-colors duration-500"
//                     }
//                 >
//                     <GiHamburgerMenu />
//                 </NavLink>
//              </nav>
//         </div>
//     </div>
    
//   )
      return (
    <div className="w-full fixed top-0 z-20 bg-gray-100 shadow-lg px-6  py-3 md:py-6 md:px-10 lg:px-20 lg:py-7">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-gray-700">
            <img src="/D3.png" alt="logo" className="w-[30px]" />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center  gap-6">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? "text-amber-600 font-semibold border-b-2 border-amber-600"
                : "text-gray-700 hover:text-amber-600 font-bold transition"
            }
          >
            PRODUCTS
          </NavLink>

          <NavLink
            to="/blog"
            className={({ isActive }) =>
              isActive
                ? "text-amber-600 font-semibold border-b-2 border-amber-600"
                : "text-gray-700 hover:text-amber-600 font-bold transition"
            }
          >
            BLOG
          </NavLink>

          {user?.role === 'admin' && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-amber-600 font-semibold border-b-2 border-amber-600"
                  : "text-gray-700 hover:text-amber-600 font-bold transition"
              }
            >
              DASHBOARD
            </NavLink>
          )}

          <NavLink
            to="/ourstory"
            className={({ isActive }) =>
              isActive
                ? "text-amber-600 font-semibold border-b-2 border-amber-600"
                : "text-gray-700 hover:text-amber-600 font-bold transition"
            }
          >
            OUR STORY
          </NavLink>

          <div className="relative ">
            <NavLink
              to={`/product/wishlist`}
              className="text-2xl text-gray-700 hover:text-amber-600"
            >
              <svg
                    aria-label='Like'
                                    // color={liked ? "rgb(237, 73, 86)" : ""}
                                    fill={addWishList?.length ? "rgb(237, 73, 86)" : "transparent"}
                                    height='17'
                                    role='img'
                                    viewBox='0 0 24 22'
                                    width='20'
                                    className='text-red-500 '
                                    // onClick={handleLikeAndUnlike}
                                    >
                                    <path
                                        d='M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                    ></path>
				                </svg>
            </NavLink>
            {addWishList && (
              <span className="absolute -top-2 bg-red-500 w-3 rounded-[50%] left-4 text-[8px] font-semibold text-white text-center" >{addWishList?.length ? addWishList?.length : 0}</span>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <NavLink
              to={`/profile/${user?._id}`}
              className={({ isActive }) =>
                isActive
                  ? "text-amber-600 font-semibold text-2xl"
                  : "text-gray-700 hover:text-amber-600 font-bold text-2xl transition"
              }
            >
              <CgProfile />
            </NavLink>
            {user && (
              <span className="absolute top-0 left-5 w-2 h-2 bg-green-600 rounded-full" />
            )}
          </div>

          {/* Cart */}
          <div className="relative">
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "text-amber-600 text-2xl"
                  : "text-gray-700 hover:text-amber-600 text-2xl transition"
              }
            >
              <FaCartPlus />
            </NavLink>
            <span className="absolute -top-3 left-2.5 w-3 text-center rounded-[50%] text-[8px] bg-gray-700 font-bold text-white   md:-top-2">
              {numberOfQuntity || 0}
            </span>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-4 ">
          <div className="relative ">
            <NavLink
              to={`/product/wishlist`}
              className="text-2xl text-gray-700 hover:text-amber-600"
            >
              <svg
                    aria-label='Like'
                                    // color={liked ? "rgb(237, 73, 86)" : ""}
                                    fill={addWishList?.length ? "rgb(237, 73, 86)" : "transparent"}
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
            </NavLink>
            {addWishList && (
              <span className="absolute -top-2 bg-red-500 w-2.5 rounded-[50%] left-4 text-[8px] font-semibold text-white text-center" >{addWishList?.length ? addWishList?.length : 0}</span>
            )}
          </div>
          <div className="relative ">
            <NavLink
              to={`/profile/${user?._id}`}
              className="text-2xl text-gray-700 hover:text-amber-600"
            >
              <CgProfile />
            </NavLink>
            {user && (
              <span className="absolute top-0 left-5 w-2 h-2 bg-green-600 rounded-full" />
            )}
          </div>

          <NavLink
            to="/cart"
            className="text-2xl text-gray-700 hover:text-amber-600 relative"
          >
            <FaCartPlus />
            <span className="absolute -top-2 left-2.5 w-3 bg-gray-700 rounded-[50%] text-[8px] font-bold text-white text-center">
              {numberOfQuntity || 0}
            </span>
          </NavLink>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-2xl text-gray-700 hover:text-amber-600"
          >
            <GiHamburgerMenu />
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="lg:hidden  absolute top-full right-0 w-80 min-h-[47rem]  bg-gray-200 shadow-md  z-40 transition duration-300">
            <div className="flex flex-col p-4 space-y-2 relative">
            <NavLink
            to="/products"
            className="block text-gray-700 hover:text-amber-600 font-semibold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            PRODUCTS
          </NavLink>

          <NavLink
            to="/blog"
            className="block text-gray-700 hover:text-amber-600 font-semibold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            BLOG
          </NavLink>

          {user?.role === 'admin' && (
            <NavLink
              to="/dashboard"
              className="block text-gray-700 hover:text-amber-600 font-semibold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              DASHBOARD
            </NavLink>
          )}

          <NavLink
            to="/ourstory"
            className="block text-gray-700 hover:text-amber-600 font-semibold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            OUR STORY
          </NavLink>
          <button onClick={()=>setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-lg font-semibold text-red-600 cursor-pointer absolute right-5">Close</button> 
            </div>
            
        </div>
      )}
    </div>
  )
}

export default Header
