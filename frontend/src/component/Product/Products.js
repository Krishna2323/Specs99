import React, { useEffect, Fragment, useState } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { clearError, getProduct } from "../../actions/productsAction";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import * as AiIcons from 'react-icons/ai';
import * as CgIcons from 'react-icons/cg';
import * as ImIcons from 'react-icons/im';


import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";

import AttachMoneyIcon from "@material-ui/icons/AttachMoney";


const categories = [
"All",
  "Sunglasses",
  "Spectacles",
  "Contact Lenses",
  "Blue-Cut Glasses",
];
const minPriceList=[
  0,
  1000,
  2000,
  3000,
  4000,
  5000,
  10000,
  15000,
  20000,
  25000
]
const maxPriceList=[
  0,
  1000,
  2000,
  3000,
  4000,
  5000,
  10000,
  15000,
  20000,
  25000
 
]
const maxRatingList=[
  0,
  1,2,3,4,5
]





const Products = ({ match, location }) => {
  const dispatch = useDispatch();


  const alert = useAlert();

  const [box, setBox] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(25000)
  const [category, setCategory] = useState("");

  const [rating, setRating] = useState(0);

  const {
    products,
    loading,
    error,
productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };


  let perPageProduct=12 ;

  let counts = filteredProductsCount;


const categoryHandler=(e)=>{
  if(e.target.value==="All"){
    setCategory("")
  }
  else{
    setCategory(e.target.value)
  }
}


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }  
    window.scrollTo(0, 0)




    dispatch(getProduct(perPageProduct,keyword, currentPage, minPrice,maxPrice ,category, rating));
  }, [dispatch,perPageProduct, keyword, currentPage, minPrice,maxPrice, category, rating, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Products - Specss99" />
          <div className="productall" onContextMenu="return true">
          <div className="filterHeading">
            <h1
              onClick={() => {
                setBox(!box);
              }}
            >
            <h2>Filter</h2>
              
              <CgIcons.CgArrowsExchangeAltV style={{color:"black"}} />
            </h1>

</div>
    <div className="div1">
          <h1 className="productsHeading">

{location.pathname === "/products"
  ? "Products"
  :keyword && filteredProductsCount === 0
  ? "No Product Found"
  :`Results For : ${keyword}` }
</h1>
          <div className="products">

          
            {products &&
              products
                .map((product) => (
                  <ProductCard key={product._id} products={product} />
                ))}
               
          </div> {resultPerPage < counts && (
            <div className="paginationBox">
              <Pagination
                shape="rounded"
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
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
          )}</div>

          <div className={box ? "filterBox active" : "filterbox" && window.innerWidth>=1000?"filterBox active":"filterbox"}>
          <h3         onClick={() => {
                setBox(!box);
              }}><ImIcons.ImCross
          /></h3>
       
            <form action="">
            
              <div>
                <AccountTreeIcon style={{color:"white"}} />
                <select onChange={(e) =>{categoryHandler(e)}}>
                  <option value="">Category - {category}</option>
                  {categories.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <AttachMoneyIcon style={{color:"white"}}/>
                <select onChange={(e) => setMinPrice(e.target.value)}>
                  <option value={minPrice}>Min Price - {minPrice} </option>
                  {minPriceList.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
                </select>
                <AttachMoneyIcon style={{color:"white"}} />

                <select onChange={(e) => setMaxPrice(e.target.value)}>
                  <option value={maxPrice}>Max Price - {maxPrice}</option>
                  {maxPriceList.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <AiIcons.AiFillStar style={{color:"white"}}/>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value={rating}>Min Rating - {rating}</option>
                  {maxRatingList.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
                </select>
              </div>

         

            </form>
          </div></div>

        
         
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
