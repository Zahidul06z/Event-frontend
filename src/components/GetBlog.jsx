import { Link, useSearchParams } from "react-router-dom"
import useGetBlog from "../hooks/useGetBlog"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useContext, useState } from "react"
import { AuthContext } from "../usercontext/AuthContext"
import { CiSearch } from "react-icons/ci"

const GetBlog = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [search,setSearch] = useState('')

  const searchProduct = searchParams.get('search') || '';

  const {user} = useContext(AuthContext)
  const {blogs,handleClick} = useGetBlog(searchProduct)
  console.log(blogs)
    
  // const  handleClick = useDeleteBlog(blogs)

  const handleSearch = (e) =>{
    e.preventDefault()
    const value = e.target.value;
    setSearch(value);
    setSearchParams({ search: value });
  };


  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className='bg-white rounded-3xl mb-12 w-[310px] flex justify-center items-center md:w-[360px]'>
        <input className='outline-none py-1.5 px-3 w-[300px] md:w-[350px] md:py-2' type="text" placeholder='search...' onChange={handleSearch} value={search} />
        <button className='pr-3 cursor-pointer'><CiSearch /></button>
      </div>
      <div className=" flex flex-wrap justify-center gap-5 sm:gap-10 ">
            {blogs && Object.values(blogs).map((blog)=>{
                return <div className="w-[330px] border-1 border-gray-300 pb-3 shadow-md flex flex-col items-center relative sm:w-[430px] md:w-[320px] lg:w-[400px] xl:w-[350px]" key={blog?._id}>
                      <Link to={`/blog/${blog?._id}`} className="mb-8 shadow-xl">
                          {blog?.image && <img className="w-[330px] opacity-70 hover:opacity-100 sm:w-[430px] md:w-[320px] lg:w-[400px] xl:w-[350px]" src={`https://event-backend-dx9k.vercel.app/uploads/blog/images/${blog?.image}`} alt="image" />}
                          {blog?.video && <video className="w-[350px] opacity-70 hover:opacity-100" src={`https://event-backend-dx9k.vercel.app/uploads/blog/videos/${blog?.video}`} controls />}
                      </Link>
                      <h2 className="uppercase font-bold text-lg text-center text-gray-800 mb-3 lg:text-xl">{blog?.title}</h2>
                      <h2 className="text-gray-800 capitalize text-center  px-2 lg:text-[18px]">{blog?.description.slice(0,100)}...</h2>
                      <Link to={`/blog/${blog?._id}`} className="mt-7 bg-amber-500 py-2 px-3 uppercase font-semibold hover:bg-amber-400">view details</Link>
                       {user?.role === 'admin' && <RiDeleteBin6Line className="absolute top-4 right-3 text-[25px] text-gray-800 hover:text-red-600 cursor-pointer" onClick={() => handleClick(blog?._id)} />}
                </div>
            })}
      </div>
    </div>
  )
}

export default GetBlog
