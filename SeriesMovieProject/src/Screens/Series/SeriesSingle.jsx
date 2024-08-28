import React, { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import { Movies } from '../../Data/Movies';
import { useParams } from 'react-router-dom';

import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Link } from 'react-router-dom'
import SeriesInfo from './SeriesInfo';
import { MovieData } from '../../Data/MovieData';
import Season from './Season';
import { MdRecommend } from 'react-icons/md';
import axios from 'axios';

function SeriesSingle() {

    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/series/episodes')
            .then(response => {
                console.log('Fetched series data:', response.data);
                setEpisodes(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the series!', error);
            });
    }, []);

    const { id } = useParams();
    const movie = episodes.find((movie) => movie.name === id);
    return (
        <Layout>
            <div className='min-h-full'>
                <Link to={`/api/seriesinfo/${movie?.name}`}>
                    <SeriesInfo movie={movie} />
                </Link>
                <div className="container  font-bold text-4xl  p-2">Seasons  {"  "} total 6</div>
                <div className="container flex justify-between  bg-main  pl-4 shadow-sm">
                    <Season movie={movie} className="h-full" />
                </div>
                <div className='flex text-white font-bold gap-2 items-center pl-6 my-4 text-4xl'> <MdRecommend />  Recomended Series Movies </div>
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
                            {
                                Movies.map((movie, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="p-4 md:mr-2 h-[200px] hovered border border-border bg-main rounded-lg overflow-hidden">
                                            <Link to={`/api/singleseries/${movie.name}`} className='w-full'>
                                                <img
                                                    src={`/images/movies/${movie.titleimage}`}
                                                    alt={movie.name}
                                                    className='w-full h-[200px] object-cover rounded-lg'
                                                />

                                            </Link>
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default SeriesSingle