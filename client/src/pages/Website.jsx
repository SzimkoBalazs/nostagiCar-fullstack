import React from 'react'
import Companies from "../components/Companies/Companies";
import Contact from "../components/Contact/Contact";
import GetStarted from "../components/GetStarted/GetStarted";
import Hero from "../components/Hero/Hero";
import Vehicles from "../components/Vehicles/Vehicles";
import Value from "../components/Value/Value";


const Website = () => {
  return (
    <div className="App">
    <div>
      <div className="white-gradient" />
      
      <Hero />
    </div>
    <Companies />
    <Vehicles/>
    <Value/>
    <Contact/>
    <GetStarted/>
    
  </div>
  )
}

export default Website