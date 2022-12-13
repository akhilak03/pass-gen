import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaSnapchat } from "react-icons/fa";
import "./Footer.css";
function Footer() {
  return (
    <>
    <footer className="bg-dark text-center text-sm-start">
    <div className="container d-flex justify-content-center py-3">
      <button type="button" className="btn btn-primary btn-lg btn-floating mx-2" >
        <FaFacebook/>
      </button>
      <button type="button" className="btn btn-warning btn-lg btn-floating mx-2"> 
        <FaSnapchat/>
      </button>
      <button type="button" className="btn btn-danger btn-lg btn-floating mx-2" >
        <FaInstagram/>
      </button>
      <button type="button" className="btn btn-info btn-lg btn-floating mx-2">
        <FaTwitter/>
      </button>
    </div>
    <div className="text-center text-white p-2">
      © 2022 Copyright:
      <a className="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
    </div>
  </footer>
    </>
  )
}

export default Footer