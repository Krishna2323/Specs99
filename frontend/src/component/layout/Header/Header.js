import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@material-ui/icons";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import './Header.css';
import { IconContext } from 'react-icons';

import "./Header.css";

const Header = ({ screen }) => {
  const [keyword, setkeyword] = useState("");

  const history = useHistory();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };

  const { IsAuthenticated } = useSelector((state) => state.user);

  const toLogin = () => {
    history.push("/login");
  };


  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const bothFunction=(e)=>{
    searchSubmitHandler(e);
  }

 

  return (
    <Fragment>
    
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbarmob'>
      
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars  onClick={showSidebar} />
          </Link>
          <div className="navbarHeading">
          <Link className="navbarHeading" to="/">
            <h1 className="navbarHeading">Specs99</h1>{" "}
          </Link>{" "}
        </div>
        <form className="searchInput1" onSubmit={searchSubmitHandler}>
            <input 
              type="text"
              onChange={(e) => setkeyword(e.target.value)}
              placeholder="Find Specs"
            />
            <button
              onClick={bothFunction}
              className="searchButton"
              type="button"
            >
              <SearchOutlined
                fontSize={window.innerWidth > 600 ? "large" : "large"}
              />
            </button>
       
          </form>
          {IsAuthenticated===false &&
          <button className="loginButton"  onClick={toLogin} type="button">Login/Register</button>}
        </div>
     
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' >
            <li className='navbar-toggle'>
              <Link to='#' onClick={(e)=>{showSidebar(e)}} className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <li>
            <form className="searchInput2" onSubmit={searchSubmitHandler}>
            <input className="searchInput"
              type="text"
              onChange={(e) => setkeyword(e.target.value)}
              placeholder="Find Specs"
            />
            <button
              onClick={bothFunction}
              className="searchButton"
              type="button"
            >
              <SearchOutlined
                fontSize={window.innerWidth > 600 ? "large" : "medium"}
              />
            </button>
       
          </form>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li onClick={showSidebar} key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>  {item.title}</span>
                  </Link>
                </li>
              );
            })}
           
          </ul>
       
        </nav>
 
      </IconContext.Provider>
 

    
    </Fragment>
  );
};

export default Header;
