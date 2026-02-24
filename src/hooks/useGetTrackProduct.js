import { useContext, useEffect, useState } from "react"
import { AuthContext } from '../usercontext/AuthContext'

const useGetTrackProduct = (id) => {
  const [trackProduct,setTrackProduct] = useState('')

  const [trackStatus,setTrackStatus] = useState('')

  const [isloading,setLoading] = useState(false)

  const [error,setError] = useState('')

  const {user} = useContext(AuthContext)
  
  useEffect(()=>{
    const getTrackProduct = async()=>{
      setLoading(true)
      try {
        const res = await fetch(`/api/orders/track/${id}`,{
          method : "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization : `${user?.token}`
          },
        })
        const data = await res.json()
        if(data.error){
          setError(data.error)
        }
        setTrackProduct(data?.trackProduct)
        setTrackStatus(data.trackProductStatus)
      } catch (error) {
        setError("Error",error.message,"error")
      }finally{
        setLoading(false)
      }
    }
    getTrackProduct()
  },[id])

  return { trackProduct,trackStatus,isloading,error }
}

export default useGetTrackProduct
// /track/:id

