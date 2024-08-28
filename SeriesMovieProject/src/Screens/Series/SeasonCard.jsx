import React from 'react';
import { BiHeart } from 'react-icons/bi';
import { MdNewReleases } from 'react-icons/md';

const SeasonCard = ({ season, onClick }) => {
  return (
    <div className="border border-border cursor-pointer p-1 hover:scale-95 transitions relative overflow-hidden rounded-lg"
      key={season.id}
      onClick={onClick}
    >
      <img
        src={`http://localhost:3000/images/films/${season.posture}`}
        alt={season.title}
        className="w-full h-64 object-cover rounded-lg"
      />
      <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-4">
        <div className="flex-spans gap-3">
          <h1 className="font-semibold truncate text-lg text-subMain">{season.title}</h1>
          <div className="flex  justify-between pr-0">
            <h3 className="font-semibold truncate text-lg flex gap-2 items-center ">
              <MdNewReleases className='gap-2' /> {season.release_year}
            </h3><button className='h-9 w-9 text-sm flex-colo transitions hover:bg-transparent border-2 border-subMain rounded-md bg-subMain text-white'>
              <BiHeart />
            </button>
          </div>
          {/* <h4 className='text-sm text-right font-sans italic flex gap-2 items-center text-cyan-400'>
                <FaEye /> {serie.Views > 999 ? (serie.Views > 9999 ? (serie.Views > 99999 ? `${Math.floor(serie.Views / 100000)}M` : `${Math.floor(serie.Views / 10000)}K`) : `${Math.floor(serie.Views / 1000)}K`) : serie.Views} Views
            </h4> */}
        </div>

      </div>
    </div>
  );
};

export default SeasonCard;