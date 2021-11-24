import React from 'react'
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component"


const ProductCard = ({products}) => {
  const options = {
    value: products.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const off=Math.round((products.mrp-products.price)/products.mrp*100);
  return (
    <Link className="productCard" to={`/product/${products._id}`}>
      <img src={products.image[0].url} alt={products.name} />
      <h6>{off}%Off</h6>
      <span>{products.name}</span>
      <div>
        <ReactStars {...options} />{" "}
        <span className="productCardSpan">
          {" "}
          ({products.numOfReview} Reviews)
        </span>
      </div>
      <div className="priceTags">
      <h4>{`₹${products.price}`}</h4>
      <h5 className="mrpSpan">{`₹${products.mrp}`}</h5>

      
      </div>

    </Link>
    )
}

export default ProductCard
