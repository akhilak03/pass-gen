import React from 'react'
import logo from '../images/logo.svg';
import logo1 from '../images/logo1.svg';
import './Landing.css'
import { BsBoxArrowInRight } from "react-icons/bs";
function Landing() {
  return (
    <>
      <div className="showcase">
        <h1>Jump On to the Event</h1>
        <p>Get Your Passes Now!!!</p>
        <a className='as ' href="/Login">Login/SignUp<BsBoxArrowInRight/></a>

      </div>
    </>
  )
}

export default Landing