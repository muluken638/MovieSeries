import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {

  const Links = [
    {
      title: 'Company',
      links: [
        {
          name: 'Home',
          link: '/'
        }, {
          name: 'About',
          link: '/about'
        }, {
          name: 'Movies',
          link: '/movies'
        }, {
          name: 'Login',
          link: '/login'
        }
      ]
    }, {
      title: 'Top Catagories',
      links: [
        {
          name: 'Romance',
          link: '#'
        }, {
          name: 'War',
          link: '#'
        }, {
          name: 'Drama',
          link: '#'
        }, {
          name: 'Comeddy',
          link: '#'
        }
      ]
    }, {
      title: 'My Accounts',
      links: [
        {
          name: 'Dashboard',
          link: '/dashboard'
        }, {
          name: 'My avorites',
          link: '/favorites'
        }, {
          name: 'Change Password',
          link: '/movies'
        }, {
          name: 'Password',
          link: '/change-password'
        }
      ]
    }
  ]

  return (
    <div className='bg-main py-4 bprder=t-2 border-black'>
      <div className="container mx-auto px-2">
        <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 py-10 justify-between">
          {Links.map((link, i) => (
            <div key={i} className='col-span-1 md:col-span-2 lg:col-span-3 pb-3.5 sm:pb-0'>
              <h1 className='text-md lg:leading-7 font-medium mb-4 sm:mb-5 lg:mb-6 pb-0.5'>{link.title}</h1>
              <ul>
                {link.links.map((text, index) => (
                  <li key={index} className='flex items-baseline'>
                    <Link to={text.link}
                      className='text-menutext inline-block w-full hover:text-subMain '>
                      {text.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="pb-3.5  sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
            <Link to='/'>
              <img src="/images/Avator.jpg" alt="brands"
                className='w-2/4 h-12 object-contain border border-border' />
            </Link>
            <p className='leading-7 text-sm text-menutext mt-3'>Create A Video Streaming Website, Similar To Netflix Using React. Js And Tailwind CSS
            
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer