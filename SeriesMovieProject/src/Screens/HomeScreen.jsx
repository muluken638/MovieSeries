import React from 'react'
import Layout from '../Layout/Layout'
import Banner from '../Components/Banner'
import Promotios from '../Components/Promotios'
import PopularMovies from '../Components/PopularMovies'
import TopRelated from '../Components/TopRelated'

function HomeScreen() {
  return (
    <Layout>
      <div className='container mx-auto min-h-screen px-2 mb-6'>
        <Banner/>
        <PopularMovies/>
        <Promotios/>
        <TopRelated/>
      </div>
    </Layout>
  )
}

export default HomeScreen