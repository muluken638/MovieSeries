import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout';
import Movie from '../Components/Movie';
import { FaEye, FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaClockRotateLeft } from 'react-icons/fa6';
import { BiHeart } from 'react-icons/bi';

function MoviesPage() {
  const [films, setFilms] = useState([]);
  const [topFilms, setTopFilms] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const maxPage = 4;

  useEffect(() => {
    // Fetch films data from API
    axios.get('http://localhost:3000/api/films')
      .then(response => {
        setFilms(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching films:', error);
        setError('Failed to fetch films data');
        setLoading(false);
      });

    // Fetch top viewed films
    axios.get('http://localhost:3000/api/topfilms')
      .then(response => {
        setTopFilms(response.data);
      })
      .catch(error => {
        console.error('Error fetching top films:', error);
        setError('Failed to fetch top films data');
      });
  }, []);

  // Update filtered movies based on category
  useEffect(() => {
    setFilteredMovies(
      activeCategory
        ? films.filter(movie => movie.category === activeCategory)
        : films
    );
  }, [activeCategory, films]);

  const handleCategoryClick = (title) => {
    setActiveCategory(title);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  // Calculate the movies to display based on page number
  const displayedMovies = filteredMovies.slice(0, page * maxPage);

  // Get distinct categories from movies data
  const distinctCategoriesData = [...new Set(films.map(movie => movie.category))];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <div
          className="flex gap-4 px-2 overflow-x-auto overflow-y-hidden sm:grid-cols-6 animate-smooth mb-2"
          style={{
            scrollbarWidth: 'none',
            '-ms-overflow-style': 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {distinctCategoriesData.map((title, i) => (
            <h1
              key={i}
              className={`bg-main border border-border rounded-md px-3 py-1 font-bold transitions cursor-pointer hover:scale-95 transitions ${activeCategory === title ? 'bg-subMain' : 'hover:bg-subMain'
                }`}
              onClick={() => handleCategoryClick(title)}
            >
              {title}
            </h1>
          ))}
        </div>
        <h1 className="text-3xl font-bold pl-11 pt-4">
          Total{' '}
          <span className=" text-subMain ">
            {filteredMovies.length}
          </span>
        </h1>

        <div className='border-2 border-brd '></div>
        {/* <div className=" border-2-gradient-to-tl from-[#3d0ae6] to-[#250682]"></div> */}
       
        <div className="grid sm:mt-10 xl:grid-cols-4 2xl:grid-cols-3 sm:grid-cols-2 gap-2">
          {displayedMovies.map((movie, index) => (
            <Link key={index} to={`/api/moviesinfo/${movie.id}`}>
              <Movie movie={movie} />
            </Link>
          ))}
        </div>
        {displayedMovies.length < filteredMovies.length && (
          <div className="w-full flex-colo md:my-20 my-10 ">
            <button
              onClick={handleLoadMore}
              className="flex-rows gap-3 text-white py-3 px-8 rounded font-semibold border-2 border-border hover:bg-subMain hover:scale-95 transitions "
            >
              Loading more <FaSpinner className="animate-spin" />
            </button>
          </div>
        )}
        <h1 className='text-3xl font-bold pl-11 pt-4'>Top Viewed Movies</h1>
        <div className='border-2 border-border '></div>
        <div className="grid sm:mt-10 xl:grid-cols-4 2xl:grid-cols-3 sm:grid-cols-2 gap-2">
          {topFilms.map((topFilm, i) => (
            <div key={i} className="border border-border p-1 hover:scale-95 transitions relative overflow-hidden rounded-lg">
              <Link to={`/api/moviesinfo/${topFilm.id}`} className='w-full'>
                <img
                  src={`http://localhost:3000/images/films/${topFilm.poster_url}`}
                  alt={topFilm.film_name}
                  className='w-full h-full object-cover'
                />
              </Link>
              <div className="absolute flex-btn gap-2 cursor-pointer bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-4">
                <div className="flex-spans gap-3">
                  <h1 className="font-semibold truncate text-lg text-menutext">{topFilm.film_name}</h1>
                  <h3 className="font-semibold truncate text-lg flex gap-2 items-center">
                    <FaClockRotateLeft /> {topFilm.duration}
                  </h3>
                  <h4 className='text-sm text-right font-sans italic flex gap-2 items-center text-cyan-400'>
                    <FaEye /> {topFilm.views} Views
                  </h4>
                </div>
                <button className='h-9 w-9 text-sm flex-colo transitions hover:bg-transparent border-2 border-subMain rounded-md bg-subMain text-white'>
                  <BiHeart />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default MoviesPage;
