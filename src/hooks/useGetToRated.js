import React, { useEffect, useState } from 'react'

const useGetToRated = () => {
        const [topRated,setToprated] = useState('')
    
        useEffect(()=>{
          const getAllUsers = async()=>{
            try {
              const res = await fetch('https://event-backend-dx9k.vercel.app/api/products/toprated',{
                method : "GET",
              })
              let data = await res.json()
              if(data.error){
                console.log(data.error)
              }
    
              setToprated(data)

            } catch (error) {
              console.log("Error",error.message,"error")
            }
          }
          getAllUsers()
        },[])
    
  return topRated
}

export default useGetToRated
