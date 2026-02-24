import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useGetSingleProduct from '../hooks/useGetSingleProduct'
import SingleProduct from '../components/SingleProduct'
import RatingReview from '../components/RatingReview'

const SingleProductPage = () => {
    const {productId} = useParams()
    
    const [desc,setDesc] = useState(false)

    const [reviews,setreviews] = useState(false)

    // const [handleRatingReviews,setHandleRatingReviews] = useState('')

    

    const  { productRatingReviews,product,loading,setproductRatingReviews,setAverage,average,relatedCategory }  = useGetSingleProduct(productId)

    // const ratings = Object.values(productRatingReviews).map(data => data?.score).join(', ');
    // console.log(ratings)

  return (
    <div className='min-h-screen mt-10 bg-gray-200 w-full'>
      <div className='flex flex-col items-center'>
        {loading && <div className="flex justify-center items-center h-full mt-15 md:mt-20 ">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        </div>}
        <SingleProduct rating={average} product={product} desc={desc} setDesc={setDesc} reviews={reviews} setreviews={setreviews} />
        <RatingReview product={product} relatedCategory={relatedCategory} productId={productId} desc={desc} setDesc={setDesc} reviews={reviews} setreviews={setreviews} productRatingReviews={productRatingReviews} setproductRatingReviews={setproductRatingReviews} setAverage={setAverage} />
      </div>
    </div>
  )
}

export default SingleProductPage
