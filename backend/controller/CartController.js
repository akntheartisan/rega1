const mongoose = require("mongoose");
const cartmodel = require("../model/CartModel");
const usermodel = require("../model/UserRegisterModel");
const productmodel = require("../model/ProductsModel");
const razorpay = require("razorpay");
const crypto = require("crypto");

exports.addCart = async (req, res, next) => {
  console.log(req.body);
  const { userId } = req.body.userDetails;

  const { cartData, total,  paymentMode } = req.body;

  console.log('paymentMode:' + paymentMode);

  try {
    if (paymentMode === "offline") {
        console.log("offline");
        const orderPlace = await cartmodel.create({
          userId,
          PurchasedData: []
        });
    
        await cartmodel.updateOne(
          { _id: orderPlace._id },
          {
            $push: {
              PurchasedData: {
                total,
                cartData: cartData.cartDetails.map(item => item)
              }
            }
          }
        );

      const findUser = await usermodel.findById(userId);
      console.log(findUser);
      if (findUser) {
        const addPurchasedItem = await usermodel.updateOne(
          { _id: userId },
          {
            $push: {
              Purchased: {
                total,
                cartData : cartData.cartDetails.map(item => item)
              },
            },
          }
        );
      }

      if (orderPlace) {
        return res.status(200).json({
          success: "offline order success",
          message: "order has been placed successfully",
        });
      }
    } else if (paymentMode === "online") {

      console.log("payment mode : online");

      const razorPayInstance = new razorpay({
        key_id: "rzp_test_ooBBvuCJO2yhPh",
        key_secret: "Sza1b1bUrEAKO4ITERLLVGYi",
      });

      const options = {
        amount: total * 100,
        currency: "INR",
        receipt: crypto.randomBytes(10).toString("hex"),
      };

      razorPayInstance.orders.create(options, (err, order) => {
        if (err) {
          console.log(err.error.description);
          res.json({error:'Amount exceed'});
        } else {
          res.json({ success:'verification success',transaction: order });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
}; 

exports.verify = async (req, res) => {
  console.log('verify:');
  console.log(req.body);
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", 'Sza1b1bUrEAKO4ITERLLVGYi')
      .update(sign.toString())
      .digest("hex");

    console.log(razorpay_signature,expectedSign);

    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ message: "Payment Verified Sucessfully" });
    } else {
      return res.status(400).json({ message: "Invalid Signature" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.addCartOnline = async(req,res)=>{
  console.log(req.body);
  const { userId } = req.body.userDetails;


  const {   cartData,total, order_id,payment_id } = req.body;
  try {

    const orderPlace = await cartmodel.create({
      userId,
      PurchasedData: [] 
    });


    await cartmodel.updateOne(
      { _id: orderPlace._id },
      {
        $push: {
          PurchasedData: {
            total,
            cartData: cartData.cartDetails.map(item => item)
          }
        }
      }
    );

    const findUser = await usermodel.findById(userId);
    console.log(findUser);
    if (findUser) {
      const addPurchasedItem = await usermodel.updateOne(
        { _id: userId },
        {
          $push: {
            Purchased: {
              total,
              cartData : cartData.cartDetails.map(item => item),
              order_id,
              payment_id
            },
          },
        }
      );
    }
    
  } catch (error) {
    console.log(error);
  }
}

exports.getCart = async (req, res, next) => {
  console.log("getcart");

  try {
    const cart = await cartmodel.find().populate("productId").exec();
    if (cart) {
      return res.status(200).json({
        status: "success",
        data: cart,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
