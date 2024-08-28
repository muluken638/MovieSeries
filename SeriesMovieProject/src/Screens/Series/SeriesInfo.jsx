import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaPlay, FaShareAlt } from 'react-icons/fa';
import { BiLogIn } from 'react-icons/bi';

function SeriesInfo({seasonId}) {
  const { id } = useParams();
  const [season, setSeason] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/seriesinfo/${id}`)
      .then(response => {
        setSeason(response.data);
      })
      .catch(error => {
        console.error('Error fetching series details:', error);
      });
  }, [id]);
  if (!season) return <div>Loading...</div>;
  return (
    <div className='w-full xl:h-[400px] md:max-h-fit relative text-white'>
      <img
        src={`http://localhost:3000/images/series/${seasonId.poster_url}`}
        alt={season.title}
        className='w-full h-full  object-cover'
      />
      <div className="bg-main flex-colo xl:bg-opacity-90 xl:absolute md:absolute sm:absolute md:bg-opacity-90 top-0 right-0 bottom-0 left-0">
        <div className="container px-3 mx-auto xl:px-32 xl:grid grid-cols-3 flex-colo py-10 lg:py-10 gap-8">
          <div className="xl:col-span-1 w-[300px] xl:order-none order-last h-[300px] bg-main border border-border p-1 rounded-lg overflow-hidden">
            <img
              src={`http://localhost:3000/images/films/${seasonId.poster_url}`}
              alt={season?.title}
              className='w-full h-full object-cover rounded-lg'
            />
          </div>
          <div className="col-span-2 md:grid grid-cols-5 gap-4 items-center ">
            <div className="col-span-3 flex flex-col gap-10">
              {/* Title */}

              <h1 className="xl:text-4xl capitalize font-sans text-2xl font-bold">
                Title {"  : "}{season?.title}
              </h1>
              <h1 className="xl:text-2xl  font-sans text-2xl font-bold">
                Seasens {"  : "}5
              </h1>
              <p className="text-white text-sm leading-7">{season?.description}</p>
              <div className="grid sm:grid-cols-5 grid-cols-3 gap-4 p-6
             bg-main border border-gray-800 rounded-sm">
                {/* Share */}
                <div className="col-span-1 flex-colo border-r border-border">
                  <button className='w-10 h-10 flex-colo rounded-lg bg-white  bg-opacity-20'><FaShareAlt /></button>
                </div>
                <div className="col-span-2 flex-colo font-medium text-sm">
                  <p>Language : {' '} <span className='ml-2 truncate'>{season?.language}</span></p>
                </div>
                {/* Watch button */}
                <div className="sm:col-span-2 col-span-3 flex justify-end font-medium text-sm">
                  <Link to={`/watch/${season?.name}`} className='bg-main hover:bg-subMain transitions border-2 border-subMain rounded-full flex-rows gap-4 w-full  sm:py-3'>
                    <FaPlay className='w-4 h-4' />Watch
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-span-2 md:mt-0 mt-2 flex justify-end  ">
              <button className='md:w-1/4 w-full relative flex-colo bg-subMain hover:bg-transparent border-2 border-subMain transitions md:h-64 rounded font-medium sm:py-3'>
                <div className="flex-rows gap-6 text-md uppercase tracking-widest absolute md:rotate-90 sm:py-3  ">
                  Download <BiLogIn className='w-6 h-6 ' />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeriesInfo