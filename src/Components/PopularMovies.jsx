import React from 'react'
import Titles from './Titles.jsx'
import { BsCollectionFill } from 'react-icons/bs'
import { Movies } from '../Data/Movies'
import Movie from './Movie.jsx'

function PopularMovies() {
  return (
    <div className='my-5 '>
      <Titles title="Popular Movies " Icon={BsCollectionFill}/>
      <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {
          Movies.slice(0, 8).map((movie, i) => (
            <Movie key={i} movie={movie} />
          ))
        }
      </div>
    </div>
  )
}
export default PopularMovies