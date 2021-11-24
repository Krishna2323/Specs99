import React, { useEffect, Fragment, useState } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { clearError, getProduct } from "../../actions/productsAction";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

const Products = ({ match,location }) => {
  const { products, loading, resultPerPage,error,filteredProductsCount } = useSelector(
    (state) => state.products
  );

  const alert = useAlert();


  const categories = [
    "Sunglasses",
    "Spectacles",
    "Contact Lenses",
    "Blue-Cut Glasses",
    

  ]

const [category, setCategory] = useState('')
const [rating, setRating] = useState(0)

  let counts=filteredProductsCount

  const [currentPage, setCurrentPage] = useState(1);
  const [Price, setPrice] = useState([0,25000])


  const priceHandler=(event,newPrice)=>{
      setPrice(newPrice)
  }

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const [keyword, setKeyword] = useState("")
  


  const dispatch = useDispatch();

  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearError())
    }

    if(match.params.keyword){
      setKeyword(match.params.keyword);

    }

    if(location.pathname === "/products"){
      setKeyword("")
    }
    
    dispatch(getProduct(keyword, currentPage,Price,category,rating));
  }, [dispatch, keyword, currentPage,error,Price,category,rating,alert,match.params.keyword,location.pathname]);


  

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
        <MetaData title="Products - Specss99"/>
          <h1 className="productsHeading">{location.pathname === "/products"?"Products":keyword}</h1>
          <div className="products">
            {products && products.filter((product)=>product.displayType !== "Trending").map((product) => (
                <ProductCard key={product._id} products={product} />
              ))}
          </div>

          <div className="filterBox">
          <Typography>Price</Typography>
            <Slider value={Price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={25000}
                    ></Slider>

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category)=>(
                <li className="category-link" key={category} onClick={()=>setCategory(category)}>
                  {category}
                </li>

              ))}
            </ul>

            <fieldset>
              <Typography component="legend">   Ratings Above           </Typography>

              <Slider
                value={rating}
                onChange={(e,newRating)=>{
                  setRating(newRating)
                }}
                valueLabelDisplay="auto"

                aria-labelledby="continuous-slider"
                min={0}
                max={5}
              />
         

            </fieldset>
          </div>

          {resultPerPage < counts  && (
            <div className="paginationBox">
              <Pagination
                shape="rounded"
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={counts}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
