import { useContext, useState } from "react";
import { AuthContext } from "../usercontext/AuthContext";
import useLoginWithGoogle from "../hooks/useLoginWithGoogle";

const Login = ({setIsLogin}) => {

    const {login} = useContext(AuthContext)
    const [user,setUser] = useState({email : '',password : ''})
    const {email,password} = user

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
        try {
            const res = await fetch("https://event-backend-dx9k.vercel.app/api/users/login", {
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
        setUser({email : '',password : ''})
    }

    const handleClick = useLoginWithGoogle()

  return (
    <div className="w-full flex items-center flex-col">
       <div className="bg-gray-100 mt-40 w-[330px] h-[340px] shadow-2xl rounded sm:w-[450px]">
            <div className="mt-7">
                <form className="flex items-center flex-col" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input className="outline-none bg-gray-200 w-[320px] py-2 px-5 sm:w-[380px]" type="email" required placeholder="email address..." name="email" id="email" onChange={handleChange} value={email}/>
                    </div>
                    <div>
                        <input className="outline-none bg-gray-200 w-[320px] py-2 px-5 sm:w-[380px]" type="password" required placeholder="password..." name="password" id="password" onChange={handleChange} value={password}/>
                    </div>
                    {error && <div>
                        <h2 className="text-red-800 mt-3">{error}</h2>
                    </div>}
                    <div className="mt-3">
                        <button className="bg-amber-500 mt-3 py-1 px-3 text-[20px] font-bold w-[100px] cursor-pointer hover:bg-amber-400" type="submit">login</button>
                    </div>
                </form>
            </div>
            <div className="flex items-center flex-col mt-3">
                <h3 className="font-bold">or</h3>
                <button className="flex border-1 border-black px-2 py-1 mt-3 cursor-pointer shadow-2xl" onClick={handleClick}>
                    <h2 className="font-semibold uppercase text-sm ">login with </h2>
                    <img className="w-[22px] ml-3" src="./icons8-google.svg" alt="" />
                </button>
            </div>
            <div className="flex justify-center mt-5 ">
                <p className="font-semibold">Create a new account?</p>
                <button className="cursor-pointer underline text-blue-700 ml-2 font-semibold" onClick={()=>setIsLogin(false)}>Registration</button>
            </div>
       </div>
    </div>
  )
}

export default Login
