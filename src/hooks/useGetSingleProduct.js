import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../usercontext/AuthContext'

const useGetSingleProduct = (productId) => {
   const [product,setProduct] = useState('')
   const [productRatingReviews,setproductRatingReviews] = useState('')
   const [average,setAverage] = useState('')
   const [relatedCategory,setRelatedCategory] = useState('')
   const [loading,setLoading] = useState(false)
  // const {user} = useContext(AuthContext)

      useEffect(()=>{
        const getAllUsers = async()=>{
          setLoading(true)
          try {
            const res = await fetch(`https://event-backend-dx9k.vercel.app/api/products/getSingleProduct/${productId}`,{
              method : "GET",
            })
            const data = await res.json()
            if(data.error){
              console.log(data.error)
            }
            setProduct(data?.product)
            setRelatedCategory(data?.basedOnCategory)
            setproductRatingReviews(data?.product?.ratings)
            setAverage(data?.product?.average)
            
          } catch (error) {
            console.log("Error",error.message,"error")
          }finally{
            setLoading(false)
          }
        }
        getAllUsers()
      },[productId])
    
      // const handleNewRatingReviews = async () =>{
      //    try {
      //       const res = await fetch(`/api/products/ratingreviews/${productId}`, {
      //           method: "POST",
      //           headers: {
      //             "Content-Type": "application/json",
      //             Authorization: `${user?.token}`,
      //           },
      //           body: JSON.stringify(handleRatingReviews),
      //       });
      //       const data = await res.json();

      //       if (data.error) {
      //           console.log(data.error)
      //           return;
      //       }

            
      //       console.log(data)
          
      //   } catch (error) {
      //       console.log("Error", error.message, "error");
      //   }
      // }

      // handleNewRatingReviews()
  
    return { product,loading,productRatingReviews,relatedCategory,setproductRatingReviews,setAverage,average } 
}

export default useGetSingleProduct
