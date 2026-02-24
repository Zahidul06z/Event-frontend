import React, { useContext, useEffect, useState } from 'react'
import Login from '../components/Login'
import Registration from '../components/Registration'
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../usercontext/AuthContext';

const AuthPage = () => {
  const [isLogin,setIsLogin] = useState(true)
  const navigate = useNavigate()




    return (
    <div className="min-h-screen bg-gray-200  w-full  mt-10">
      {isLogin ? <Login setIsLogin={setIsLogin} /> : <Registration setIsLogin={setIsLogin} />}
    </div>
    )
}

export default AuthPage
