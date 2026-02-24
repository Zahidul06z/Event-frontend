
import { useEffect } from 'react'
import { useState } from 'react'

const useGetSingleBlog = (id) => {
   const [singleBlog,setSingleBlog] = useState('')

    const [comments,setComments] = useState('')
  
    useEffect(()=>{
        const getAllUsers = async()=>{
          try {
            const res = await fetch(`https://event-backend-dx9k.vercel.app/api/blogs/getsingleblog/${id}`,{
              method : "GET",
            })
            const data = await res.json()
            if(!data){
              console.log(data.error)
            }
            setSingleBlog(data)
            setComments(data.comment)
          } catch (error) {
            console.log("Error",error.message,"error")
          }
        }
        getAllUsers()
    },[])

    return {singleBlog,comments,setComments}
}

export default useGetSingleBlog
