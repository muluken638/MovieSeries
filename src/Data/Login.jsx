import React from 'react'

function Login() {
    return (
        <body className='flex justify-center align-middle bg-main h-screen'>
            <div className=" flex flex-col h-[50%] bg-subMain w-fit mt-[50%] rounded-lg">
                <div className="title text-lg font-bold underline text-white flex items-center pt-2">Login</div>
                <div className="">
                    <div className="w-full ">
                        <input type="text" placeholder='Enter Your Name' className='px-2 rounded-sm mx-2 w-fit' />
                    </div>
                    <div className="w-full">
                        <input type="password" placeholder='Enter Your Password' className='px-2 rounded-sm mx-2 w-fit' />
                    </div>
                </div>
            </div>
        </body>
    )
}

export default Login