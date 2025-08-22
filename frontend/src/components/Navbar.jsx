import React from 'react'

const Navbar = () => {
  return (
    <div className="flex flex-row justify-between px-8 bg-black   md:justify-around md:px-0 items-center">

    {/* logo */}
    <div className="text-white py-4  flex flex-col"><span className='text-3xl font-bold'>Me & Guys</span><span className='  text-xs tracking-widest font-normal'>U N I S E X  S A L O O N</span></div>

{/* options */}
<div className="hidden md:flex flex-col gap-2">
    <div className='flex justify-end'>
        <div className='px-2 text-yellow-600 border-1 border-yellow-600 cursor-pointer hover:text-white'>Book Appointment</div>
    </div>
    <div className='flex flex-row gap-5 text-white cursor-pointer'>
        <p className="hover:text-yellow-600">HOME</p>
        <p className="hover:text-yellow-600">SERVICES</p>
        <p className="hover:text-yellow-600">E-SHOP</p>
        <p className="hover:text-yellow-600">OFFER</p>
        <p className="hover:text-yellow-600">ABOUT</p>
        <p className="hover:text-yellow-600">CONTACT</p>
    </div>
</div>
<div className='text-white cursor-pointer'>Signup/login</div>

    </div>
  )
}

export default Navbar
