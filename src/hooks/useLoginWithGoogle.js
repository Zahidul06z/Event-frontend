import { useContext, useEffect } from "react";
import { AuthContext } from "../usercontext/AuthContext";

const useLoginWithGoogle = () => {

  const {login} = useContext(AuthContext)

  const handleClick = async()=>{
    window.location.href = 'http://localhost:5000/api/users/auth/google';
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
      const data = {
        success : true,
        message : 'User Login Successfully',
        token : params.get("token"),
        _id : params.get("_id"),
        name : params.get("name"),
        email : params.get("email"),
        role : params.get('role')
      }

    if (data.token) {
      login(data)
    }
  }, [login]);
    return handleClick
  }

export default useLoginWithGoogle
