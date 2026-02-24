import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../usercontext/AuthContext';
import { useRef } from 'react';
import { FaRegImages } from "react-icons/fa";
import { RiCloseLargeFill } from "react-icons/ri";
import { toast, ToastContainer } from 'react-toastify';

const AddBlog = () => {

    const fileRef = useRef(null)
    const [previews, setPreviews] = useState({
      image: null,
      video: null,
    });
    const [mediaFiles, setMediaFiles] = useState({
      image: null,
      video: null,
    });
    

    const handleClick = (e) => {
        // Trigger the file input click
        e.preventDefault()
        fileRef.current.click();
      };

      const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const newPreviews = { image: null, video: null };
        const newMediaFiles = { image: null, video: null };
      
        files.forEach((file) => {
          const url = URL.createObjectURL(file);
      
          if (file.type.startsWith("image/") && !newPreviews.image) {
            newPreviews.image = url;
            newMediaFiles.image = file;
          } else if (file.type.startsWith("video/") && !newPreviews.video) {
            newPreviews.video = url;
            newMediaFiles.video = file;
          }
        });
      
        setPreviews(newPreviews);
        setMediaFiles(newMediaFiles);
      };
      
    //  console.log(mediaFiles.image.name)


    const [course,setCourse] = useState({description : '',title : ''})

    const [error,setError] = useState('')

    const {description,title} = course

    const {user} = useContext(AuthContext)

    const handleChange = (e) =>{
      const name = e.target.name
       setCourse((course) => ({
              ...course,
              [name]: e.target.value
          }));  
    }
   
    const handleSubmit = async(e) =>{
      e.preventDefault()

      if (!mediaFiles.image && !mediaFiles.video) {
        console.log("No files selected");
        return;
      }
        // const feedbackArray = input.value.split(',').map(item => item.trim());
      const formData = new FormData();
      formData.append("description",description)
      formData.append("title",title)
      if (mediaFiles.image) formData.append("image", mediaFiles.image);
      if (mediaFiles.video) formData.append("video", mediaFiles.video);


      try {
        const res = await fetch(`/api/blogs/createblog/${user?._id}`,{
          method: "POST",
          headers: {
              // "Content-Type": "application/json",
              Authorization : `${user.token}`
          },
          body: formData
          // file : JSON.stringify({image : mediaFiles?.image?.name, videos : mediaFiles?.video?.name})
          
      });
      const data = await res.json();

      if (data.error) {
          setError(data.error)
          return;
      }
      toast.success("Blog Ctraet Successfully")
      setCourse({description : '',title : ''})
     setPreviews({ image: null,video : null })
      } catch (error) {
        setError('Error',error.message,'error')
      }

    }

  return (
    <div className='min-h-screen mt-20 p-2 flex justify-center bg-indigo-900 w-full'>
      <ToastContainer
      position='left-top-right'
      theme="colored" />
      <div className='mt-10'>
        <form className='border-1 border-white py-2 px-2 mb-10 shadow-2xl sm:px-4' onSubmit={handleSubmit}>
            <div>
                <div className='flex justify-center border-1 border-white mt-4 mb-6'>
                  <button onClick={handleClick} className='text-white font-semibold my-2 cursor-pointer '>Upload Blog Video or Image </button>
                  <FaRegImages className='text-white mt-3.5 ml-3'/>
                </div>
                <input type="file" ref={fileRef} accept="image/*,video/*" multiple onChange={handleFileChange} className="mb-6 " style={{ display: 'none' }} />
            </div>
           <div>
                {previews?.image && <div className='relative'>
                  <img src={previews.image} className='w-[320px] h-[400px]  rounded-[5px] shadow-lg mb-5'  />
                  <RiCloseLargeFill className='absolute top-5 right-5 text-2xl text-gray-400 cursor-pointer hover:text-red-700 border hover:border-red-700'  onClick={() => setPreviews({ image: null })}/>
                  </div>}
                {previews?.video && <video
                src={previews.video}
                controls
                width="320"
                className="rounded shadow-lg mb-3"
                />}
            </div>
            <div>
              <input type="text" className='bg-blue-100 text-blue-700 w-[320px]  outline-none px-2 py-1' name='title' id='title' placeholder='title' onChange={handleChange} value={title} />
           </div>
           <div className='mb-6 mt-6'>
              <textarea className='bg-blue-100 text-blue-700 w-[320px] h-auto outline-none px-2'  name="description" id="description" placeholder='Write somethings about your daily work...' onChange={handleChange} value={description} />
           </div>
          
           {error && <div className='w-[320px] text-center mb-4'>
                        <h2 className="text-red-800 mt-3">{error}</h2>
                    </div>}
          <div className='mb-10'>
            <button type='submit' className='bg-amber-600 py-1.5 px-2 font-semibold w-[320px] cursor-pointer hover:bg-amber-500'>Add Course</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBlog
