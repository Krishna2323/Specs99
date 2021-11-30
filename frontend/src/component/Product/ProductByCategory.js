import React, { useEffect, Fragment, useState } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { clearError, getProduct } from "../../actions/productsAction";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import * as FcIcons from "react-icons/fc";
import * as MdIcons  from 'react-icons/md';
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import * as AiIcons from 'react-icons/ai';
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

const ProductByCategory = ({ match,location }) => {

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

  

  const dispatch = useDispatch();

  const alert = useAlert();

  const [box, setBox] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(25000)
const category=match.params.keyword;
  const [rating, setRating] = useState(0);

  const {
    products,
    loading,
    error,

    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const keyword = ""

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  // const priceHandler = (event, newPrice) => {
  //   setPrice(newPrice);
  // };
  let counts = filteredProductsCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    window.scrollTo(0, 0)


    dispatch(getProduct(keyword, currentPage, minPrice,maxPrice ,category, rating));
  }, [dispatch, keyword, currentPage, minPrice,maxPrice, category, rating, alert, error]);

  

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
        <MetaData title="Products - Specss99"/>
          <h1 className="productsHeading"  >{filteredProductsCount===0?"No Product Found":match.params.keyword}</h1>
          <div className="products">
            {products && products.filter((product)=>product.displayType !== "Trending" && product.mrp >25).map((product) => (
            
                <ProductCard key={product._id} products={product} />
              ))}
          </div>
          <div className={box ? "filterBox active" : "filterbox"}>
          <h1  onClick={() => {
                setBox(!box);
              }}><MdIcons.MdOutlineClose/></h1>
            <form action="">
          
              <div>
                <AttachMoneyIcon />
                <select onChange={(e) => setMinPrice(e.target.value)}>
                  <option value={minPrice}>Min Price</option>
                  {minPriceList.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
                </select>
                <AttachMoneyIcon />

                <select onChange={(e) => setMaxPrice(e.target.value)}>
                  <option value={maxPrice}>Max Price</option>
                  {maxPriceList.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <AiIcons.AiFillStar />
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value={rating}>Min Rating</option>
                  {maxRatingList.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
                </select>
              </div>

         

            </form>
          </div>

          <div className="filterHeading">
            <h1
              onClick={() => {
                setBox(!box);
              }}
            >
              
              <FcIcons.FcFilledFilter />
            </h1>
          </div>




          {resultPerPage < counts  && (
            <div className="paginationBox">
              <Pagination
                shape="rounded"
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={filteredProductsCount}
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

export default ProductByCategory;
