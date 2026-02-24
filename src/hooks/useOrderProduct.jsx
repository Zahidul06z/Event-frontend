import React, { useContext, useState } from 'react'
import { AuthContext } from '../usercontext/AuthContext'

const useOrderProduct = (id,getProduct,coustomerInfo,paymentMethod,delivaryCharge,removeProduct) => {
    
    const {user} = useContext(AuthContext)

    const [error, setError] = useState('');

    const [loading,setLoading] = useState(false)
    
    
  const handleSubmit = async (e) =>{
    e.preventDefault()
    
    if (!delivaryCharge.place) {
      setError({delivary : 'Please select a delivery option.'});
      return;
    }else if(!paymentMethod){
        setError({payment : 'Please select a payment method option.'});
      return;
    }else if(getProduct?.length === 0 || !getProduct){
        setError({productError : 'Your order item cart are empty. Please go back to product page and add some product in your cart.'})
        return
    }

    setLoading(true)

    try {
        const productInfo = getProduct && Object.values(getProduct).map(product=>({id : product._id,quantity : product.quntity}) )
        const res = await fetch(`/api/orders/${paymentMethod === 'cod' ? 'cod' : 'sslcommerz'}/${id}`,{
            method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization : `${user?.token}`
                },
                body: JSON.stringify({productInfo : productInfo,coustomerInfo : coustomerInfo,paymentMethod : paymentMethod,delivaryCharge : delivaryCharge}),
        })
        const data = await res.json()
        if (data.error) {
          console.log(data.error)
          return;
        }

        setError('')
        

        if (data?.redirectUrl) {
          window.location.href = data?.redirectUrl;
          removeProduct()
          
        }
        else if(data?.success === true){
          // Redirect to SSLCommerz payment page
          window.location.href = data.paymentUrl;  
          removeProduct()
          setLoading(false)
        }else {
            console.log('Order placed:', data.message);
        }
    } catch (error) {
        console.log("Error", error, "error")
    }finally{
      setLoading(false)
    }
  } 

  return { handleSubmit,error,loading }
}

export default useOrderProduct
