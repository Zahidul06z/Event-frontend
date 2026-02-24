import React from 'react'
import CreateComment from './CreateComment'

const BlogComments = ({comments,setComments}) => {
  return (
    <div className='text-gray-800'>
      <h2 className='font-bold text-2xl'>Comments : </h2>
        {Object.values(comments).map((comment)=>{
            return <div key={comment?._id} className='mt-3 bg-blue-200 px-2 py-0.5 flex items-center gap-2'>
                <div>
                    <img className='w-[30px] h-[30px]' src="/profile-user.png" alt="profile" />
                </div>
                <div className=''>
                    <h4 className='font-semibold'>{comment?.userName}</h4>
                    <h2>{comment?.comment}</h2>
                </div>
            </div>
        })}
      <div className='mt-2'>
        <CreateComment setComments={setComments} />
      </div> 
    </div>
  )
}

export default BlogComments
