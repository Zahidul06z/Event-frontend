import { useContext } from "react";
import { AuthContext } from "../usercontext/AuthContext";
import { useState } from "react";

const useAddCoupon = (addCoupon,setAddCoupon) => {
    const {user} = useContext(AuthContext)
    const [message,setMessage] = useState('')
    const [error,setError] = useState('')
    const [isLoading,setIsLoading] = useState(false)

    setTimeout(() => {
        setMessage('')
        setError('')
    }, 3000);
    
    const handleSubmit = async (e) =>{
        e.preventDefault()
        setIsLoading(true)
        const value = {
            coupon : addCoupon.coupon.toLowerCase(),
            discount : addCoupon.discount,
            expiresAt : new Date(addCoupon.date).toISOString()
        }
        try {
            const res = await fetch(`https://event-backend-dx9k.vercel.app/api/coupons/addcoupon/${user?._id}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `${user?.token}`,
                },
                body: JSON.stringify(value),
            });
            const data = await res.json();

            if (data.error) {
                setError(data.error)
                return;
            }
            
            setMessage(data?.message)
            setAddCoupon({coupon : '',discount : '', date : ''})
           
          
        } catch (error) {
            setError("Error", error.message, "error");
        }finally{
            setIsLoading(false)
        }
    }
  return { handleSubmit,isLoading,message,error }
}

export default useAddCoupon
