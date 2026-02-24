import { Link } from "react-router-dom"
import FreatureProduct from '../components/FeatureProduct'
import Slideshow from "../components/SlideShow"
// import CategoryFlex from "../components/CategoryFlex"
import CategoryFullScreen from "../components/CategoryFlex"
import SplitBanner from "../components/SplitBanner"
import HeroSlider from "../components/HeroSlider"
import Last from "../components/Last"
const HomePage = () => {


  return (
    <div className="w-full  mt-10 ">
      {/* <div className="h-110 bg-cover bg-center  sm:h-125 md:h-160 lg:h-240" style={{ backgroundImage: `url('./beautiful.jpeg')` }}>
            <div className="flex justify-center items-center pt-10 md:pt-20 lg:pt-25">
                <img className="w-[100px] sm:w-[150px] md:w-[200px] lg:w-[350px] " src="./1bottle.png" alt="image" />
                <img className="w-[150px] sm:w-[200px] md:w-[250px] lg:w-[400px] " src="./2bottle.png" alt="image" />
                <img className="w-[100px] sm:w-[150px] md:w-[200px] lg:w-[350px] " src="./3bottle.png" alt="image" />
            </div>
            <div className="text-center mt-3">
                
                <Link to={'/products'} className="bg-amber-500 py-2 px-3 text-[18px] hover:bg-amber-400  font-bold shadow-2xl ">VIEW ALL PRODUCTS</Link>
            </div>
      </div> */}
      <div>
        <Slideshow />
        <CategoryFullScreen />
        <SplitBanner />
        <FreatureProduct />
        <HeroSlider/>
        <Last />
        
      </div>
    </div>
  )
}

export default HomePage
