import React from 'react'
import Layout from '../Layout/Layout'
import { Input } from '../Components/UsedInputs'
import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'
import { FiLogIn } from 'react-icons/fi'
function Login() {
  return (
    <Layout>
      <div className="container mx-auto px-2 mt-4 my-24 flex-colo">
        <div className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 md:w-3/5 bg-main rounded-lg border border-border">
          <img src='' alt="logo"
            className='w-full h-12 object-contain' />
          <Input label="Email"
            placeholder="Enter Your Email "
            type="email"
            bg={true} />
          <Input label="Password"
            placeholder="********"
            type="password"
            bg={true} />
          <Link to='/dashboard' className='bg-subMain border border-border transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full'>
            <FiLogIn /> Sign In
          </Link>
          <p className="text-center text-border">
            Don't have an account? {' '}
            <Link to='/register' className='text-dry font-semibold  ml-2'>Sign Up</Link>
          </p>
        </div>
      </div>
    </Layout>

  )
}

export default Login