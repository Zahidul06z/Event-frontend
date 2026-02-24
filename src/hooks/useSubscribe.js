import { useContext, useState } from "react"
import { AuthContext } from "../usercontext/AuthContext"
 
const useSubscribe = (subscribe,setSubscribe) => {

    const {user} = useContext(AuthContext)
    const [message,setMessage] = useState('')
    const [error,setError] = useState('')

    setTimeout(() => {
        setMessage('')
        setError('')
    }, 4000);

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            const res = await fetch(`https://event-backend-dx9k.vercel.app/api/subscribe/addMail/${user?._id}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `${user?.token}`,
                },
                body: JSON.stringify({'email' : subscribe}),
            });
            const data = await res.json();

            if (data.error) {
                setError(data.error)
                return;
            }
            setMessage(data?.message)
            setSubscribe('')
          
        } catch (error) {
            console.log("Error", error.message, "error");
        }
    }


  return { handleSubmit,message,error }
}

export default useSubscribe
