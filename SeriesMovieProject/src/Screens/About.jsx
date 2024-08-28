import React from 'react'
import Layout from '../Layout/Layout'
import Head from '../Components/Head'
import { Link } from 'react-router-dom'
function About() {
  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Head title="About Us" />
        <div className="xl:py-10 py-10 px-4 ">
          <div className="grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center">
            <div className='mt-1'>
              <h3 className='text-xl lg:text-3xl  font-semibold'>
               Well come to this is Movie Series program for free. You can download here and watch online that the desired Movies
              </h3>
              <div className="mt-3 text-sm text-white">
                <p>Add paragraph About the Movie Chanal .........</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="p-8 bg-blue-900 border border-border rounded-lg flex flex-col items-center">
                  <span className='text-3xl block font-extrabold'>10K</span>
                  <h4 className='text-lg font-bold my-2'> Listed Movies</h4>
                  <p className='mb-0 text-white leading-7 text-sm'>here is also some paragraph about the Movies </p>
                </div>
                <div className="p-8 bg-blue-900 border border-border rounded-lg flex flex-col items-center">
                  <span className='text-3xl block font-extrabold '>5K</span>
                  <h4 className='text-lg font-bold my-2'> Favorite Movies</h4>
                  <p className='mb-0 text-white leading-7 text-sm'>Here is the most favorited movies are avialable please  <span className='text-red-400 underline font-bold italic'>
                    <Link to={'#'}>
                      Register</Link></span>  and enjoy whith Us </p>
                </div>
              </div>
            </div>
            <div className="mt-10 border border-border rounded-md">
              <img src='/images/movies/Taken3.jpg' alt="favorite"
              className='w-full xl:block hidden h-header rounded-lg object-cover' />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default About