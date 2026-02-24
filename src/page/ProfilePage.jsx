import { useParams } from "react-router-dom"
import UserOrder from "../components/UserOrder"
import UserProfile from "../components/UserProfile"
import useGetOrderProduct from "../hooks/useGetOrderProduct"

const ProfilePage = () => {

   const {id} = useParams()

    const { orderProduct,loading } = useGetOrderProduct(id)
  return (
    <div className='min-h-screen mt-10 bg-gray-200 w-full'>
      <UserProfile />
      {loading && <div className="flex justify-center items-center h-full mt-10">
      <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
    </div>}
      <UserOrder orderProduct={orderProduct}/>
    </div>
  )
}

export default ProfilePage
