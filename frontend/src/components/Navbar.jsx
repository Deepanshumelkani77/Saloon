import React from 'react'
import {useState} from 'react'

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [user,setUser]=useState(true);

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


{/* login/signup */}
<div className="hidden md:block">
  {
    user?<div className="text-white">profile icon</div>:<div><div className='hidden md:flex text-white cursor-pointer'>Signup/login</div>
</div>
  }
</div>

<div className="md:hidden flex flex-row gap-5">
  {user?<div className="text-white">profile icon</div>:<></>}
<button onClick={() => setIsOpen(true)} className=" text-white cursor-pointer md:hidden ">menubar</button>
</div>



{/*  sidebar  */}
<div className={`p-1 fixed top-0 left-0 w-3/4 h-full bg-black text-white z-50 ${isOpen ? 'block' : 'hidden'}`}>

<div className="flex flex-row justify-around">
  <div className=" mt-5 text-white flex flex-col gap-2 items-center"><span className="text-3xl font-bold ">Me & Guys</span><span className="text-xs tracking-widest font-normal">UNISEX SALOON</span></div>
<button onClick={()=>setIsOpen(false)}>X</button>
</div>


<div className="mt-5 text-white flex flex-col gap-2 items-center justify-between">
  <p>HOME</p>
  <p>SERVICES</p>
  <p>E-SHOP</p>
  <p>OFFER</p>
  <p>ABOUT</p>
  <p>CONTACT</p>
</div>

<div className="text-center py-2 mt-5 text-yellow-600 border border-1 border-yellow-600 ">Book Appointment</div>

<div className="flex justify-center"><button className="mt-5  texxt-white">signup/Login</button></div>

</div>



    </div>
  )
}

export default Navbar
