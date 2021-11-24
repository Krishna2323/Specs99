const catchAsyncErr = require("../middleware/catchAsyncErr");
const dotenv=require("dotenv");


dotenv.config({path:"backend/config/config.env"})

const stripe = require("stripe")
const Stripe=stripe(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncErr(async (req, res, next) => {
  const myPayment = await Stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Specs99",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErr(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});




























































