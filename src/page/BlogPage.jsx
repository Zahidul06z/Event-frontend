import React from 'react'
import GetBlog from '../components/GetBlog'

const BlogPage = () => {
  return (
    <div className='min-h-screen bg-gray-200 mt-10 w-full flex justify-center flex-col items-center py-10 '>
      <h2 className='text-2xl font-bold text-gray-800 mb-10 sm:mt-5 md:mt-10 lg:text-4xl lg:mt-15'>Blog</h2>
      <div className='flex items-center justify-center'>
        <GetBlog />
      </div>
    </div>
  )
}

export default BlogPage
