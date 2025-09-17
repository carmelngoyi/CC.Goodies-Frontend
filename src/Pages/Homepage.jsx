import React from 'react'
import Home from '../Components/Home/Home.jsx'
import Navbar from "../Components/Navbar/Navbar";

const Homepage = () => {
  return (
    <div>  
              {/*  have files for all the sections in your home page  */}
      <Navbar />
       <Home/>
       {/* <Navbar/> */}
</div>

  )

}

export default Homepage

