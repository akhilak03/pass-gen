import React from 'react'
import './Landing.css'
import { BsBoxArrowInRight } from "react-icons/bs";
import { useEffect,useRef } from 'react';
import Title from "../components/Shared/Title/title"
function Landing() {
    const messagesEndRef = useRef(null)
  
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  
    useEffect(() => {
      scrollToBottom()
    }, []);
  
  return (
    <>
      <div className="showcase">
        <Title 
          title={"#EventsNow."} 
          description={
            "Jump On to the Event \n "
          }
          description2 ={
            "Get Your Passes Now!!!"
          }/>
          
        <a className='as mt-4' href="/Login">Login/SignUp<BsBoxArrowInRight/></a>

      </div>
    </>
  )
}

export default Landing