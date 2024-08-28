import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import FlexMovieItems from '../../Components/FlexMovieItems';
import { FaDownload, FaLanguage, FaPlay, FaShareAlt } from 'react-icons/fa';
import { BiLogIn } from 'react-icons/bi';
import FilmCasts from './FilmCasts';
import Layout from '../../Layout/Layout';

function MovieInfo() {
  const { id } = useParams(); // Retrieve movie ID from URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // Fetch movie details based on ID
    axios.get(`http://localhost:3000/api/films/${id}`)
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.error('Error fetching movie details:', error);
      });
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <Layout>
    <div className='w-full xl:h-screen md:h-[50vh] xs:h-[50vh] relative text-white'>
      <img
        src={`http://localhost:3000/images/films/${movie.poster_url}`}
        alt={movie.title}
        className='w-full h-full xl:inline-block md:inline-block xs:inline-block object-cover'
      />
      <div className="xl:bg-main md:bg-main flex-colo xl:bg-opacity-90 xl:absolute md:bg-opacity-90 md:absolute top-0 right-0 bottom-0 left-0 xs:display-none">
        <div className="container px-3 mx-auto 2xl:px-32 xl:grid md:grid grid-cols-3 flex-colo py-5 lg:py-10 gap-8">
          <div className="xl:col-span-1 w-full xl:order-none glow md:order-none order-last h-[75%] bg-main border border-gray-800 rounded-lg overflow-hidden">
            <img
              src={`http://localhost:3000/images/films/${movie.poster_url}`}
              alt={movie.film_name}
              className='w-full h-full object-cover'
            />
          </div>
          <div className="col-span-2 md:grid grid-cols-5 gap-4 items-center">
            <div className="col-span-6 flex flex-col gap-10">
              <h1 className="xl:text-4xl capitalize font-sans text-2xl font-bold">
                {movie.film_name}
              </h1>
              <div className="flex items-center gap-4 font-medium text-dry">
                {/* <div className="flex-colo bg-subMain text-sm px-2 py-1 rounded-lg">HD $K</div> */}
                <FlexMovieItems movie={movie} />
              </div>
              <p className="text-white text-sm leading-7">{movie.desc}</p>
              
            </div>
            {/* <div className="col-span-2 md:mt-0 mt-2 flex justify-end">
              <button className='md:w-1/4 w-full relative flex-colo bg-subMain hover:bg-transparent border-2 border-subMain transitions md:h-64 rounded font-medium sm:py-3'>
                <div className="flex-rows gap-6 text-md uppercase tracking-widest absolute md:rotate-90 sm:py-3">
                  Download <BiLogIn className='w-6 h-6' />
                </div>
              </button>
            </div> */}
          </div>
        </div>
      </div>

    </div>
    <FilmCasts id={movie.id} />
    </Layout>

  );
}

export default MovieInfo;
