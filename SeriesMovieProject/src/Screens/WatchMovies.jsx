import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout';
import { useParams, useNavigate } from 'react-router-dom';
import { BiArrowBack, BiLogIn } from 'react-icons/bi';
import { FaHeart, FaPlay } from 'react-icons/fa';
import axios from 'axios';

function WatchMovies() {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [movie, setMovie] = useState(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    // Fetch the movie details based on the ID
    axios.get(`http://localhost:3000/api/films/${id}`)
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.error('Error fetching movie details:', error);
      });
  }, [id]);

  const handlePlayClick = () => {
    setPlay(true);
    // Increment views in the backend
    axios.post(`http://localhost:3000/api/films/${id}/increment-views`)
      .then(response => {
        console.log('Views incremented successfully');
      })
      .catch(error => {
        console.error('Error incrementing views:', error);
      });
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="container mx-auto bg-main p-6 mb-12">
        <div className="flex-btn flex-wrap mb-6 gap-2 bg-main rounded border border-border p-1 w-fit">
          <button 
            onClick={() => navigate(-1)}  
            className='md:text-sm text-sm flex gap-3 items-center font-bold text-dry'
          >
            <BiArrowBack /> {movie.film_name}
          </button>
          {/* <div className="flex-btn sm:w-auto w-full gap-5">
            <button className='bg-white hover:text-subMain transitions bg-opacity-30 rounded px-4 py-3 text-sm'>
              <FaHeart />
            </button>
            <button className='bg-subMain flex-rows hover:text-main transitions text-white rounded px-8 py-3 text-sm'>
              <BiLogIn />
            </button>
          </div> */}
        </div>

        {/* Playing the Video */}
        {
          play ? (
            <video controls autoPlay={play} className='w-full h-full rounded'>
              <source src={`http://localhost:3000/videos/${movie.videoName}`} type='video/mp4' title={movie.film_name} />
            </video>
          ) : (
            <div className="w-full h-screen rounded-lg overflow-hidden relative ">
              <div className="absolute top-0 left-0 bottom-0 right-0 bg-main bg-opacity-30 flex-colo">
                <button onClick={handlePlayClick} className='bg-white text-subMain flex-colo border border-subMain rounded-full w-20 h-20 font-medium text-xl'>
                  <FaPlay />
                </button>
              </div>
              <img src={
                movie.poster_url ? `http://localhost:3000/images/films/${movie.poster_url}` : 'images/user.png'
              } alt={movie.film_name} 
              className='w-full h-full object-cover rounded-lg'/>
            </div>
          )
        }
      </div>
    </Layout>
  );
}

export default WatchMovies;
