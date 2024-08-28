import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { useParams } from 'react-router-dom'
import { Movies } from '../Data/Movies'
import FilmCasts from '../Components/Single/FilmCasts'
import MovieInfo from '../Components/Single/MovieInfo'
import MovieRates from '../Components/Single/MovieRates'
import axios from 'axios'
function SingleMovie() {
  const [movies,setMovies]=useState();
  const {id} =useParams();
  useEffect(() => {
    // Fetch series
    axios.get('http://localhost:3000/api/movies/:id')
        .then(response => {
            setMovies(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the series!', error);
        }); }, []);

  const movie= movies.find((movie)=>movie.name===id);
  return (

    <Layout>
      <MovieInfo movie={movie}/>
      <div className="container mx-auto min-h-screen px-2 my-6">
        <FilmCasts/>
        <MovieRates movie={{movie}}/>
      </div>
    </Layout>
  )
}

export default SingleMovie