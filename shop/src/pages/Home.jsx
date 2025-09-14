import React from 'react'
import Header from "../components/Header.jsx"
import Category from "../components/Category.jsx"
import BestSeller from "../components/BestSeller.jsx"
import Video from "../components/Video.jsx"
import Footer from "../components/Footer.jsx"

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-black via-[#23211b] to-[#181818]">
      <Header/>
      <Category/>
      <BestSeller/>
      <Video/>
      <Footer/>
    </div>
  )
}

export default Home
