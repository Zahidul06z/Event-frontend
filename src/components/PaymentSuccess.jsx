import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { TbCurrencyTaka } from 'react-icons/tb';
import { useSearchParams } from 'react-router-dom';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const transactionId = searchParams.get('transactionId');

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await fetch(
          `https://event-backend-dx9k.vercel.app/api/orders/status/${transactionId}`,{
            method: "GET",
          }
          
        );

        if (!response.ok) {
          throw new Error('Failed to fetch payment status');
        }

        const data = await response.json();
        setPaymentData(data.payment);
      } catch (err) {
        console.error('Error fetching payment data:', err);
        setError('Failed to fetch payment details.');
      } finally {
        setLoading(false);
      }
    };

    if (transactionId) {
      fetchPaymentData();
    }
  }, [transactionId]);

  if (!transactionId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">No transaction ID provided in the URL.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6  my-40 w-full">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="mt-4 text-xl font-bold text-green-600 sm:text-2xl">Payment Successful!</h2>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        
          <div  className="mt-6 space-y-3 text-left flex flex-col items-center justify-center">
            <div className='flex flex-col items-center gap-3'>
              <h2 className='text-xl font-semibold sm:text-3xl'>Thank you for your purchase</h2>
              <h3 className='text-md text-center sm:text-2xl  '>We've received your order will ship in 5-7 days.</h3>
              
              <h3 className='text-[12px] font-semibold sm:text-xl'>Transaction Id : {paymentData?.transactionId}</h3>
            </div>
            <div>
              <div>
                <h2 className='capitalize text-sm font-semibold mb-5 flex flex-col items-center sm:text-lg'>order summary</h2>
              </div>
              <div>
                
                {paymentData?.items && Object.values(paymentData?.items).map((item,index)=>{
                  
                  return <div  className='w-full sm:w-400px' key={index} >
                      <div className='flex w-full  justify-between items-center bg-gray-100 px-3 py-2 my-5 sm:w-[500px]'>
                        <div className='flex gap-2 justify-between items-center'>
                          <img className='w-[60px]' src={`/uploads/product/images/${item.image}`} alt="image" />
                          <div className='flex flex-col'>
                            <h4 className='w-[250px] text-[14px]  mb-3 sm:w-[280px] sm:text-[16px]'>{item.title}</h4>
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
                      
                  </div>
               
                })
                }
              </div>
              <div className='flex justify-between bg-gray-100 py-2 px-3'>
                <h4 className=' font-semibold'>Shipping {paymentData?.shippingCost === 100 ? 'Barisal' : 'Outside Barisal'}</h4>
                <div className=' flex'>
                  <TbCurrencyTaka className='text-[20px]' />
                  <h3 className=' font-semibold text-[15px]'>{paymentData?.shippingCost}</h3>
                </div>
              </div>
              
              <div className='flex justify-between mb-7  bg-gray-100 px-3 py-2 mt-5'>
                <h3 className='text-xl font-semibold'>Total</h3>
                <div className=' flex'>
                  <TbCurrencyTaka className='text-[28px] font-normal' />
                  <h3 className=' font-semibold text-xl'>{paymentData?.totalAmount}</h3>
                </div>
              </div>
              
                 <div>
                <h3 className='capitalize text-lg font-semibold mb-2'>Shipping address</h3>
                <div>
                  <h3>{paymentData?.customerName}</h3>
                </div>
                <div>
                  <h3>{paymentData?.shippingAddress?.delivaryAddress}</h3>
                  <h3>{paymentData?.shippingAddress?.city}</h3>
                  <h3>{paymentData?.shippingAddress?.postCode}</h3>
                  <h3>{paymentData?.shippingAddress?.country}</h3>
                  <h3>{paymentData?.phone}</h3>
                </div>
              </div>
              
            </div>
            <div>
              <p className="text-sm text-gray-600">Date</p>
              <p className="font-semibold">{new Date(paymentData.createdAt).toLocaleString()}</p>
            </div>
          </div>
      

        <div className="mt-6">
          <button
            onClick={() => window.location.href = '/products'}
            className="w-[300px] bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
