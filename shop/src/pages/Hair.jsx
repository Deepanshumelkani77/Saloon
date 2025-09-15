import React from 'react'
import {useState,useEffect} from "react"

const Hair = () => {


    useEffect(()=>{

         const response =  axios.get('http://localhost:1000/product/hair');
    })

    const [subCategory,setSubCategoory]=useState("all");

  return (
    <div>
      
    </div>
  )
}

export default Hair
