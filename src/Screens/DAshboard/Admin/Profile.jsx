import React from 'react'
import SideBar from './SideBar'
import { Input } from '../../../Components/UsedInputs'

function Profile() {
    return (
        <SideBar>
            <div className="flex flex-col gap-6">
                <h2 className="text-xl">Profile</h2>
                <Input label="Email"
                    placeholder="Enter Your Email "
                    type="email"
                    bg={true} />
                <Input label="Password"
                    placeholder="********"
                    type="password"
                    bg={true} />
                <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center">
                    <button className='bg-subMain transitions hover:bg-main border border-border text-white py-3 px-6  rounded hover:scale-95 '>Delete Account </button>
                    <button className='bg-main transitions hover:bg-subMain border border-border text-white py-3 px-6  rounded hover:scale-95 '>Update Account </button>

                </div>
            </div>
        </SideBar>
    )
}

export default Profile