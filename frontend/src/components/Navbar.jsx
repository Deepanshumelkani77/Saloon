import React from 'react'

const Navbar = () => {
  return (
    <div className=" bg-black  flex flex-row justify-around items-center">
    
    
<div className="text-white p-2  flex flex-col"><span className='text-3xl font-bold'>Me & Guys</span><span className='  text-xs tracking-widest font-normal'>U N I S E X  S A L O O N</span></div>

<div className="flex flex-col gap-2">
    <div class='text-yellow-600 text-end border-1 border-yellow-600'>Book Appointment</div>
    <div className='flex flex-row gap-5 text-white'>
        <p>HOME</p>
        <p>SERVICES</p>
        <p>E-SHOP</p>
        <p>OFFER</p>
        <p>ABOUT</p>
        <p>CONTACT</p>
    </div>
</div>

<div className='text-white'>profile<img></img></div>

    </div>
  )
}

export default Navbar
