const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please Enter Product Name"] },
  description: {
    type: String,
    required: [true, "Please Enter Product Description"],
  },
  displayType: { type: String, default: "All" },
  image: [
    {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],


  createdAt: { type: Date, default: Date.now },
});

// module.exports = mongoose.model("Product", productSchema);

const BannerSc = mongoose.model("Banner", BannerSchema);
BannerSc.createIndexes();
module.exports = BannerSc;
