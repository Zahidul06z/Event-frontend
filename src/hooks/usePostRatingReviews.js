import { useContext } from "react";
import { AuthContext } from "../usercontext/AuthContext";

const usePostRatingReviews = (ratings,text,setproductRatingReviews,productId,setAverage) => {

    const {user} = useContext(AuthContext)

    const handleSubmit = async (e) =>{
        e.preventDefault()
         try {
            const res = await fetch(`https://event-backend-dx9k.vercel.app/api/products/ratingreviews/${productId}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `${user?.token}`,
                },
                body: JSON.stringify({'text' : text, 'rating' : ratings}),
            });
            const data = await res.json();

            if (data.error) {
                console.log(data.error)
                return;
            }

            
            setproductRatingReviews(data?.ratings)
            setAverage(data?.average)
          
        } catch (error) {
            console.log("Error", error.message, "error");
        }
    }

     

  return handleSubmit
}

export default usePostRatingReviews
