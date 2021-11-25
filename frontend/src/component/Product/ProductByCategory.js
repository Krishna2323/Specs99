import React, { useEffect, Fragment, useState } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { clearError, getProduct } from "../../actions/productsAction";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";

import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

const ProductByCategory = ({ match,location }) => {

  

  const { products, loading, resultPerPage,error,filteredProductsCount } = useSelector(
    (state) => state.products
  );





  const alert = useAlert();




const [category, setCategory] = useState("")
const rating=0;
const keyword=''
  const counts=filteredProductsCount;


  const pppp =products.filter((product)=>product.displayType !== "Trending").lenght



  const [currentPage, setCurrentPage] = useState(1);
  const [Price, setPrice] = useState([0,25000])



  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
    setPrice(Price)
  };


  const dispatch = useDispatch();



  
  
  







useEffect(() => {
  if(error){
    alert.error(error)
    dispatch(clearError())
  }

    setCategory(match.params.keyword)

  
  dispatch(getProduct(keyword, currentPage,Price,category,rating));
}, [dispatch, keyword, currentPage,error,Price,category,rating,alert,location,match.params.keyword]);

  

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
        <MetaData title="Products - Specss99"/>
          <h1 className="productsHeadingC"  >{match.params.keyword}</h1>
          <div className="productsC">
            {products && products.filter((product)=>product.displayType !== "Trending" && product.mrp >25).map((product) => (
            
                <ProductCard key={product._id} products={product} />
              ))}
          </div>



          {pppp < counts  && (
            <div className="paginationBox">
              <Pagination
                shape="rounded"
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={pppp}
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
