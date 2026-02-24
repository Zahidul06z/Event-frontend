import { useState } from "react"
import useCreateComment from "../hooks/useCreateComment"
import { useParams } from "react-router-dom"

const CreateComment = ({setComments}) => {

    const [comment,setComment] = useState('')

    const {id} = useParams()

    // const handleSubmit = (e) =>{
    //     e.preventDefault()
    //     console.log(comment)
    //     setComment('')
    // }

    const handleSubmit = useCreateComment(comment,id,setComments,setComment)

  return (
    <div>
      <form className="flex gap-2 " onSubmit={handleSubmit}>
        <input className="w-[300px] sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] outline-none bg-gray-200 px-2 py-1.5" type="text" value={comment} onChange={(e)=>{setComment(e.target.value)}} placeholder="add comment..." />
        <button className="bg-blue-600 text-white py-0.5 px-2 cursor-pointer" type="submit">Post</button>
      </form>
    </div>
  )
}

export default CreateComment
