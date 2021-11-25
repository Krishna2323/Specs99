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


const categories = [
  "Sunglasses",
  "Spectacles",
  "Contact Lenses",
  "Blue-Cut Glasses",
  

]

const Products = ({ match,location }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [Price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");

  const [rating, setRating] = useState(0);

  const {
    products,
    loading,
    error,
    
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  let counts = filteredProductsCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    dispatch(getProduct(keyword, currentPage, Price, category, rating));
  }, [dispatch, keyword, currentPage, Price, category, rating, alert, error]);


  

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
        <MetaData title="Products - Specss99"/>
          <h1 className="productsHeading">{location.pathname === "/products"?"Products":keyword}</h1>
          <div className="products">
            {products && products.filter((product)=>product.displayType === "New Arrival" || product.displayType === "Featured" ||  product.displayType === "Most Selling" || product.displayType === "Product" ||  product.displayType === "99").map((product) => (
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
