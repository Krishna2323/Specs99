const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please Enter Product Name"] },
  description: {
    type: String,
    required: [true, "Please Enter Product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter Product Description"],
    maxlength: [8, "Price Cannot Exceed More Than 6 Charecters"],
  },
  ratings: { type: String, default: 0 },
  image: [
    {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  category: { type: String, required: [true, "Please Enter Product Category"] },
  mrp: { type:Number, required: [true, "Please Enter Product MRP"]},
  size:{type:String,required: [true, "Please Enter Product Size"]},
  stock: {
    type: Number,
    required: [true, "Please Enter Product Stock"],
    maxlength: [4, "Stock Cannot Exceed More Tha 4 Characters"],
    default: 1,
  },
  numOfReview: { type: Number, default: 0 },
  displayType:{type:String,required:[true,"Please Enter Display Type"]},
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
    },
  ],

  createdAt: { type: Date, default: Date.now },
});

// module.exports = mongoose.model("Product", productSchema);

const ProductSc = mongoose.model("Product", productSchema);
ProductSc.createIndexes();
module.exports = ProductSc;
