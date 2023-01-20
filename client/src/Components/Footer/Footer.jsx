import React from 'react'

import Logo from "../../img/logo.png"
import "./Footer.css"

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="" />
      <span>Created by <span className='tagName'>Victor Mesquita</span></span>
    </footer>
  )
}

export default Footer