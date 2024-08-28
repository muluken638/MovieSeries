import React from 'react'
import Head from '../Components/Head'
import Layout from '../Layout/Layout'
import { Link } from 'react-router-dom'
import { MdEmail } from 'react-icons/md'
import { BsGithub, BsTelegram } from 'react-icons/bs'
import { BiMap, BiPhone } from 'react-icons/bi'

function Contact() {
  const ContactData =[
    {id:1,
      title:'Email',
      icon:MdEmail,
      Contact:'mulukenzeleke638@gmail.com'
    },{id:2,
      title:'Telegram',
      icon:BsTelegram,
      Contact:'@muluk1212'
      
    },{id:3,
      title:'Phone',
      icon:BiPhone,
      Contact:'+251-953-696-769'
    },{id:4,
      title:'GitHub',
      icon:BsGithub,
      Contact:'muluken638'
    },{id:5,
      title:'Location',
      icon:BiMap,
      Contact:'Addis Ababa ,Ethiopia'
    }
  ]
  return (
    <Layout>
    <div className="min-height-screen container mx-auto px-2 my-6">
      <Head title="Contact Us" />
      <div className="grid md:grid-cols-2 gap-6 lg:my-20 my-10 lg:grid-cols-3 xl:gap-8">
       {
        ContactData.map((items,index)=>(

        <div key={index} className="border border-border flex-colo p-10 bg-slate-600 rounded-lg items-center">
           <span className='flex-colo w-20 h-20 mb-4 rounded-full bg-main text-subMain text-2xl'><items.icon/></span>
           <h5 className='text-xl font-semibold mb-2'>{items.title}</h5>
           <p className='mb-0 text-sm text-text leading-7'>
            <a href={`mailto:${items.Contact}`} className='
            text-blue-700'>{items.Contact}</a>
           </p>
        </div>
        ))
       }
      </div>
    </div>
  </Layout>
  )
}

export default Contact