import React, { useState } from 'react'
import Layout from '../Layout/Layout'
import { Link, useParams } from 'react-router-dom'
import { BiArrowBack, BiLogIn } from 'react-icons/bi'
import { Movies } from '../Data/Movies'
import { FaHeart, FaPlay } from 'react-icons/fa'
function WatchMovies() {
  let { id } = useParams();
  const movie = Movies.find((movie) => movie.name ===id);
  const [play, setPlay] = useState(false);
  return (
    <Layout>
      <div className="container mx-auto bg-main p-6 mb-12">
        <div className="flex-btn flex-wrap mb-6 gap-2 bg-main  rounded border border-border p-6">
          <Link to={`/movie/${movie?.name}`}
            className='md:text-sm text-sm flex gap-3 items-center font-bold text-dry'>
            <BiArrowBack />{movie?.name}
          </Link>
          <div className="flex-btn sm:w-auto w-full gap-5">
            <button className='bg-white hover:text-subMain transitions bg-opacity-30 rounded px-4 py-3 text-sm'>
              <FaHeart />
            </button>
            <button className='bg-subMain flex-rows hover:text-main transitions text-white rounded px-8 py-3 text-sm'>
              <BiLogIn />
            </button>
          </div>
        </div>

        {/* playing the Vedio  */}
        {
          play ? (
            <video controls autoPlay={play} className='w-full h-full rounded'>
              <source src={`/images/${movie?.videoName} `} type='video/mp4' title={movie?.name} />
            </video>

          ) : (
            <div className="w-full h-screen rounded-lg overflow-hidden relative ">
              <div className="absolute top-0 left-0 bottom-0 right-0  bg-main bg-opacity-30 flex-colo">
                <button onClick={() => setPlay(true)} className='bg-white text-subMain flex-colo border border-subMain rounded-full w-20 h-20 font-medium text-xl'>
                  <FaPlay />
                </button>
              </div>
              <img src={
                movie?.titleimage ? `/images/movies/${movie?.titleimage}` : 'images/user.png'
              } alt={movie?.name} 
              className='w-full h-full object-cover rounded-lg'/>
            </div>
          )
        }
      </div>
    </Layout>
  )
}

export default WatchMovies