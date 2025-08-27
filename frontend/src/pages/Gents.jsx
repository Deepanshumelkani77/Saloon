import React from 'react'
import {assets} from '../assets/assets.js'

const Gents = () => {
  return (
    <div className="w-full">

<div className="w-full h-[20vh] flex justify-center items-center"><h1 >Services for Ladies</h1></div>

<div className="w-full "><img src={assets.ladies} alt="" /></div>

<div className="w-full flex flex-col md:flex-row justify-around  gap-10 ">

<div className="flex flex-col ">
    <p>Hair Styling</p>
   
        <li>Hair Cut</li>
        <li>Ironing</li>
        <li>Global Colouring</li>
        <li>Blow Dry</li>
        <li>Root Touch Up</li>
        <li>Shampoo & Conditioning</li>
        <li>Head Massage</li>
        <li>Roller Setting</li>
        <li>Oiling</li>
  
</div>
<div className="flex flex-col ">
    <p>Make Up</p>
    <li>Party Make Up</li>
    <li>Engagement Make Up</li>
    <li>Bridal & Reception Make Up</li>
    <li>Base Make Up</li>
    <li>Eye Make Up</li>
</div>
<div className="flex flex-col ">
    <p>Hair Treatments</p>
    <li>Volumizing</li>
    <li>Spa Treatments</li>
    <li>Advanced Hair Moisturising</li>
    <li>Scalp Treatments</li>
</div>
<div className="flex flex-col ">
    <p>Hair Texture</p>
    <li>Rebonding</li>
    <li>Perming</li>
    <li>Keratin</li>
    <li>Colour Protection</li>
    <li>Smoothening</li>
</div>

</div>



<div className="w-full flex flex-col md:flex-row justify-around  gap-10 ">

<div  className="flex flex-col ">
    <p>Facials & Rituals</p>
    <li>Bleach</li>
    <li>Luxury Facials/Rituals</li>
    <li>Clean Ups</li>
    <li>Body Polishing/Rejuvenation</li>
    <li>Threading</li>
</div>
<div  className="flex flex-col ">
    <p>Hand & Feet</p>
    <li>Manicure</li>
    <li>Spa Pedicure</li>
    <li>Pedicure</li>
    <li>Waxing</li>
    <li>Spa Manicure</li>
</div>
<div  className="flex flex-col ">
    <p>Nail Care</p>
    <li>Nail Paint</li>
    <li>Nail Art</li>
    <li>Nail Filling</li>
</div>

</div>
      

<div className="flex flex-col justify-center items-center gap-5">
    <h1>Let's not wait for the "Perfect Look"</h1>
    <h1>Book An Appointment Now!</h1>
    <button>Book Appointment</button>
</div>

    </div>
  )
}

export default Gents