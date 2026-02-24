import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../usercontext/AuthContext"

const useGetMail = () => {

  const {user} = useContext(AuthContext)
  

  const [mailData,setMailData] = useState([])

  const data = mailData.some(sub => sub?.subscriberId?.toString() === user?._id?.toString());

 

  useEffect(()=>{
    const subCribe = async () =>{
       try {
        const res = await fetch(`/api/subscribe/getmail`, {
          method: 'GET',
        })

        const data = await res.json()

        if (data.error) {
          console.log(data.error)
          return
        }
        setMailData(data)

      } catch (err) {
        console.log(`Fetch error: ${err.message}`)
      }
    }

    subCribe()
  },[])

  return data
}

export default useGetMail
