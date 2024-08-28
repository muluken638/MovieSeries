import React, { useState } from 'react';
import Layout from '../../../Layout/Layout';
import { NavLink } from 'react-router-dom';
import { SidebarLinks } from '../../../Contents/Links';
import { FaBars, FaTimes } from 'react-icons/fa';

function SideBar({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const active = 'bg-white text-menutext my-2 text-dark ';
  const hover = 'hover:text-white hover:bg-subMain hover:scale-95';
  const inActive = 'rounded font-medium text-sm transitions flex gap-3 items-center p-4';
  const Hover = ({ isActive }) =>
    isActive ? `${active} ${inActive}` : `${inActive} ${hover}`;

  return (
    <Layout>
      <div className="min-h-screen container mx-auto px-2 relative">
        <div
          className={`absolute top-0 left-0 w-full h-screen bg-black bg-opacity-50 backdrop-blur-sm transition-all duration-300 ${
            isSidebarOpen ? 'visible opacity-100' : 'invisible opacity-0'
          }`}
          onClick={() => setIsSidebarOpen(false)}
        />
        <div className="flex gap-10 items-start md:py-12 py-6">
          <div
            className={`w-64 bg-main border border-border p-6 rounded-md mb-5 transition-all duration-300 shadow-xl ${
              isSidebarOpen || window.innerWidth >= 1280
                ? 'block translate-x-0'
                : 'hidden -translate-x-full'
            }`}
          >
            {SidebarLinks.map((link, index) => (
              <NavLink to={link.link} key={index} className={Hover}>
                <link.icon />
                <p>{link.name}</p>
              </NavLink>
            ))}
          </div>
          <div className="flex-1 bg-main border border-border rounded-md p-6">
            <div className="flex justify-between items-center mb-4 lg:hidden block">
              <button
                className="text-2xl text-menutext"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SideBar;