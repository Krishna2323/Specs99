import React, { Fragment ,useState} from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { SearchOutlined} from "@material-ui/icons";


import "./Header.css"


const Header = ({screen}) => {

  const [keyword, setkeyword] = useState("")

  const history=useHistory();


  const searchSubmitHandler=(e)=>{
    e.preventDefault()
    if (keyword.trim()){
      history.push(`/products/${keyword}`)
    }else{
      history.push("/products")
    }
  }

  const {IsAuthenticated} = useSelector(state => state.user)



  const toLogin=()=>{
history.push("/login")
  }


    return (<Fragment>
        <nav className="navbarTop">

  <div className="navbarHeading">
  <Link className="navbarHeading" to="/">
<h1 className="navbarHeading">Specs99</h1>    </Link>  </div>

<li className="navlap">
<Link to="/">Home</Link>

<Link to="/products">All Specs</Link>

  <Link to="/category/Spectacles">Spectacles</Link>
  <Link to="/category/Sunglasses">Sunglasses</Link>
  <Link to="/category/Contact%20Lenses">Contact-Lense</Link>

  


</li>





    <div className="searchBar">
    <form onSubmit={searchSubmitHandler}  >
        <input type="text" onChange={(e)=>setkeyword(e.target.value)} placeholder="Find Specs"/>
        <button onClick={searchSubmitHandler} className="searchButton" type="button"><SearchOutlined fontSize={window.innerWidth > 600 ? "large":"medium"}  /></button>
        {IsAuthenticated===false &&
          <button className="loginButton"  onClick={toLogin} type="button">Login/Register</button>}

      </form>
      </div>




</nav>

<li className="navmob">
<Link to="/">Home</Link>

<Link to="/products">All Specs</Link>

  <Link to="/category/Spectacles">Spectacles</Link>
  <Link to="/category/Sunglasses">Sunglasses</Link>
  <Link to="/category/Contact%20Lenses">Contact-Lense</Link>


  


</li>
        </Fragment>
    )
}

export default Header
