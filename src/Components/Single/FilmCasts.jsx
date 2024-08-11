import React, { useEffect, useState } from 'react';
import { FaUserFriends } from 'react-icons/fa';
import Titles from '../Titles';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import axios from 'axios';

function FilmCasts({ id }) {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // Skip fetching if no ID is provided

    const fetchCast = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/films/${id}/casts`);
        setCast(response.data.cast || []); // Ensure cast is an array
      } catch (error) {
        console.error('Error fetching cast data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [id]);

  if (!id) return <div>No film ID provided</div>;

  return (
    <div className="my-12">
      <Titles title="Casts" Icon={FaUserFriends} />
      <div className="mt-10">
        <Swiper
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={1000}
          module={[Autoplay]}
          spaceBetween={10}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            400: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
        >
          {loading ? (
            <SwiperSlide>Loading...</SwiperSlide>
          ) : cast.length === 0 ? (
            <SwiperSlide>No cast data available</SwiperSlide>
          ) : (
            cast.map((member, i) => (
              <SwiperSlide key={i}>
                <div className="w-full p-1 italic text-sm rounded-lg place-items-start flex-colo bg-main border border-border cursor-pointer truncate px-2 ">
                  <img 
                    src={member.picture}
                    alt={member.name}
                    className='w-full h-64 object-cover rounded mb-2'
                  />
                  <p className='text-xl font-bold text-cyan-300 px-3'>{member.name}</p>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </div>
  );
}

export default FilmCasts;
