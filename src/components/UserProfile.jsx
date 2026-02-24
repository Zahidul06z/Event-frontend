import { useContext } from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { AuthContext } from "../usercontext/AuthContext";
import useUserLogout from "../hooks/useUserLogout";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useParams } from "react-router-dom";

const UserProfile = () => {
    const {user,logout} = useContext(AuthContext)
    const handelClick = useUserLogout({user,logout})

    const {id} = useParams()

    const userProfile = useGetUserProfile(id)

  return (
    <div className="py-10 flex  justify-center  md:mt-20">
      <div className="flex justify-between items-center w-full px-10 xl:px-30">
        <div className="flex items-center ">
          <div className="relative">
            <CgProfile className="text-[35px] bg-white p-1 rounded-[50%]"/>
            {user && <p className="w-[10px] h-[10px] bg-green-600 absolute top-1 left-7 rounded-[50%]"></p>}
          </div>
          <h2 className="ml-4  text-gray-800 font-semibold">{userProfile?.name}</h2>
        </div>
        <div>
          <RiLogoutCircleLine  className="text-gray-800 text-2xl cursor-pointer hover:text-red-600" onClick={handelClick} />
        </div>
      </div>
    </div>
  )
}

export default UserProfile
