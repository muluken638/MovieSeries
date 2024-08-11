import React from 'react'
import Layout from '../../../Layout/Layout'
import { NavLink } from 'react-router-dom'
import { SidebarLinks } from '../../../Contents/Links'

function SideBar({ children }) {

    const active = 'bg-white text-menutext my-2 text-dark ';
    const hover = 'hover:text-white hover:bg-subMain hover:scale-95';
    const inActive = 'rounded font-medium text-sm transitions flex gap-3 items-center p-4';
    const Hover = ({ isActive }) =>
        isActive ? `${active} ${inActive}` : `${inActive} ${hover}`;


    return (
        <Layout>
            <div className="min-h-screen container mx-auto px-2">
                <div className="xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6">
                    <div className="col-span-2  sticky h-full bg-main border border-border p-6 rounded-md xl:mb-0 mb-5">
                        {
                            SidebarLinks.map((link, index) => (
                                <NavLink to={link.link} key={index} className={Hover}>
                                    <link.icon /><p>{link.name}</p>
                                </NavLink>
                            ))
                        }
                    </div>
                    <div 
                    // data-aos='fade-up'
                    // data-aos-duration='1000'
                    // data-aos-delay='10'
                    // data-aos-offset='200'
                    className="col-span-6 bg-main border border-border rounded-md p-6 ">
                        {children}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SideBar