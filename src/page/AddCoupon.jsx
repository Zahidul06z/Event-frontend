import React, { useState } from 'react'
import useAddCoupon from '../hooks/useAddCoupon'

const AddCoupon = () => {

    const [addCoupon,setAddCoupon] = useState({coupon : '',discount : '', date : ''})

    const {coupon,discount,date} = addCoupon

    const handleChange = (e) =>{
        const name = e.target.name;
        setAddCoupon((prev)=>({
            ...prev,[name] : e.target.value
        }))
    }

    const { handleSubmit,isLoading,error,message } = useAddCoupon(addCoupon,setAddCoupon)

  return (
    <div className='min-h-screen mt-12 md:mt-18 flex justify-center w-full bg-gray-200'>
      <div className='pt-20 '>
        <form className='border-1 border-gray-100 rounded-2xl shadow-2xl w-[335px] sm:w-[500px] flex flex-col items-center justify-center py-5 ' onSubmit={handleSubmit} >
            <div>
                <input className='bg-gray-100 w-[325px] sm:w-[400px] py-2 px-3 outline-none mt-3' type="text" id='coupon' name='coupon' placeholder='add coupon...' onChange={handleChange} value={coupon} />
            </div>
            <div>
                <input className='bg-gray-100 w-[325px] sm:w-[400px] py-2 px-3 outline-none mt-3' type="number" id='discount' name='discount' placeholder='number of discount...' onChange={handleChange} value={discount} />
            </div>
            <div className='mb-7'>
                <input className='bg-gray-100 w-[325px] sm:w-[400px] py-2 px-3 outline-none mt-3 cursor-pointer' type="datetime-local" id='date' name='date' placeholder='expired date...' onChange={handleChange} value={date} />
            </div>
            {message && <div>
              <h2 className='text-green-600 font-semibold'>{message}</h2>
            </div>}
            {error && <div> 
              {error && <h2 className='text-red-600 font-semibold'>{error}</h2>}
            </div>}
            <div className='mt-3 mb-3 text-gray-800 font-bold  text-xl'>
                <button className='uppercase cursor-pointer w-[200px] bg-amber-500 py-2 hover:bg-amber-400' type='submit'>{isLoading ? 'loading...' : 'submit'}</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default AddCoupon
