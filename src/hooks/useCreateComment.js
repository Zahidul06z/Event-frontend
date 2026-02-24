import { useContext } from "react";
import { AuthContext } from "../usercontext/AuthContext";

const useCreateComment = (comment,id,setComments,setComment) => {

    const {user} = useContext(AuthContext)

    const handleSubmit = async (e) =>{
        e.preventDefault()
         try {
            const res = await fetch(`https://event-backend-dx9k.vercel.app/api/blogs/comment/${user?._id}/${id}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `${user?.token}`,
                },
                body: JSON.stringify({'comment' : comment}),
            });
            const data = await res.json();

            if (data.error) {
                console.log(data.error)
                return;
            }

            
            setComments(data?.comments)
            setComment('')
          
        } catch (error) {
            console.log("Error", error.message, "error");
        }
    }

    return handleSubmit
}

export default useCreateComment
