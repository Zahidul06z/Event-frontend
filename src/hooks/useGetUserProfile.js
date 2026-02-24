import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../usercontext/AuthContext"

const useGetUserProfile = (id) => {
  const [userProfile,setUserProfile] = useState('')

  const {user} = useContext(AuthContext)
  
    useEffect(()=>{
      const getAllUsers = async()=>{
        try {
          const res = await fetch(`https://event-backend-dx9k.vercel.app/api/users/getUser/${id}`,{
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
          setUserProfile(data)
          } catch (error) {
            console.log("Error",error.message,"error")
          }
      }
      getAllUsers()
    },[])

  return userProfile
}
export default useGetUserProfile
