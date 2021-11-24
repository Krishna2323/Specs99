import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Logo from "../../Images/logo2.jpeg"
import "./Footer.css"


const Footer = () => {
    return (
    <Fragment>
    <footer>
      
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <div className="icons">
        <i class="fab fa-google-play" ></i>
        <i class="fab fa-apple"></i> 
        <i class="fas fa-thumbs-up"></i></div>     </div>

      <div className="midFooter">
      <img src={Logo} alt="Appstore" />
        <p>High Quality is our first priority</p>

        <p>Copyrights 2021 &copy; Specs 99</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <div className="icons2">
       <Link><i class="fab fa-facebook "></i></Link>
       <Link><i class="fab fa-instagram "></i></Link>
       <Link><i class="fab fa-twitter "></i></Link></div>
      </div>
      </footer>

    </Fragment>
    )
}

export default Footer
