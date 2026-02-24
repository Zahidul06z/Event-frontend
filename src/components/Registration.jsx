import { useContext, useState } from "react"
import { AuthContext } from "../usercontext/AuthContext"

const Registration = ({ setIsLogin }) => {

    const {login} = useContext(AuthContext)
        const [user,setUser] = useState({name : '',email : '',password : ''})
        const {name,email,password} = user
    
        const [error,setIsError] = useState('')
    
        const handleChange = (e) =>{
            const name = e.target.name;
            setUser((user) => ({
                ...user,
                [name]: e.target.value
            }));    
        } 
        
        const handleSubmit =async (e) =>{
            e.preventDefault();
            console.log(user)
            try {
                const res = await fetch("/api/users/registration", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user),
                });
                const data = await res.json();
    
                if (data.error) {
                    setIsError(data.error)
                    return;
                }
    
                
                login(data)
              
            } catch (error) {
                setIsError("Error", error.message, "error");
            }
            setUser({name : '',email : '',password : ''})
        }

  return (
    <div className="w-full flex items-center  flex-col ">
       <div className="bg-gray-100 mt-20 w-[330px] h-[330px] shadow-2xl rounded sm:w-[450px]">
            <div className="mt-10">
                <form className="flex items-center flex-col" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input className="outline-none bg-gray-200 w-[320px] py-2 px-5 sm:w-[380px]" type="text" required placeholder="username..."  name="name" id="name" value={name} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <input className="outline-none bg-gray-200 w-[320px] py-2 px-5 sm:w-[380px]" type="email" required placeholder="email address..." name="email" id="email" value={email} onChange={handleChange}/>
                    </div>
                    <div>
                        <input className="outline-none bg-gray-200 w-[320px] py-2 px-5 sm:w-[380px]" type="password" required placeholder="password..." name="password" id="password" value={password} onChange={handleChange}/>
                    </div>
                    {error && <div>
                        <h2 className="text-red-800 mt-3">{error}</h2>
                    </div>}
                    <div className="mt-3">
                        <button className="uppercase bg-amber-500 mt-5 py-1 px-3 text-[20px] font-bold cursor-pointer hover:bg-amber-400" type="submit">registration</button>
                    </div>
                </form>
            </div>
            
            <div className="flex justify-center mt-5">
                <p className="font-semibold">Alredy have account?</p>
                <button className="cursor-pointer underline text-blue-700 ml-2 font-semibold" onClick={()=>setIsLogin(true)}>Login</button>
            </div>
       </div>
    </div>
  )
}

export default Registration
