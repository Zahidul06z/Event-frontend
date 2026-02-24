import { useContext } from 'react'
import EmptyCart from '../components/EmptyCart'
import ProductCart from '../components/ProductCart'
import { AuthContext } from '../usercontext/AuthContext'

const Cart = () => {
  const { getProduct } = useContext(AuthContext)
  
  return (
    <div className='min-h-screen mt-10 w-full  bg-gray-200 '>
      {getProduct?.length ===  0 || getProduct === null ? <EmptyCart /> :
      <ProductCart />}
    </div>
  )
}

export default Cart
