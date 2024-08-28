import React, { useEffect, useState } from 'react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide, slidesPrevie } from 'swiper/react'
// import { Movies } from '../Data/Movies'
import FlexMovieItems from '../Components/FlexMovieItems'
import { Link, useParams } from 'react-router-dom'
import { BiHeart } from 'react-icons/bi'
import axios from 'axios'
function Banner() {

    // const { id } = useParams(); // Retrieve movie ID from URL
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        // Fetch movie details based on ID
        axios.get(`http://localhost:3000/api/films`)
            .then(response => {
                setMovie(response.data);
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
            });
    }, );

    if (!movie) return <div>Loading...</div>;


    return (
        <div className='relative w-full mt-3'>
            <Swiper
                direction='horizontal'
                spaceBetween={0}
                slidesPrevie={3}
                loop={true}
                speed={1000}
                modules={[Autoplay]}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                className='w-full xl:h-96 bg-main lg:h-64 h-48'
            >
                {
                    movie.slice(0.6).map((movies, index) => (
                        <SwiperSlide key={index} className='relative rounded overflow-hidden'>
                            <img
                                src={`http://localhost:3000/images/films/${movies.poster_url}`}
                                // src={posture}
                                alt={movies.film_name}
                                className='w-full h-full object-cover'
                            />
                            <div className="absolute linear-bg xl:pl-52 sm:pl-32 pl-8 top-0 bottom-0 right-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4 w-full bg-main bg-opacity-60">
                                <h1 className='xl:text-4xl truncate capitalize font-sans sm:text-2xl text-xl font-bold'>{movies.film_name}</h1>
                                <div className="flex gap-5 items-center text-dry pr-4">
                                    <FlexMovieItems movie={movies} />
                                </div>
                                
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default Banner