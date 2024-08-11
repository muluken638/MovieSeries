import React, { useState } from 'react'
import Titles from './Titles';
import { BiBookBookmark, BiHeart } from 'react-icons/bi';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper } from 'swiper/react';
import { Movies } from '../Data/Movies';
import { SwiperSlide } from 'swiper/react';
import staticImage from '../FilmPosture/Special26.jpg'
import { Link } from 'react-router-dom';
import Star from './Star';
import { BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';
function TopRelated() {
  const [nextMovie, setNextMovie] = useState(null);
  const [PrevMovie, setPrevMovie] = useState(null);
  const clasNames =
    'hover:bg-dry transitions text-sm rounded w-8 h-8  flex-colo bg-subMain text-white ';
  return (
    <div className='my-16'>
      <Titles title='Top Related Movies ' Icon={BiBookBookmark} />
      <div className="mt-10">
        <Swiper
          navigation={{ nextMovie, PrevMovie }}
          breakpoints={{
            0:{
              slidesPerView:1,
            },400:{
              slidesPerView:2,
            },768:{
              slidesPerView:2,
            },1024:{
              slidesPerView:4,
            }
          }}
          slidesPerView={4}
          spaceBetween={40}
          autoplay={true}
          Loop={true}
          speed={1000}
          modules={[Navigation, Autoplay]}
        >
          {
            Movies.map((movie, index) => (
              <SwiperSlide key={index}>
                <div className="p-4 h-rate hovered border border-border bg-main rounded-lg overflow-hidden">
                  <img
                    // here is the real Dyamic image format
                    src={`/images/movies/${movie.titleimage}`} alt="image is here "

                    // src={staticImage} alt="image is here "
                    className='w-full h-full object-cover rounded-lg' />
                  <div className="px-4 hoveres gap-6 text-center absolute bg-black bg-opacity-70 top-0 right-0 bottom-0 w-full">
                    <button className='w-12 h-12 flex-colo transitions hover:bg-subMain rounded-full bg-white bg-opacity-30 text-white'>
                      <BiHeart />
                    </button>
                    <Link className='font-semibold text-xl truncate line-clamp-2' to={`/movie/${movie.name}`}>
                      {movie.name}
                    </Link>
                    <div className="flex  gap-2 text-star">
                      <Star value={movie.rate} />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
        <div className="w-full px-1 flex-rows gap-6 pt-12">
          <button className={clasNames} ref={(node) => setPrevMovie(node)}>
            <BsCaretLeftFill /></button>
          <button className={clasNames} ref={(node) => setNextMovie(node)}><BsCaretRightFill /></button>

        </div>
      </div>
    </div>
  )
}

export default TopRelated