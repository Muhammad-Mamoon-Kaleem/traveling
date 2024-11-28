import React from 'react'
import Header from '../components/Header'
import { assets } from '../assets/assets'
import Speciality from '../components/Speciality'
import Topplaces from '../components/Topplaces'

const Home = () => {
  return (
    <div><Header/>
    <Speciality/>
    <Topplaces/>
    </div>
   
  )
}

export default Home