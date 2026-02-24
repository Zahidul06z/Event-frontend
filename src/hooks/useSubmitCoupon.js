import { useState } from 'react'

const useSubmitCoupon = (coupon,setCoupon) => {

    const [message,setMessage] = useState('')
    const [error,setError] = useState('')
    const [isLoading,setIsLoading] = useState(false)
    const [discount,setDiscount] = useState(null)
    
    setTimeout(() => {
        setMessage('')
        setError('')
    }, 3000);

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await fetch(`https://event-backend-dx9k.vercel.app/api/coupons/coupons/apply`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                //   Authorization: `${user?.token}`,
                },
                body: JSON.stringify({coupon}),
            });
            const data = await res.json();

            if (data.error) {
                setError(data.error)
                return;
            }
            
            setMessage(data?.message)
            setDiscount(data?.discount)
            setCoupon('')
           
          
        } catch (error) {
            setError("Error", error.message, "error");
        }finally{
            setIsLoading(false)
        }
    }
    return { handleSubmit,discount,message,error,isLoading }
}

export default useSubmitCoupon
