import React from 'react'
import "./detailsFooter.css"
import {Link} from "react-router-dom"

const detailsFooter = () => {
    return (
        <div className="detailsFooter">
      
            <span>Created By : Krishna Gupta</span>
            <div>
                <Link  to="#"><i class="fab fa-linkedin-in"></i></Link>
                <Link  to="#"><i  class="fab fa-github"></i></Link>
                <Link to="#"><i  class="fab fa-facebook"></i></Link>


            </div>
    
     
            
        </div>
    )
}

export default detailsFooter
