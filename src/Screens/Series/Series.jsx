import React, { useEffect, useState } from 'react';
import Layout from '../../Layout/Layout';
import { BiHeart, BiSearch } from 'react-icons/bi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { Autoplay } from 'swiper/modules';
import axios from 'axios';
import { FaClockRotateLeft } from 'react-icons/fa6';
import { FaEye } from 'react-icons/fa';
import SeriesMovieDetail from '../../Components/SeriesMovieDetail';

export default function Series() {
    const [series, setSeries] = useState([]);
    const [topMovies, setTopMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch series
        axios.get('http://localhost:3000/api/series')
            .then(response => {
                setSeries(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the series!', error);
            });

        // Fetch top movies
        axios.get('http://localhost:3000/api/topmovies')
            .then(response => {
                setTopMovies(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the top movies!', error);
            });

    }, []);

    // Filter series based on search term
    const filteredSeries = series.filter(serie =>
        serie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            <div className="flex flex-col gap-1">
                {/* Search engine */}
                <div className="col-span-3 ml-10 my-2 mr-10">
                    <form className='xl:w-[25%] text-sm bg-dry rounded flex-btn gap-4 md:w-full sm:w-full xs:w-full'>
                        <button
                            type='submit'
                            className='bg-subMain w-12 flex-colo h-12 rounded text-white'>
                            <BiSearch />
                        </button>
                        <input
                            type='text'
                            placeholder='Search'
                            value={searchTerm}
                            className='font-medium placeholder:text-border text-sm w-11/12 h-12 text-black rounded-sm outline-none bg-dry'
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </form>
                </div>
                <h1 className="text-3xl font-bold pl-11 py-4">Series Movies</h1>
                <div className='border-2 border-border mb-4'></div>

                {/* Display series from the database */}
                <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-3 mx-4">
                    {filteredSeries.map((series,i) => (
                            <Link key={i} to={`/api/seriesinfo/${series.id}`} className='w-full'>
                               <SeriesMovieDetail series={series}/>
                            </Link>
                        
                    ))}
                </div>

                {/* Display top 20 series */}
                <h1 className="text-3xl font-bold pl-11 py-4">Top Series Movies</h1>
                <div className='border-2 border-border mb-4'></div>
                <div className="container m-2">
                    <div className="mt-5">
                        <Swiper
                            breakpoints={{
                                0: { slidesPerView: 3 },
                                400: { slidesPerView: 3 },
                                768: { slidesPerView: 5 },
                                1024: { slidesPerView: 7 },
                            }}
                            slidesPerView={4}
                            spaceBetween={5}
                            autoplay={{ delay: 1000, disableOnInteraction: false }}
                            loop={true}
                            speed={1000}
                            modules={[Autoplay]}
                        >
                            {topMovies.map((movie) => (
                                <SwiperSlide key={movie.id}>
                                    <div className="border border-border p-1 hover:scale-95 transitions relative overflow-hidden rounded-lg">
                                        <Link to={`/singleseries/${movie.id}`} className='w-full'>
                                            <img
                                                src={`http://localhost:3000/images/series/${movie.poster}`}
                                                alt={movie.name}
                                                className='w-full h-64 object-cover' />
                                        </Link>
                                        <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-4">
                                            <div className="flex-spans gap-3">
                                                <h1 className="font-semibold truncate text-lg text-menutext">{movie.title}</h1>
                                                <h3 className="font-semibold truncate text-lg flex gap-2 items-center"> <FaClockRotateLeft />{movie.duration} </h3>
                                                <h4 className='text-sm text-right font-sans italic flex gap-2 items-center text-cyan-400'><FaEye />{movie.views} Views</h4>
                                            </div>
                                            <button className='h-9 w-9 text-sm flex-colo transitions hover:bg-transparent border-2 border-subMain rounded-md bg-subMain text-white'>
                                                <BiHeart />
                                            </button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>

                <div className="Movies">Movies are available here...</div>
                <div className="container border border-border flex md:flex-cols">
                    <div className='grid sm:mt-10 xl:grid-cols-4 2xl:grid-cols-3 sm:grid-cols-2 gap-6 m-4'>
                        {topMovies.map((series) => (
                            <div key={series.id} className="relative border border-border p-2 hover:scale-95 transition overflow-hidden rounded-lg">
                                <img
                                    src={`http://localhost:3000/images/series/${series.poster}`}
                                    alt={series.name}
                                    className='w-full h-64 object-cover'
                                />
                                <div className="bg-blue-600 opacity-10 w-full h-20">
                                    <p className='text-center text-lg font-bold w-full text-white'>
                                        {series.category}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
