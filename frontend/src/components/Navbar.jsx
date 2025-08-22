import React from 'react'

const Navbar = () => {
  return (
    <div className=" bg-black  flex flex-row justify-around items-center">
    
    
<div className="text-white p-2 gap-2 flex flex-col"><span>Me & Guys</span><span>SALOON</span></div>

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

<div className='text-white'>profile</div>

    </div>
  )
}

export default Navbar
