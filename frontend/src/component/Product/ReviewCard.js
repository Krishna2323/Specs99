import React from "react";
import ReactStars from "react-rating-stars-component"
// import { useSelector } from "react-redux";
import logo from "../Images/logo.png"





const ReviewCard = ({ review }) => {

  // const { user } = useSelector((state) => state.user);


  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="reviewCard">
      <img src={logo} alt="User" />
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;