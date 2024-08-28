import React from 'react'
import { BiCategory, BiHeart, BiLogIn } from 'react-icons/bi'
import { FaCalendarAlt, FaClock, FaPlay } from 'react-icons/fa'
import { FaLanguage } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

function FlexMovieItems({ movie }) {
  return (
    <div className='flex  gap-4 bg-main bg-opacity-60 xl:w-fit p-3 rounded-lg md:w-full xs:w-full '>
      <div className='w-2/5'>
        <h2 className='text-2xl pl-1 border-2 border-b-border border-r-0 border-l-0 border-t-0'>Description {" "}</h2>
        <span className='text:lg font-medium pl-6 md:text-xs xs:text-ellipsis'>{movie.description}</span>
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
        <div className='flex gap-2'>
          <FaLanguage className='text-subMain w-5 h-5' />
          <span className='text:sm font-medium'>{movie.language}</span>
        </div>
        <div className="flex h-fit justify-between ">
          <Link to={`/watch/${movie.id}`} className='bg-main hover:bg-subMain transitions border-2 border-subMain rounded-full flex-rows gap-4 w-full  px-5'>
            <FaPlay className='w-4 h-4' />Watch
          </Link>
          <button className='bg-white hover:text-subMain transitions text-white px-4 mx-1 py-3 rounded-lg text-sm bg-opacity-30'>
            <BiHeart className='w-5 h-5 ' />
          </button>
        </div>
      </div>
{/* 
      <button className='w-1/4 sm:flex-rows relative flex-colo bg-subMain hover:bg-transparent border-2 border-subMain transitions md:h-64 rounded font-medium sm:py-3'>
        <div className="flex-rows gap-6 text-md uppercase tracking-widest absolute rotate-90 sm:py-3">
          Download <BiLogIn className='w-6 h-6' />
        </div>
      </button> */}
      
    </div>
  )
}

export default FlexMovieItems