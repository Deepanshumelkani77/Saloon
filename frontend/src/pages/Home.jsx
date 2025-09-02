import React from 'react'
import Header from '../components/Header.jsx';
import Service from '../components/Service.jsx';
import VideoSlider from '../components/VideoSlider.jsx';
import Partner from '../components/partner.jsx';
import GoogleMap from '../components/GoogleMap.jsx';

const Home = () => {
  return (
    <div className=" w-full">
      <Header/>
      <Service/>
      <VideoSlider/>
      <Partner/>
      <GoogleMap/>
      
    </div>
  )
}



export default Home
