import React, { useContext, useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { HiMinus } from 'react-icons/hi2'
import { TbCurrencyTaka } from 'react-icons/tb'
import { AuthContext } from '../usercontext/AuthContext'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { Link, useParams } from 'react-router-dom'
import useOrderProduct from '../hooks/useOrderProduct'

const Order = () => {

    const { getProduct,removeSingleProduct,decreaseQuantity,increaseQuantity,removeProduct } = useContext(AuthContext)

    const {id} = useParams()

    const [totalPrice,setTotalPrice] = useState('')

    const [paymentMethod,setPaymentMethod] = useState('')

    const [delivaryCharge,setDelivaryCharge] = useState({ charge: 0, place: '' })

    const getTotalPrice = () =>{
        const quntity = getProduct && Object.values(getProduct).map((product)=> product.totalPrice)
        const sum = quntity && quntity.reduce((acc,val)=> acc + val, 0)
        return sum
    }
            
    useEffect(() => {
        const total = getTotalPrice();
        setTotalPrice(total)
    },[getProduct]);

    const [coustomerInfo,setCoustomerInfo] = useState({email : '',name : '',telephone : '',country : '',city : '',deliveryaddress : '',postcode : ''})

    const {email,name,telephone,country,city,deliveryaddress,postcode} = coustomerInfo

    const handleChange = (e) =>{
        const name = e.target.name;
        setCoustomerInfo((info) => ({
            ...info,
             [name]: e.target.value
        }));    
    } 

    const handlePaymentMethod = (value) => {
        if (paymentMethod === value) {
        setPaymentMethod(null); // unselect if already selected
        } else {
        setPaymentMethod(value); // select new value
        }
    };

    const handleDelivaryCharge = ({charge,place}) => {
        if (delivaryCharge?.place === place ) {
        setDelivaryCharge({charge : 0,place : ''}); // unselect if already selected
        } else {
        setDelivaryCharge({charge,place}); // select new value
        }
    };

    const {handleSubmit,error,loading} = useOrderProduct(id,getProduct,coustomerInfo,paymentMethod,delivaryCharge,removeProduct)

  return (
    <div className='min-h-screen flex flex-col mt-10  gap-5 justify-center py-10 bg-gray-300 w-full md:pt-20 lg:flex-row  lg:gap-3 xl:gap-7 xl:mt-15 '>
      
        <div className=' w-full lg:w-[320px] xl:w-[380px]'>
            <div className='shadow-md pt-3 pb-5 px-4  bg-white lg:px-2'>
                <h2 className='uppercase font-bold mb-3'>your order ({getProduct?.length} items)</h2>
                <div>
                    <div>
                        <div  >
                            <div className='flex flex-col gap-3 items-center  sm:gap-5 lg:gap-2'>
                                {getProduct && Object.values(getProduct).map((product)=>{
                                    return <div key={product?._id} className='flex justify-between items-center gap-2   relative sm:gap-5'>
                                        <img className='w-[70px] h-[90px] sm:w-[70px] sm:mr-3 md:w-[120px] md:h-[150px] lg:w-[70px] lg:h-[100px] lg:-ml-10' src={`/uploads/product/images/${product?.image}`} alt="image" />
                                        <div className='lg:-ml-5'>
                                            <h2 className='font-semibold text-[15px] capitalize w-[250px] sm:w-[400px] sm:text-[20px] md:w-[510px] md:text-2xl lg:w-[190px] lg:text-sm xl:w-[250px] '>{product?.title}</h2>
                                            <div className=' flex md:mt-3 lg:mt-1'>
                                                <TbCurrencyTaka className='text-[20px] md:text-[27px] lg:text-[17px]' />
                                                <h3 className=' font-semibold text-[15px] md:text-[20px] lg:text-sm'>{product?.price}</h3>
                                            </div>
                                            <div className='flex justify-between mt-2 w-[270px] sm:w-[300px] md:mt-4 lg:w-[90px] lg:mt-1'>
                                                <div className='flex border-1 py-1 px-1 mb-3'>
                                                    <h2 className='text-[14px] bg-blue-300 mr-2 px-1 sm:text-[18px] sm:px-2 md:text-[23px] md:px-4 md:py-1 lg:text-[12px] lg:px-1'>Quantity </h2>
                                                    <div className='flex items-center gap-3 bg-blue-300 px-1 md:px-2 lg:px-1 lg:gap-1'>
                                                        <HiMinus onClick={()=>decreaseQuantity(product?._id)} className='text-xl cursor-pointer md:text-3xl lg:text-sm' />
                                                            <p className='md:text-[18px] lg:text-[15px]'>{product?.quntity}</p>
                                                        <FiPlus className='text-xl cursor-pointer md:text-3xl lg:text-sm' onClick={()=>increaseQuantity(product?._id)} />
                                                    </div>
                                                </div>
                                                <div className=' flex pr-5 sm:pl-7 lg:pl-0'>
                                                    <TbCurrencyTaka className='text-[20px] sm:text-[25px] md:text-[30px] lg:text-[20px]' />
                                                    <h3 className=' font-semibold text-[15px] sm:text-lg md:text-xl lg:text-[16px]'>{Number(product?.totalPrice).toFixed(2)}</h3>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <RiDeleteBin6Line className='absolute top-2 right-0 cursor-pointer sm:-right-3 md:text-[28px] md:-mr-5 lg:text-lg' onClick={()=> removeSingleProduct(product?._id)} />
                                    </div>
                                })}
                            </div>
                            {error?.productError && <div className='flex flex-col items-center'>
                                <h3 className='my-3 font-sans text-red-600'>{error?.productError}</h3>
                                <Link to={'/products'} className='mb-3 bg-amber-500 py-2 px-3 font-semibold hover:bg-amber-400'>ALL PRODUCTS</Link>
                            </div>}
                        </div>
                        <hr />
                        <div className='flex justify-between uppercase font-bold mt-3'>
                            <h3>subtotal</h3>
                            <div className=' flex'>
                                <TbCurrencyTaka className='text-[20px]' />
                                <h3 className=' font-semibold text-[15px]'>{Number(totalPrice).toFixed(2)}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <form onSubmit={handleSubmit}>
            <div className=' flex flex-col gap-5 justify-between lg:flex-row lg:gap-3 xl:gap-7'>
                <div className='  bg-white px-4 pt-3 pb-5 lg:w-[320px] xl:w-[380px]'>
                    <div>
                        <h3 className='font-bold uppercase'>delivery address</h3>
                        <p className='capitalize text-[14px] font-semibold mt-2'>all fields required</p>
                    </div>
                    <div>
                    <div className='mt-3'>
                        <div>
                            <label className='font-semibold' htmlFor="email">Eamill address : </label>
                        </div>
                        <div>
                            <input className='outline-none bg-gray-100 w-full mt-2 py-1 px-3 ' type="email" name="email" id="email" placeholder='e.g. xy@gmail.com' required value={email}  onChange={handleChange} />
                        </div>
                        </div>
                        <div className='mt-3'>
                        <div>
                            <label className='font-semibold ' htmlFor="name">Name : </label>
                        </div>
                            <div>
                                <input className='outline-none bg-gray-100 w-full  mt-2 py-1 px-3' type="text" name="name" id="name" placeholder='enter your name...' required value={name}  onChange={handleChange}/>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <div>
                                <label className='font-semibold ' htmlFor="telephone">Telephone : </label>
                            </div>
                            <div>
                                <input className='outline-none bg-gray-100 w-full mt-2 py-1 px-3' type="text" name='telephone' id='telephone' placeholder='telephone...' required value={telephone}  onChange={handleChange}/>
                            </div>
                    </div>
                    <div className='mt-3'>
                        <div>
                            <label className='font-semibold ' htmlFor="deliveryaddress">Delivery address : </label>
                        </div>
                        <div>
                            <input className='outline-none bg-gray-100 w-full mt-2 py-1 px-3' type="text" name='deliveryaddress' id='deliveryaddress' placeholder='e.g. Unit1, 123 Main Street' required value={deliveryaddress}  onChange={handleChange} />
                        </div>
                    </div>
                    <div className='mt-3'>
                        <div>
                            <label className='font-semibold ' htmlFor="country">Country : </label>
                        </div>
                        <div>
                            <input className='outline-none bg-gray-100 w-full mt-2 py-1 px-3' type="text"  id='country' name='country' placeholder='enter your country name...' required value={country}  onChange={handleChange} />
                        </div>
                    </div>
                    <div className='mt-3'>
                    <div>
                        <label className='font-semibold ' htmlFor="city">City/Town : </label>
                    </div>
                        <div>
                            <input className='outline-none bg-gray-100 w-full mt-2 py-1 px-3' type="text" name='city' id='city' placeholder='city/town' required  value={city}  onChange={handleChange} />
                        </div>
                    </div>
                    <div className='mt-3'>
                    <div>
                        <label className='font-semibold ' htmlFor="postcode">Postcode/ZIP Code</label>
                    </div>
                    <div>
                        <input className='outline-none bg-gray-100 w-full mt-2 py-1 px-3' type="text" name='postcode' id='postcode' placeholder='Postcode/ZIP code...' required value={postcode} onChange={handleChange} />
                    </div>
                    </div>
                </div>
                </div>
                {/* payment method */}
                <div className='lg:w-[320px] xl:w-[380px]'>
                    <div className='bg-white shadow-md py-3 pb-5 px-4'>
                        <h3 className='uppercase font-bold'>select payment method</h3>
                    <div className=''>
                        <div>
                            <div className='flex gap-2 items-center font-semibold mt-3 capitalize w-[200px]'>
                                <input className='cursor-pointer  accent-green-600' type="checkbox" name="paymentMethod" id="cod" checked={paymentMethod === 'cod'} onChange={()=> handlePaymentMethod('cod')} /> 
                                <label className='cursor-pointer' htmlFor="cod">cash on delivery</label>
                            </div>
                            <div className='flex justify-center font-bold mt-2 w-[200px]'>
                                <h3>or</h3>
                            </div>
                            <div className='flex gap-2 items-center font-semibold mt-2  w-[200px] sm:w-[300px]'>
                                <input className='cursor-pointer accent-green-600' type="checkbox" name="paymentMethod" id="sslcommerz" checked={paymentMethod === 'sslcommerz'}  onChange={()=> handlePaymentMethod('sslcommerz')} /> 
                                <label className='capitalize text-[15px] cursor-pointer' htmlFor='sslcommerz'>Payment with</label>
                                <img className='w-[120px] cursor-pointer' src="/logosslcomerzz.png" alt="logo" />
                            </div>
                            {error?.payment && <div className='mt-3 text-red-600 font-sans'>
                                <h3>{error?.payment}</h3>
                            </div>}
                        </div>
                    </div>
                </div>
                <div className='bg-white shadow-md py-3 pb-5 px-4 mt-4'>
                    <h3 className='uppercase font-bold'>order summary</h3>
                    <div className='flex justify-between flex-col capitalize text-[14px] font-semibold mt-5'>
                        <h2>Shipping : </h2>
                        <div>
                            <div className='flex gap-10 items-center mt-3 '>
                                <div>
                                    <input className='accent-green-600 mr-2' type="checkbox" name="shipping" id="barisal"  checked={delivaryCharge.place === 'barishal'} onChange={()=>handleDelivaryCharge({charge : 100,place : 'barishal'})} />
                                    <label htmlFor="barisal">Barisal 100 Taka</label>
                                </div>
                                <div>
                                    <input className='accent-green-600 mr-2' type="checkbox" name="shipping" id="outsidebarisal"  checked={delivaryCharge.place === 'outside'} onChange={()=>handleDelivaryCharge({charge : 150,place : 'outside'})} />
                                    <label htmlFor="outsidebarisal">Outside Barisal 150 Taka</label>
                                </div>
                            </div>
                            {error?.delivary && <div className='mt-3 text-red-600 font-sans'>
                                <h3>{error?.delivary}</h3>
                            </div>}
                        </div>
                        
                    </div>
                    <hr className='text-gray-300 my-3' />
                    <div className='flex justify-between font-semibold capitalize text-[14px] mt-5'>
                        <h3>subtotal</h3>
                        <div className=' flex'>
                            <TbCurrencyTaka className='text-[19px]' />
                            <h3 className=' font-semibold text-[14px]'>{Number(totalPrice).toFixed(2)}</h3>
                        </div>
                    </div>
                    <hr className='text-gray-300 my-3' />
                    <div className='flex justify-between font-semibold capitalize text-[14px]'>
                        <h3>shipping </h3>
                        {delivaryCharge?.charge  && <div className=' flex'>
                            <TbCurrencyTaka className='text-[19px]' />
                            <h3>{delivaryCharge.charge}</h3>
                        </div>
                        }
                    </div>
                    <hr className='text-gray-300 my-3' />
                    <div className='flex justify-between uppercase font-semibold bg-gray-200 py-2 px-3'>
                        <h3>order total</h3>
                        <div className=' flex'>
                            <TbCurrencyTaka className='text-[20px]' />
                            <h3 className=' font-semibold text-[15px]'>{delivaryCharge?.charge ? Number(totalPrice+delivaryCharge?.charge).toFixed(2) : Number(totalPrice).toFixed(2)}</h3>
                        </div>
                    </div>
                    <div className='mt-7 shadow-2xl'>
                        
                        <button type='submit' className="flex items-center justify-center gap-2 upp bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full cursor-pointer">{loading && (
                        <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>)}{loading ? 'Loading...' : 'Conform order'}
                        </button>
                       
                    </div>
                </div>
            </div>
        </div>
        </form>
        

    </div>
  )
}
// <button className=' uppercase font-semibold py-2 cursor-pointer bg-amber-500 hover:bg-amber-400 w-[349px]' type='submit'>complete order</button>
export default Order
