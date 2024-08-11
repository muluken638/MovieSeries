import React, { useState } from 'react'
import { BiHeart, BiLogIn, BiNotification, BiSearch } from 'react-icons/bi'
import { MdNotifications } from 'react-icons/md';
import { Link, NavLink } from 'react-router-dom'
import { NavbarLinks } from '../Contents/Links';

function NavBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const hover = 'hover:text-main transitions text-white hover:bg-subMain px-4 py-2 border border-border rounded-md ';
  const Hover = ({ isAcive }) => (isAcive ? 'text-subMain' : hover)

  const handleSearch = (e) => {
    e.preventDefault();
    // Perform search logic here
    // For example, you can filter your data based on the searchQuery
    const filteredResults = [
      { id: 1, title: 'Item 1', description: 'This is the first item.' },
      { id: 2, title: 'Item 2', description: 'This is the second item.' },
      // Add more search results as needed
    ].filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  return (
    <>
      <div className='bg-main shadow-md sticky top-0 z-20 flex'>
        <div className="container mx-auto py-6 px-5 lg:grid gap-10 grid-cols-7 ">
          {/* Logo  */}
          <div className="col-span-1 lg:block hidden">
            <Link to='/'>
              <img src="/images/Avator.jpg" alt="Logo"
                className='w-full h-12 object-contain' />
            </Link>
          </div>
          {/* search */}
          <div className="col-span-3">
            <form className='w-[75%] text-sm bg-dry rounded flex-btn gap-4' onSubmit={handleSearch}>
              <button
                type='submit'
                className='bg-subMain w-12 flex-colo h-12 rounded text-white'>
                <BiSearch />
              </button>
              <input
                type="text"
                placeholder='Search a Movie here..'
                className='font-medium placeholder:text-border text-sm w-11/12 h-12 text-black rounded-sm outline-none bg-dry'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
          {/* Menus */}
          <div className="col-span-3 font-medium text-sm hidden xl:gap-5 gap-5 justify-between lg:flex xl:justify-end items-center ">
         {
          NavbarLinks.map((links,i)=>(
            <NavLink to={links.link} className={Hover} key={i}>
              {links.name}
            </NavLink>
          ))
         }
           <NavLink to='/favorite' className={'${Hover} relative'}>
             <MdNotifications className='w-6 h-6' />
             <div className="w-5 h-5 flex-col p-1 rounded-full text-sm bg-red-700 absolute -top-4 text-white -right-1 flex justify-center items-center">10</div>
          </NavLink>
          </div>
        </div>
      </div>
      {/* Display search results */}
     
    </>
  )
}

export default NavBar