import { useEffect, useState } from "react";
import { CgMail } from "react-icons/cg"
import { FaPhoneAlt } from "react-icons/fa";
import useSubscribe from "../hooks/useSubscribe";
import useGetMail from "../hooks/useGetMail";

const Bottom = () => {
    const date = new Date
    const year = date.getFullYear()

    const [subscribe,setSubscribe] = useState('')

    const { handleSubmit,message,error } = useSubscribe(subscribe,setSubscribe)

    const data = useGetMail()
    const [isSubscribe,setIsSubscribe] = useState('')
    useEffect(() => {
        if (data) {
            setIsSubscribe(data);
        }
    }, [data]);

  return (
    <div className="bg-gradient-to-b from-indigo-900 to-purple-900 mt-0.5 flex flex-col items-center w-full">
      <div className="pt-20">
        <div>
            <h1 className="text-[16px] font-semibold text-white text-center uppercase md:text-2xl">Never miss a deal - subscribe now</h1>
        </div>
        <div className="mt-[10px]">
            <h1 className="text-[14px] w-full px-5 font-semibold text-white text-center md:text-xl">Stay connected with us for new arrivals and exciting updates!</h1>
        </div>
      </div>
      <div className="mt-7">
            {message && <div className="mb-3 text-center text-white">
              <h2>{message}</h2>
            </div>}
            {error && <div className="mb-3 text-center text-red-600">
              <h2>{error}</h2>
            </div>}
            
            <form className="flex" onSubmit={handleSubmit}>
                <div className="shadow-2xl">
                   <input className="bg-white w-[220px] sm:w-[270px] py-[8px] px-3 outline-none md:w-[340px]" type="email" placeholder="email address..." required id="email" name="email" value={subscribe} onChange={(e) => setSubscribe(e.target.value)}/>

                </div>
                <div className="shadow-2xl">
                    <button className="bg-amber-500 hover:bg-amber-400 font-semibold py-[11px] text-[12px] ml-[10px] px-2 uppercase cursor-pointer " type="submit" onClick={()=>setIsSubscribe(prev=>!prev)}>{isSubscribe ? 'unsubscribe' : 'subscribe'}</button>
                </div>
            </form>
        </div>
        <div className="uppercase text-[14px]  text-white mt-5 mb-10 flex flex-col  items-center">
            <div className="mb-5">
               <h2>contact us :  </h2>
               <div className="flex items-center mt-2">
                    <CgMail className='text-2xl text-white' />
                    <h2> Mail us :</h2>
                    <a  className="ml-3 lowercase">dipto@gmail.com</a>
               </div>
               <div className="flex items-center mt-2">
                    <FaPhoneAlt />
                    <h2> phone :</h2>
                    <h2 className="ml-3">1231242355</h2>
               </div>
            </div>
            <div className="mb-2 flex flex-col gap-1 justify-center items-center text-[12px]">
                <h3>COPYRIGHT © {year} DIPTO BD, ALL RIGHTS RESERVED. </h3>
                <h3> DESIGNED & DEVELOPED BY ZAHIDUL.</h3>
            </div>  
            {/* <div>
                <h3>abcddkk</h3>
            </div> */}
        </div>
    </div>
  )
}

export default Bottom
