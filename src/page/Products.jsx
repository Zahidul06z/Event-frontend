import { useSearchParams, Link } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import GetProduct from '../components/GetProduct';
import useGetProduct from '../hooks/useGetProduct';
import { GrSort } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import useFilter from '../hooks/useFilter';

const Products =()=> {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search,setSearch] = useState('')
  const [filterValueParams,setFilterValueParams] = useSearchParams()

  const [toggle,setToggle] = useState(false)


  // Get a specific query parameter
  const category = searchParams.get('category');

  const searchProduct = searchParams.get('search') || '';

  const filterValue = {
    first: filterValueParams.get('first') || '',
    second: filterValueParams.get('second') || ''
  };

  // const page = searchParams.get('page');

  // Function to update a query parameter
  const handleCategoryChange = (newCategory) => {
    // setSearchParams(prevParams => {
    //   prevParams.set('category', newCategory);
    //   // prevParams.delete('page'); // Optionally remove other params when changing category
    //   return prevParams;
    // });
    setSearchParams(prevParams => {
      if (newCategory === 'all') {
        // If 'all' is selected, remove the 'category' parameter for a clean URL
        prevParams.delete('category');
       
        setSearch('')

      } else {
        // Otherwise, set the 'category' parameter to the new value
        prevParams.set('category', newCategory);
       
      }
      // Optionally, delete other parameters like 'page' when category changes
       prevParams.delete('page');
      return prevParams;
    }, { replace: true }); // Use replace: true to avoid cluttering browser history
  };

  const handleSearch = (e) =>{
    e.preventDefault()
    const value = e.target.value;
    setSearch(value);
    setSearchParams({ search: value });
  };

  // const handlePageChange = (newPage) => {
  //   setSearchParams(prevParams => {
  //     prevParams.set('page', newPage);
  //     return prevParams;
  //   });
  // };

  const {products,handleClick,loading,setProducts,error,setError} = useGetProduct(category,searchProduct)
  console.log('hello',error)

  const handleFilter = useFilter(setProducts,setToggle,setError)


  return (
    <div className='min-h-screen pt-20 bg-gray-200 w-full flex flex-col items-center md:pt-30'>
      <div >
        <h1 className='text-gray-800 text-3xl  font-semibold mb-5'>Products</h1>
      </div>
      <div className='bg-white rounded-3xl mb-5'>
        <input className='outline-none py-2 px-3 w-[290px] sm:w-[300px] md:w-[320px]' type="text" placeholder='search...' onChange={handleSearch} value={search} />
        <button className='pr-3 cursor-pointer'><CiSearch /></button>
      </div>
      {/* <p>Current Category: {category || 'All'}</p> */}
      {/* <p>Current Page: {page || '1'}</p> */}

      <div className='flex gap-3 mb-5'>
        <button className={
              category === null // Replace with your actual active state variable
                ? "text-gray-800 bg-white rounded-2xl px-4 font-semibold cursor-pointer"
                : "text-gray-800 bg-transparent border-1 border-white font-semibold rounded-2xl px-4   transition-colors duration-500 cursor-pointer"
            } onClick={() => handleCategoryChange('all')}>
          All
        </button>
        <button className={
              category === 'shirt' // Replace with your actual active state variable
                ? "text-gray-800 bg-white rounded-2xl px-4 font-semibold cursor-pointer"
                : "text-gray-800 bg-transparent border-1 border-white font-semibold rounded-2xl px-4 transition-colors duration-500 cursor-pointer"
            }  onClick={() => handleCategoryChange('shirt')}>
          Shirt
        </button>
        <button className={
              category === 'pant' // Replace with your actual active state variable
                ? "text-gray-800 bg-white rounded-2xl px-4 font-semibol cursor-pointer"
                : "text-gray-800 bg-transparent border-1 border-white font-semibold rounded-2xl px-4 transition-colors duration-500 cursor-pointer"
            }  onClick={() => handleCategoryChange('pant')}>
          Pant
        </button>
        <button className={
              category === 't-shirt' // Replace with your actual active state variable
                ? "text-gray-800 bg-white rounded-2xl px-4 font-semibol cursor-pointer"
                : "text-gray-800 bg-transparent border-1 border-white font-semibold rounded-2xl px-4  transition-colors duration-500 cursor-pointer"
            }  onClick={() => handleCategoryChange('t-shirt')}>
          T-shirt
        </button>
      </div>  

      {/* <div className='flex gap-3 mb-5'>
        <button className={
              category === null // Replace with your actual active state variable
                ? "text-gray-800 bg-white rounded-2xl px-4 font-semibold cursor-pointer"
                : "text-gray-800 bg-transparent border-1 border-white font-semibold rounded-2xl px-4   transition-colors duration-500 cursor-pointer"
            } onClick={() => handleCategoryChange('all')}>
          All
        </button>
        <button className={
              category === 'shirt' // Replace with your actual active state variable
                ? "text-gray-800 bg-white rounded-2xl px-4 font-semibold cursor-pointer"
                : "text-gray-800 bg-transparent border-1 border-white font-semibold rounded-2xl px-4 transition-colors duration-500 cursor-pointer"
            }  onClick={() => handleCategoryChange('shirt')}>
          Shirt
        </button>
        <button className={
              category === 'pant' // Replace with your actual active state variable
                ? "text-gray-800 bg-white rounded-2xl px-4 font-semibol cursor-pointer"
                : "text-gray-800 bg-transparent border-1 border-white font-semibold rounded-2xl px-4 transition-colors duration-500 cursor-pointer"
            }  onClick={() => handleCategoryChange('pant')}>
          Pant
        </button>
        <button className={
              category === 't-shirt' // Replace with your actual active state variable
                ? "text-gray-800 bg-white rounded-2xl px-4 font-semibol cursor-pointer"
                : "text-gray-800 bg-transparent border-1 border-white font-semibold rounded-2xl px-4  transition-colors duration-500 cursor-pointer"
            }  onClick={() => handleCategoryChange('t-shirt')}>
          T-shirt
        </button>
      </div> */}

        <div className='relative mb-5 text-gray-800'>
          <button className='flex items-center gap-3 cursor-pointer border-1 border-white rounded-2xl px-5 py-0.5 font-semibold' onClick={(e)=>{e.preventDefault();setToggle(!toggle)}}><SlidersHorizontal className='w-4' /> Filter By : <IoIosArrowDown /> </button>
         {toggle &&  <div className="rounded-2xl mt-2 absolute top-full flex flex-col gap-4  px-5 w-50 py-5  bg-gray-100 right-0 shadow-md  z-40 ">
            <div>
              <h2 className='capitalize font-semibold'>based on price</h2>
            </div>
            <div>
              <input className='mr-2' id='50' type="checkbox" checked={filterValue.first === '50'}  onChange={()=>{handleFilter({first : 50,second : 100});setFilterValueParams({first : 50,second : 100}) }}/> <label htmlFor='50'>50Tk to 100Tk</label>
            </div>
            <div>
              <input className='mr-2' id='101' type="checkbox" checked={filterValue.first === '101'}   onChange={()=>{handleFilter({first : 101,second : 200});setFilterValueParams({first : 101,second : 200}) }} /> <label htmlFor='101'>101Tk to 200Tk</label>
            </div>
            <div>
              <input className='mr-2' id='201' type="checkbox" checked={filterValue.first === '201'}  onChange={()=>{handleFilter({first : 201,second : 400});setFilterValueParams({first : 201,second : 400}) }} /> <label htmlFor='201'>201Tk to 400Tk</label>
            </div>
            <div>
              <input className='mr-2' id='401' type="checkbox" checked={filterValue.first === '401'}  onChange={()=>{handleFilter({first : 401,second : 500});setFilterValueParams({first : 401,second : 500}) }} /> <label htmlFor='401'>401Tk to 500Tk</label>
            </div><div>
              <input className='mr-2' id='501' type="checkbox" checked={filterValue.first === '501'}  onChange={()=>{handleFilter({first : 501,second : 1000});setFilterValueParams({first : 501,second : 1000}) }} /> <label htmlFor='501'>501Tk to 1000Tk</label>
            </div>
          </div>}
        </div>

      {/* <button onClick={() => handlePageChange(parseInt(page || '1') + 1)}>
        Next Page
      </button> */}

      {/* Example using Link to update query params */}
      {/* <Link to="?category=books&page=1">View Books (Page 1)</Link> */}

        {/* Error */}

      {error && <div className='mt-10 border-1 border-white bg-gray-100 shadow-2xl w-[330px] h-[200px] flex items-center justify-center sm:w-[500px] sm:h-[300px]'>
        <div className='flex flex-col items-center  gap-6 text-red-600'>
          <MdOutlineProductionQuantityLimits className='text-2xl sm:text-6xl' />
          <h2 className='text-lg font-semibold sm:text-2xl'>“No items were found for your query.”</h2>
        </div>
      </div>}

      {/* get all product */}
      {loading && <div className="flex justify-center items-center h-full">
      <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
    </div>}
      <GetProduct products={products} onSend={handleClick} />
    </div>

  );
}

export default Products;