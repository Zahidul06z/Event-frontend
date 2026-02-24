import { useContext, useState } from "react"
import { AuthContext } from "../usercontext/AuthContext"

const useSendMailAllSubscriber = () => {
    const {user} = useContext(AuthContext)

    const [loading,setLoading] = useState(false)

    const handleClick = async()=>{
        console.log('true')
        setLoading(true)
        try {
            const res = await fetch(`/api/subscribe/sendmailallsubscriber/${user?._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization : `${user?.token}`
                },
                
            });
            const data = await res.json();
            console.log(data)

            if (data.error) {
                console.log(data.error)
                return;
            }
            alert(data.message)
        } catch (error) {
            console.log("Error", error, "error")
        }finally{
            setLoading(false)
        }
        
    }
    return { handleClick,loading }
}

export default useSendMailAllSubscriber
