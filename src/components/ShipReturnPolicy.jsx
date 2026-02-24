import React, { useState } from 'react'
import datas from '../utils'
import { MdOutlineNavigateNext } from 'react-icons/md'

const ShipReturnPolicy = () => {
const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='mt-5 mb-10'>
      <div className='text-gray-900 text-xl font-semibold mb-5'>
        <h2>Shipping Return & Refund Policy : </h2>
      </div>
      {datas && Object.values(datas).map((data, index) => (
        <div  key={data?.id} >
          <div  onClick={() => handleToggle(index)}>
            <div className='flex justify-between items-center mb-5 uppercase cursor-pointer px-2 py-1 bg-gray-100'>
              <h2 className='text-md font-semibold'>{data?.title} :</h2>
              <MdOutlineNavigateNext
                className={`text-[27px] transition-transform duration-300 ${openIndex === index ? 'rotate-90' : ''}`}
              />
            </div>
            {openIndex === index && (
              <p className='my-4 text-justify  bg-gray-100 py-2 px-3'>{data?.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShipReturnPolicy
