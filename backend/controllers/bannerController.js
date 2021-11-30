const Banner=require("../modals/bannerModal");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErr=require("../middleware/catchAsyncErr");
const cloudinary = require("cloudinary")


exports.createBanner=catchAsyncErr(async(req,res,next)=>{
    let image = [];

    if (typeof req.body.image === "string") {
      image.push(req.body.image);
    } else {
      image = req.body.image;
    }
  
    const imagesLinks = [];
  
    for (let i = 0; i < image.length; i++) {
      const result = await cloudinary.v2.uploader.upload(image[i], {
        folder: "banners",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.image = imagesLinks;
  
    const banner = await Banner.create(req.body);
    res.status(201).json({
      success: true,
      banner,
    });
})

exports.getAllBanners = async (req, res,next) => {


  const banners=await Banner.find();

  res.status(200).json({
    success: true,
    banners,
  });



  
};


exports.deleteBanner =catchAsyncErr( async (req, res, next) => {
  let banner = await Banner.findById(req.params.id);
  
    if (!banner) {
        next(new ErrorHandler("Banner Not Found",404));
      }
  

  await banner.remove();

  res
    .status(200)
    .json({ success: true, message: "Banner Successfully Deleted" });
});
