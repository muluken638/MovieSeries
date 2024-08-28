import React from 'react';
import { Link } from 'react-router-dom';
import { BiHeart } from 'react-icons/bi';
import { FaClockRotateLeft } from 'react-icons/fa6';
import { FaEye } from 'react-icons/fa';

function SeriesMovieDetail({ series }) {
    return (
        <div className="border border-border p-1 hover:scale-95 transitions relative overflow-hidden rounded-lg">
            <Link to={`/api/seriesinfo/${series.id}`} className='w-full'>
                <img
                    src={`http://localhost:3000/images/films/${series.poster_url}`}
                    alt={series.name}
                    className='w-full h-64 object-cover'
                />
            </Link>

            <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-4">
                <div className="flex-spans gap-3">
                    <h1 className="font-semibold truncate text-lg text-menutext">{series.title}</h1>
                    <h3 className="font-semibold truncate text-lg flex gap-2 items-center">
                        <FaClockRotateLeft /> {series.duration}
                    </h3>
                    <h4 className='text-sm text-right font-sans italic flex gap-2 items-center text-cyan-400'>
                        <FaEye /> {series.views} Views
                    </h4>
                </div>
                <button className='h-9 w-9 text-sm flex-colo transitions hover:bg-transparent border-2 border-subMain rounded-md bg-subMain text-white'>
                    <BiHeart />
                </button>
            </div>
        </div>
    );
}

export default SeriesMovieDetail;
