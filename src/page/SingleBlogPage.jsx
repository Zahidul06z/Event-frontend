import { useParams } from "react-router-dom"
import useGetSingleBlog from "../hooks/useGetSingleBlog"
import BlogComments from "../components/BlogComments"

const SingleBlogPage = () => {
    
    const {id} = useParams()

    const {singleBlog,comments,setComments} = useGetSingleBlog(id)

    const words = singleBlog?.description?.split(" ");
    const lines = [];
    const wordsPerLine = 10; // Adjust based on font/width

    for (let i = 0; i < words?.length; i += wordsPerLine * 4) {
    lines.push(words.slice(i, i + wordsPerLine * 14).join(" "));
    }

  return (
    <div className="min-h-screen mt-15 py-5 w-full flex flex-col items-center justify-center text-gray-800">
        <div >
            <h2 className="text-xl font-bold mb-5 md:mt-7 lg:text-3xl lg:mt-15 lg:mb-10">{singleBlog?.title}</h2>
        </div>
        <div className="w-[300px] shadow-xl mb-5 sm:w-[70%]">
            {singleBlog?.image && <img className="w-fit  mx-auto" src={`/uploads/blog/images/${singleBlog?.image}`} alt="image" />}
            {singleBlog?.video && <video src={`/uploads/blog/videos/${singleBlog?.video}`} controls />}
        </div>
        <div className="w-[300px] sm:w-[70%] text-[15px] tracking-normal leading-loose text-justify lg:text-[17px]">
            {lines.map((block, idx) => (
                <p key={idx} className="mb-1 sm:mb-2">{block}</p>
            ))}
        </div>
        <div className="w-[300px] sm:w-[70%]">
            <BlogComments comments={comments} setComments={setComments} />
        </div>   
    </div>
  )
}

export default SingleBlogPage
