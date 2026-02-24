import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../usercontext/AuthContext"
const useGetProduct = (category,searchProduct) => {
  console.log(category)
    const [products,setProducts] = useState('')

    const {user} = useContext(AuthContext)

    const [loading, setLoading] = useState(true);

    const [error,setError] = useState('')

    useEffect(()=>{
      const getAllUsers = async()=>{
        try {
          const res = await fetch(`https://event-backend-dx9k.vercel.app/api/products/getproduct/${category === null ? 'all' : category}`,{
            method : "GET",
          })
          let data = await res.json()
          if(data.error){
            setError(data.error)
            setProducts('')
            return
          }

          if (searchProduct) {
              data = data.filter((product) =>
              product.title.toLowerCase().includes(searchProduct.toLowerCase())
            );
          }


          setProducts(data)
          setError('')
        } catch (error) {
          setError("Error",error.message,"error")
        }finally{
          setLoading(false)
          
        }
      }
      getAllUsers()

      

    },[category,searchProduct])

    const handleClick = async(id)=>{
        try {
        const res = await fetch(`/api/products/delete/${id}`, {
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
          const filterProducts = products.filter((product) => product._id !== id)
          setProducts(filterProducts)
        }
        console.log("Success", "Product deleted", "success");
			
      } catch (error) {
        console.log("Error", error.message, "error");
      } 
    }
  
  return {products,handleClick,loading,setProducts,error,setError}
}

export default useGetProduct
