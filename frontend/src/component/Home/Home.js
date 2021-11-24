import React, { Fragment, useEffect } from "react";
import ProductCard from "./ProductCard";
import { clearError, getProduct } from "../../actions/productsAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import Carousel from "react-material-ui-carousel";
import "./Home.css";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import banner1 from "../Images/ra1.jpg";
import banner2 from "../Images/ra2.jpg";
import banner3 from "../Images/ra3.jpg";

import LinkBanner from "./LinkBanner";
const Home = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Home - Specs99" />

          <div className="mainCarousel">
            <Carousel>
              <img className="HomeBanner" src={banner3} alt="Sunglass" />
              <img className="HomeBanner" src={banner2} alt="Sunglass" />
              <img className="HomeBanner" src={banner1} alt="Sunglass" />

            </Carousel>
          </div>
          <h2 className="homeHeadingTopCollection">Top Brands</h2>

          <div className="linkBannerDiv">
            {products &&
              products
                .filter((products) => products.displayType==="Trending"  )
                .map((products) => (
                  <LinkBanner
                    key={products._id}
                    name={products.name}
                    image={products.image[0].url}
                  />
                ))}
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products
                .filter((products) => products.displayType.includes("Featured"))
                .map((product) => (
                  <ProductCard key={product._id} products={product} />
                ))}
          </div>


          <h2 className="homeHeading">New Arrivals</h2>

<div className="container" id="container">
  {products &&
    products
      .filter((products) => products.displayType.includes("New Arrival"))
      .map((product) => (
        <ProductCard key={product._id} products={product} />
      ))}
</div>



        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
