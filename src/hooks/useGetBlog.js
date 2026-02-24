import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../usercontext/AuthContext"

 
const useGetBlog = (searchProduct) => {
    const [blogs,setBlogs] = useState('')

    const {user} = useContext(AuthContext)

    useEffect(()=>{
      const getAllUsers = async()=>{
        try {
          const res = await fetch('/api/blogs/getblog',{
            method : "GET",
          })
          let data = await res.json()
          if(!data){
            console.log(data.error)
          }

          if (searchProduct) {
              data = data.filter((product) =>
              product.title.toLowerCase().includes(searchProduct.toLowerCase())
            );
          }

          setBlogs(data)
        } catch (error) {
          console.log("Error",error.message,"error")
        }
      }
      getAllUsers()
    },[searchProduct])

    const handleClick = async (id) =>{
      try {
        const res = await fetch(`/api/blogs/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization : `${user?.token}`
          },
        });
        const data = await res.json();
        if (data.error) {
          console.log("Error", data.error, "error");
          return;
        }

        if(data.message === 'successfull') {
          const filterBlog = blogs.filter((blog) => blog._id !== id)
          setBlogs(filterBlog)
        }
        console.log("Success", "Blog deleted", "success");
			
      } catch (error) {
        console.log("Error", error.message, "error");
      } 
    }
  
 

  return {blogs,handleClick}
}

export default useGetBlog
