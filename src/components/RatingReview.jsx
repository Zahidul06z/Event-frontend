import { useState } from "react"
import { CgProfile } from "react-icons/cg"
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa"
import usePostRatingReviews from "../hooks/usePostRatingReviews";
import ShipReturnPolicy from "./ShipReturnPolicy";
import RecentViewd from "./RecentViewd";
import RelatedCategory from "./RelatedCategory";


const RatingReview = ({product,relatedCategory,desc, reviews,setDesc,setreviews,productRatingReviews,setproductRatingReviews,productId,setAverage}) => {
    const [ratings, setRating] = useState(0); // Selected rating
    const [hover, setHover] = useState(0);   // Hovered star

    const [text,setRatingReview] = useState('')

    const [sliceValue,setSliceValue] = useState({'start' : 0, 'end' : 2})
    const [moreLess,setMoreLess] = useState(true)

    const handleChange = (e) =>{
        
        setRatingReview(e.target.value)
    }

    const handleClick = (currentRating) => {
        setRating(currentRating);
    };
   
    // const handleSubmit = (e)=>{
    //     e.preventDefault()
    //    console.log({'text' : text,'score' : ratings})
    // }

    const handleSubmit = usePostRatingReviews(ratings,text,setproductRatingReviews,productId,setAverage)


  return (
    <div className="w-full px-4  mt-5  lg:w-[80%]">
       {desc && <div className="mb-5">
            <h2 className="text-lg font-semibold mb-2">DESCRIPTION :</h2>
            <h2>{product.description}</h2>
            <button className="text-lg my-3 font-semibold underline cursor-pointer"  onClick={()=>setDesc(false)}>Less..</button>
       </div>}
       {reviews && <div>
            <h2 className="text-lg font-semibold mb-2">Reviews : </h2>
            <div>
                <h2 className="font-semibold capitalize">total reviews : {productRatingReviews?.length}</h2>
                {Object.values(productRatingReviews.slice(sliceValue.start,sliceValue.end)).map((ratingReview)=>{
                    return <div key={ratingReview?._id} className=" bg-gray-100  my-3 py-1">
                        <div className="flex items-center gap-2  py-1 px-2">
                            <CgProfile className="text-[22px]" />
                            <h3 className="text-xl font-semibold capitalize">{ratingReview?.name}</h3>
                        </div>
                        <div className="  text-gray-900 py-0.5">
                            {ratingReview?.score && (() => {
                                const score = parseFloat(ratingReview?.score);
                                const full = Math.floor(score);
                                const half = score % 1 >= 0.5;
                                const empty = 5 - full - (half ? 1 : 0);

                                return (
                                    <div className="flex space-x-1 text-amber-500 text-xl ml-6">
                                        {[...Array(full)].map((_, i) => <FaStar key={`full-${i}`} />)}
                                        {half && <FaStarHalfAlt key="half" />}
                                        {[...Array(empty)].map((_, i) => <FaRegStar key={`empty-${i}`} />)}
                                    </div>
                                );
                            })()}
                            {ratingReview?.reviwe && <h3 className="ml-6">Review : {ratingReview?.reviwe}</h3>}
                        </div>

                     </div>
                })}
            </div>
            {moreLess && productRatingReviews?.length > 2 ? <button className="text-lg my-3 font-semibold underline cursor-pointer"  onClick={()=>{setSliceValue(''),setMoreLess(false)}}>More...</button> : <button className="text-lg my-3 font-semibold underline cursor-pointer"  onClick={()=>setreviews(false)}>Less..</button>}
            <div className="pb-10 mt-3">
                <form className="border-1 border-white shadow-xl w-full px-2 py-3" onSubmit={handleSubmit} >
                    <div className="mb-3">
                        <input className="w-[304px] bg-gray-100 py-2 px-2 outline-none sm:w-[500px]" type="text" placeholder="Write something about product..." id="text" name="text" value={text} onChange={handleChange} />
                    </div>
                    <div className="flex">
                        <div className="flex space-x-1">
                        {[...Array(5)].map((_, index) => {
                            const currentRating = index + 1;
                            return (
                            <button
                                key={index}
                                type="button"
                                onClick={() => handleClick(currentRating)}
                                onMouseEnter={() => setHover(currentRating)}
                                onMouseLeave={() => setHover(0)}
                                className="focus:outline-none"
                            >
                                <FaStar
                                size={28}
                    className={
                        currentRating <= (hover || ratings)
                  ? "text-amber-500"
                  : "text-gray-300"
              }
            />
          </button>
        );
      })}
        </div>
            <button className="bg-amber-500 w-[100px] ml-3 uppercase font-semibold cursor-pointer hover:bg-amber-400 sm:px-2 py-2" type="submit">submit</button>
        </div>
                </form>
            </div> 

            

       </div>}
       <RelatedCategory relatedCategory={relatedCategory} />
       <RecentViewd />
       <ShipReturnPolicy /> 
    </div>
  )
}

export default RatingReview
