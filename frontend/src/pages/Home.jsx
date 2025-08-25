import React from 'react'
import Header from '../components/Header.jsx';
import Service from '../components/Service.jsx';
import VideoSlider from '../components/VideoSlider.jsx';

const Home = () => {
  return (
    <div className=" w-full">
      <Header/>
      <Service/>
      <VideoSlider/>
    </div>
  )
}



export default Home
