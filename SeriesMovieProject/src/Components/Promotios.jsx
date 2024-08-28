import React from 'react'
import { BsWatch } from 'react-icons/bs'
import { CgViewMonth } from 'react-icons/cg'
import { FaUserShield } from 'react-icons/fa'
import image from '../FilmPosture/League.jpg'
function Promotios() {
  return (
    <div className='my-20 py-10 md:px-8 bg-main'>
      <div className="lg:grid lg:grid-cols-2 lg:gap-10 ">
        <div className="flex lg:gap-10 gap-6 flex-col">
          <h1 className="xl:text-3xl text-xl capitalize font-sans font-medium text-white xl:leading-relaxed">
            Add Some advert here ..........
          </h1>
          <div className="flex gap-4 md:text-lg text-sm">
            {/* You can Add More Buttons like the Folowing below if there are more you can use a Map method */}
            <div className="flex-rows gap-2 bg-black text-subMain px-6 rounded-md py-3 font-bold">
              <CgViewMonth /> HD 4K
            </div>
            <div className="flex-rows gap-2 bg-black text-subMain px-6 rounded-md py-3 font-bold">
              <FaUserShield /> 2000
            </div>
          </div>
        </div>
        <div className="border border-border rounded-lg">
          <img src='/images/movies/Avator.jpg' alt="image is avialable"
            className='w-full object-cover ' />
        </div>
      </div>
    </div>
  )
}

export default Promotios