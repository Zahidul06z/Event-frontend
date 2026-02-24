import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./page/HomePage"
import Header from "./components/Header"
import Bottom from "./components/Bottom"
import AuthPage from "./page/AuthPage"
import Dashboard from "./page/Dashboard"
import Products from "./page/Products"
import AddProduct from "./components/AddProduct"
import AddStory from "./components/AddStory"
import AddBlog from "./components/AddBlog"
import { useContext } from "react"
import { AuthContext } from "./usercontext/AuthContext"
import Cart from "./page/CartPage"
import ProfilePage from "./page/ProfilePage"
import OrderPage from "./page/OrderPage"
import BlogPage from "./page/BlogPage"
import StoryPage from "./page/StoryPage"
import SingleProductPage from "./page/SingleProductPage"
import CancelPage from "./page/CancelPage"
import FailPage from "./page/FailPage"
import SuccessPage from "./page/SuccessPage"
import SingleBlogPage from "./page/SingleBlogPage"
import PaymentSuccess from "./components/PaymentSuccess"
import PaymentFailed from "./components/PaymentFailed"
import ProductTrackPage from "./page/ProductTrackPage"
import AddCoupon from "./page/AddCoupon"
import WishList from "./page/WishList"


function App() {
 
  const {user} = useContext(AuthContext)

  const RequireAdmin = ({ user, children }) => {
    if (!user) return <Navigate to="/" />;
    if (user.role !== 'admin') return <Navigate to="/" />;
    return children;
};

  return (

      <div className="relative p-0 m-0 select-none">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={!user ? <AuthPage/> : user?.role === 'admin' ? <Navigate to={'/dashboard'} /> :<Navigate to={'/order'}/>} />
          <Route path="/dashboard" element={<RequireAdmin user={user}> <Dashboard /> </RequireAdmin>}/>
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<SingleProductPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<SingleBlogPage />} />
          <Route path="/ourstory" element={<StoryPage />} />
          <Route path="/profile/:id" element={user ? <ProfilePage /> : <Navigate to={'/auth'} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order/:id" element={user ? <OrderPage/> : <Navigate to={'/auth'}/>} />
          <Route path="/addproduct/:id" element={<AddProduct />} />
          <Route path="/addstory/:id" element={<AddStory />} />
          <Route path="/addblog/:id" element={<AddBlog />} />  
          <Route path="/order-success/:id" element={<SuccessPage />} />
          <Route path="/payment-fail" element={<FailPage />} />
          <Route path="/payment-cancel" element={<CancelPage />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/failed" element={<PaymentFailed />} />
          <Route path="/payment/cancelled" element={<PaymentFailed />} />
          <Route path="/payment/error" element={<PaymentFailed />} />
          <Route path="/product/wishlist" element={<WishList/>} />
          <Route path="/product/tarck/:id" element={user ? <ProductTrackPage /> : <Navigate to={'/auth'}/> } />
          <Route path="/addcoupon/:id" element={user ? <AddCoupon/> : <Navigate to={'/auth'} />} />
        </Routes>
        <Bottom />
      </div>

  )
}

export default App
