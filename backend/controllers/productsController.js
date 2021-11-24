const Product = require("../modals/productModal");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErr=require("../middleware/catchAsyncErr");
const cloudinary = require("cloudinary")

const ApiFeatures = require("../utils/apiFeatures");

exports.createProduct = catchAsyncErr( async (req, res, next) => {

  let image = [];

  if (typeof req.body.image === "string") {
    image.push(req.body.image);
  } else {
    image = req.body.image;
  }

  const imagesLinks = [];

  for (let i = 0; i < image.length; i++) {
    const result = await cloudinary.v2.uploader.upload(image[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.image = imagesLinks;

  req.body.user =req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

exports.getAllProducts = async (req, res,next) => {


  

  const resultPerPage=20
  const productsCount=await Product.countDocuments();
  const apiFeature=new ApiFeatures(Product.find(),req.query).search().filter();

  let products=await apiFeature.query.clone();
  let filteredProductsCount= products.length;

  apiFeature.pagiNation(resultPerPage)

   products = await apiFeature.query;

  
  res.status(200).json({ success:true, products,productsCount,resultPerPage,filteredProductsCount });
  
};

exports.getAdminProducts = async (req, res,next) => {

let products = await Product.find();  

  res.status(200).json({ success:true, products });
  
};





exports.updateProduct = catchAsyncErr( async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    next(new ErrorHandler("Product Not Found",404));
  }

  let images = [];

  if (typeof req.body.image === "string") {
    images.push(req.body.image);
  } else {
    images = req.body.image;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.image.length; i++) {
      await cloudinary.v2.uploader.destroy(product.image[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.image = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true, product });
});



exports.getProductDetails= catchAsyncErr( async (req, res, next)=>{
    let product = await Product.findById(req.params.id);
    if (!product) {
        next(new ErrorHandler("Product Not Found",404));
      }

      else{
        res.status(200).json({ success: true, product })
       
      }
  

})







exports.deleteProduct =catchAsyncErr( async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  
    if (!product) {
        next(new ErrorHandler("Product Not Found",404));
      }
  

  await product.remove();

  res
    .status(200)
    .json({ success: true, message: "Product Successfully Deleted" });
});


exports.createProductReview=catchAsyncErr(async(req,res,next)=>{
  const {productId,rating,comment}=req.body;

  const review={
    user:req.user.id.toString(),
    name:req.user.name,
    rating:Number(rating),
    comment
  }

  const product = await Product.findById(productId);

  const isReviewed=product.reviews.find((rev)=>rev.user.toString()===req.user._id.toString());

  if(isReviewed){
    product.reviews.forEach(rev=>{
      if(rev.user.toString()===req.user._id.toString()){
        rev.rating=rating,
        rev.comment=comment}
      })}

      else{
        product.reviews.push(review)
        product.numOfReview=product.reviews.length;
      }


      let avg=0;
      product.reviews.forEach((rev)=>{
        avg+=rev.rating
      })

      product.ratings=avg/product.reviews.length

      await product.save({validationBeforeSave:false});
      res.status(200).json({
        success:true
      });
    
  
})


exports.getProductReviews=catchAsyncErr (async(req,res,next)=>{
const product=await Product.findById(req.query.id)
if (!product) {
  next(new ErrorHandler("Product Not Found",404));
}

const reviews= product.reviews;

res.status(200).json({
  success:true,
  reviews
})

})


exports.deleteReview = catchAsyncErr(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

