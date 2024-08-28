import React from 'react'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='flex-colo gap-8 w-full min-h-screen text-white bg-main lg:py-20 py-10 px-6'>
      <img
        src="/images/404.svg"
        alt="not found image"
        className='w-full h-96 object-contain' />
      <h1 className="g:text-4xl font-bold">Page Not Found 404</h1>
      <p className='font-medium text-border italic leading-6'>The page you are looking for does not exist. </p>
      <Link to='/' className='bg-subMain text-white flex-rows gap-4 font-medium py-2 px-8 rounded-md'> <FaHome /> Go Back Home</Link>
    </div>
  )
}

export default NotFound