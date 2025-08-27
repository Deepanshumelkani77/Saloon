import React from 'react'
import {assets} from '../assets/assets.js'

const Gents = () => {
  return (
    <div className="w-full">

<div className="w-full h-[20vh] flex justify-center items-center"><h1 >Services for Ladies</h1></div>

<div className="w-full "><img src={assets.ladies} alt="" /></div>

<div className="w-full flex flex-col md:flex-row justify-around  gap-10 ">

<div className="flex flex-col ">
    <p>Hair Cut & Finish</p>
   
        <li>Cut and Hair Care</li>
        <li>Shampoo & Conditioning</li>
        <li>Head Massage</li>
        <li>Beard Styling</li>
        <li>Hair/Beard Colouring</li>
       

</div>
<div className="flex flex-col ">
    <p>Hair Colour</p>
    <li>Hair Colour
(Ammonia & Ammonia Free)</li>
    <li>Hi - Lites</li>
    <li>Beard Colour</li>
    
</div>
<div className="flex flex-col ">
    <p>Hair Texture</p>
    <li>Straightening</li>
    <li>Smoothening</li>
    <li>Rebonding</li>
    <li>Perming</li>
</div>


</div>



<div className="w-full flex flex-col md:flex-row justify-around  gap-10 ">

<div  className="flex flex-col ">
    <p>Hair Treatments</p>
    <li>Hair Spa</li>
    <li>Advanced Moisturising</li>
    <li>Scalp Treatments</li>
    <li>Colour Protection</li>
   
</div>
<div  className="flex flex-col ">
    <p>Skin Care</p>
    <li>Clean Ups</li>
    <li>Facials</li>
    <li>Organic Treatments</li>
    <li>Manicure</li>
    <li>Pedicure</li>
</div>
<div  className="flex flex-col ">
    <p>Beard Grooming</p>
    <li>Beard Trim</li>
    <li>Beard Colour</li>
    <li>Beard Styling</li>
    <li>Shave</li>
    <li>Luxury Shave & Beard Spa</li>
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