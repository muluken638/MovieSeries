import React, { useState } from 'react';
import { BiSearch, BiMenu, BiLogOut } from 'react-icons/bi';
import { MdNotifications } from 'react-icons/md';
import { Link, NavLink } from 'react-router-dom';
import { NavbarLinks } from '../Contents/Links';

function NavBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const hover = 'hover:text-main transitions text-white hover:bg-subMain px-4 py-2 border border-border rounded-md ';
  const Hover = ({ isAcive }) => (isAcive ? 'text-subMain' : hover);

  const handleSearch = (e) => {
    e.preventDefault();
    // Perform search logic here
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <div className='grad shadow-md sticky top-0 z-20 flex'>
        <div className="container mx-auto py-6 px-5 flex items-center justify-between lg:grid gap-10 grid-cols-7">
          {/* Logo */}
          <div className="col-span-1">
            <Link to='/'>
              <img src="/images/Avator.jpg" alt="Logo" className='w-full h-12 object-contain' />
            </Link>
          </div>
          {/* search */}
          <div className="col-span-3 hidden lg:block">
            <form className='w-[75%] text-sm bg-dry rounded flex-btn gap-4' onSubmit={handleSearch}>
              <button type='submit' className='bg-subMain w-12 flex-colo h-12 rounded text-white'>
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
          <div className="col-span-3 font-medium text-sm hidden xl:gap-5 gap-5 justify-between lg:flex xl:justify-end items-center">
            {NavbarLinks.map((links, i) => (
              <NavLink to={links.link} className={Hover} key={i}>
                {links.name}
              </NavLink>
            ))}
            <NavLink to='/favorite' className={`${Hover} relative`}>
              <MdNotifications className='w-6 h-6' />
              <div className="w-5 h-5 flex-col p-1 rounded-full text-sm bg-red-700 absolute -top-4 text-white -right-1 flex justify-center items-center">10</div>
            </NavLink>
          </div>
          {/* Hamburger Menu */}
          <div className="lg:hidden">
            <button onClick={toggleDrawer} className="text-white text-3xl">
              <BiMenu />
            </button>
          </div>
        </div>
      </div>
      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-2/3 bodybg  transform ${drawerOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-30`}>
        <button onClick={toggleDrawer} className="text-white text-3xl p-4">
          &times;
        </button>
        <div className="flex flex-col p-8 space-y-6">
          {NavbarLinks.map((links, i) => (
            <NavLink
              to={links.link}
              className="text-white text-xl hover:bg-main border border-border transitions p-4 rounded-md"
              key={i}
              onClick={toggleDrawer}
            >
              {links.name}
            </NavLink>
          ))}

          <NavLink to='/logout' className="gap-4 flex text-2xl  hover:bg-main border border-border transitions p-4 rounded-md">
            <BiLogOut className='w-7 h-7' /> <h1>Logout</h1>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default NavBar;
