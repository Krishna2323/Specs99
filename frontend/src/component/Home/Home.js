import React, { Fragment, useEffect } from "react";
import ProductCard from "./ProductCard";
import { clearError, getProduct } from "../../actions/productsAction";
import {  getBanners } from "../../actions/bannerAction";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { Carousel } from "react-bootstrap";
import "./Home.css";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

import LinkBanner from "./LinkBanner";
import { Link } from "react-router-dom";
const Home = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  // eslint-disable-next-line
  const { banners, loading:bannerLoading, error:bannerError } = useSelector((state) => state.banners);

const perPageProduct=100;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getProduct(perPageProduct));
    dispatch(getBanners())
    window.scrollTo(0, 0)

  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
        <div className="all">
          <MetaData title="Home - Specs99" />

          <div className="mainCarousel">
            <Carousel>

            {banners &&
              banners
                .filter((product) => product.displayType==="Banner")
                .map((product) => (
                  <Carousel.Item interval={3000} >

                  <Link to={`/products/${product.name}`}>

                  <img className="HomeBanner" key={product._id} src={product.image[0].url} alt="Sunglass" /></Link>
                  </Carousel.Item >

                ))}

             
        

            </Carousel>
          </div>

          <div className="div1">
          <h2 className="homeHeadingTopCollection">Top Brands</h2>
          <div className="linkBannerDiv">

            {banners &&
              banners
                .filter((products) => products.displayType==="Top Brands"  )
                .map((products) => (
                  <LinkBanner
                    key={products._id}
                    name={products.name}
                    image={products.image[0].url}
                  />
                ))}
          </div>
          </div>


          <div className="div2">


          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products
                .filter((products) => products.displayType.includes("Featured"))
                .map((product) => (
                  <ProductCard key={product._id} products={product} />
                ))}
          </div></div>


<div className="div3">
          <h2 className="homeHeading">New Arrivals</h2>

<div className="container" id="container">
  {products &&
    products
      .filter((products) => products.displayType.includes("New Arrival"))
      .map((product) => (
        <ProductCard key={product._id} products={product} />
      ))}
</div></div>

<div className="div4">
<h2 className="homeHeading">Trending Products</h2>


<div className="container" id="container">
  {products &&
    products
      .filter((products) => products.displayType.includes("New Arrival"))
      .map((product) => (
        <ProductCard key={product._id} products={product} />
      ))}

</div></div></div>

        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
