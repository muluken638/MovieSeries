import React from 'react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide, slidesPrevie } from 'swiper/react'
import { Movies } from '../Data/Movies'
import FlexMovieItems from '../Components/FlexMovieItems'
import { Link } from 'react-router-dom'
import { BiHeart } from 'react-icons/bi'
function Banner() {
    return (
        <div className='relative w-full'>
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
                    Movies.slice(0.6).map((movies, index) => (
                        <SwiperSlide key={index} className='relative rounded overflow-hidden'>
                            <img
                                src={`/images/movies/${movies.titleimage}`}
                                // src={posture}
                                alt={movies.name}
                                className='w-full h-full object-cover'
                            />
                            <div className="absolute linear-bg xl:pl-52 sm:pl-32 pl-8 top-0 bottom-0 right-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4 w-full">
                                <h1 className='xl:text-4xl truncate capitalize font-sans sm:text-2xl text-xl font-bold'>{movies.name}</h1>
                                <div className="flex gap-5 items-center text-dry pr-4">
                                     <FlexMovieItems movie={movies}/>
                                </div>
                                <div className="flex">
                                    <Link to={movies.name}
                                    className='bg-subMain hover:text-main transitions px-8 py-3 font-medium sm:text-sm text-xs rounded-lg' >
                                        Wtach
                                    </Link>
                                    <button className='bg-white hover:text-subMain transitions text-white px-4 mx-1 py-3 rounded-lg text-sm
                                     bg-opacity-30'>
                                        <BiHeart className='w-5 h-5 '/>
                                     </button>
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