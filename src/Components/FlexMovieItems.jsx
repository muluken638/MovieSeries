import React from 'react'
import { BiCategory } from 'react-icons/bi'
import { FaCalendarAlt, FaClock } from 'react-icons/fa'

function FlexMovieItems({ movie }) {
  return (
    <div className='flex justify-between gap-4'>
      <div>
        <h2 className='text-2xl pl-1 border-2 border-b-border border-r-0 border-l-0 border-t-0'>Description {" "}</h2>
        <span className='text:lg font-medium pl-4 '>{movie.description}</span>
      </div>
      <div className="border border-l-border w-fit px-5 pt-2 border-r-0 border-b-0 border-t-0 flex items-start flex-col gap-3">
        <div className='flex  gap-4  '>
          <BiCategory className='text-subMain w-5 h-5' />
          <span className='text:lg font-medium '>{movie.category}</span>
        </div>
        <div className='flex  gap-2'>
          <FaCalendarAlt className='text-subMain w-5 h-5' />
          <span className='text:sm font-medium'>{movie.year_released}</span>
        </div>
        <div className='flex gap-2'>
          <FaClock className='text-subMain w-5 h-5' />

          <span className='text:sm font-medium'>{movie.duration}</span>
        </div>
      </div>



    </div>
  )
}

export default FlexMovieItems