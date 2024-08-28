import React from 'react'
import Layout from '../Layout/Layout'
import { Input } from '../Components/UsedInputs'
import { Link } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
// import { BiRegistered } from 'react-icons/bi'
function Register() {
  return (
    <Layout>
      <div className="container mx-auto px-2 mt-15 flex-colo">
        <div className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 md:w-3/5 bg-main rounded-lg border border-border">
          <img src='' alt="logo"
            className='w-full h-12 object-contain' />
          <Input label="First Name"
            placeholder="Enter Your Email "
            type="firstname"
            bg={true} />
          <Input label="Email"
            placeholder="Enter Your Email "
            type="email"
            bg={true} />
          <Input label="Password"
            placeholder="********"
            type="password"
            bg={true} />
          <Link to='/register' className='bg-subMain border border-border transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full'>
            <FiLogIn /> Sign Up
          </Link>
          <p className="text-center text-border">
            Have an account? {' '}
            <Link to='/login' className='text-dry font-semibold  ml-2'>Sign In</Link>
          </p>
        </div>
      </div>
    </Layout>

  )
}

export default Register