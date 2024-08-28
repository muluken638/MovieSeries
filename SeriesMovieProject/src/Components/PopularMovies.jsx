import React, { useEffect, useState } from 'react'
import Titles from './Titles.jsx'
import { BsCollectionFill } from 'react-icons/bs'
// import { Movies } from '../Data/Movies'
import Movie from './Movie.jsx'
import axios from 'axios'

function PopularMovies() {

  const [Movies, setMovies] = useState([]);

  useEffect(() => {
      // Fetch series
      axios.get('http://localhost:3000/api/series')
          .then(response => {
            setMovies(response.data);
          })
          .catch(error => {
              console.error('There was an error fetching the series!', error);
          });

  }, []);
  return (
    <div className='my-5 '>
      <Titles title="Popular Movies " Icon={BsCollectionFill}/>
      <div className='border-2 border-border '></div>
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