import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../usercontext/AuthContext'

const useGetOrderProduct = (id) => {
  const [orderProduct,setOrderProduct] = useState('')
  const [loading,setLoading] = useState(true)
  
    const {user} = useContext(AuthContext)
    
    useEffect(()=>{
        const getAllUsers = async()=>{
             try {
                const res = await fetch(`/api/users/getOrderProduct/${id}`,{
                method : "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization : `${user?.token}`
                },
                })
                const data = await res.json()
                if(!data.error){
                console.log(data.error)
                }
                setOrderProduct(data)
            } catch (error) {
              console.log("Error",error.message,"error")
            }finally{
                setLoading(false)
            }
        }
        getAllUsers()
    },[])

    return { orderProduct,loading } 
}

export default useGetOrderProduct
