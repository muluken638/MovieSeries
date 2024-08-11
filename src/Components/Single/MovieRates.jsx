import React from 'react'
import Titles from '../Titles'
import { BsBookmarkStarFill } from 'react-icons/bs'

function MovieRates({ movie }) {
  const Ratings = [
    {
      title: '0 - Poor',
      value: 0
    }, {
      title: '1 - Fair',
      value: 1
    }, {
      title: '2 - Good',
      value: 2
    }, {
      title: '3 - Very Good',
      value: 3
    }, {
      title: '4 - Excellent',
      value: 4
    }
  ]
  return (
    <div className='my-12'>
      <Titles title="Reviews" Icon={BsBookmarkStarFill} />
      <div className="mt-10 xl:grid flex-colo grid-cols-5 gap-12 bg-main xs:p-10 py-10 px-2 sm:p-20 rounded-sm">
        {/* write a Review  */}
        <div className="xl-col-span-2 w-full flex flex-col gap-8">
          <h3 className="text-xl text-white font-semibold ">
            Reviews " {movie?.name}"
          </h3>
        </div>
      </div>
    </div>
  )
}

export default MovieRates