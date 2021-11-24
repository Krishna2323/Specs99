import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import "./LinkBanner.css"



const LinkBanner = ({name,image}) => {
    return (
        <Link to={`/products/${name}`} className="linkBannerDiv1">
       <Fragment>
         

    <img className="LinkBannerImage" src={image} alt="Top Categories" />
     <span>{name}</span>


       </Fragment>
                  </Link>

    )
}

export default LinkBanner
