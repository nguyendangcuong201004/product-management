const Cart = require("../../models/cart.model.js");
const Product = require("../../models/product.model.js");
const Order = require("../../models/orders.model.js");

// [GET] /checkout
module.exports.index = async (req, res) => {

   try {
      const cart = await Cart.findOne({
         _id: req.cookies.cartId
      })

      cart.totalPrice = 0;

      for (const product of cart.products) {
         const infoProduct = await Product.findOne({
            _id: product.product_id
         }).select("title price discountPercentage stock thumbnail slug")

         product.infoProduct = infoProduct;

         cart.totalPrice += Math.round(product.infoProduct.price - product.infoProduct.price * product.infoProduct.discountPercentage / 100) * product.quantity;
      }


      res.render("client/pages/checkout/index.pug", {
         pageTitle: "Đặt hàng",
         cartDetail: cart
      })
   }
   catch (error) {
      res.redirect("/")
   }
}

// [POST] /checkout/order
module.exports.order = async (req, res) => {
   const cartId = req.cookies.cartId;
   const userInfo = req.body;

   const cart = await Cart.findOne({
      _id: cartId
   })


   const products = [];

   for (const key of cart.products) {
      const quantity = parseInt(key.quantity);
      const product = await Product.findOne({
         _id: key.product_id,
      }).select("price discountPercentage")
      const objectProduct = {};
      objectProduct.quantity = quantity;
      objectProduct.product_id = product.id;
      objectProduct.price = product.price;
      objectProduct.discountPercentage = product.discountPercentage;
      products.push(objectProduct);
   }

   const dataOrder = {
      cart_id: cartId,
      userInfo: userInfo,
      products: products,
   }

   const order = new Order(dataOrder);
   await order.save(cart);

   await Cart.updateOne({
      _id: cartId
   }, {
      products: [],
   })

   res.redirect(`/checkout/success/${order.id}`);
}

// [POST] /checkout/success/:id
module.exports.success = async (req, res) => {
   try {
      const id = req.params.orderId;

      const order = await Order.findOne({
         _id: id
      })

      order.orderTotal = 0;

      for (const item of order.products) {
         const product = await Product.findOne({
            _id: item.product_id,
         });
         item.title = product.title;
         item.thumbnail = product.thumbnail;
         item.priceNew = Math.round(product.price - product.price * product.discountPercentage / 100);
         item.totalPrice = Math.round(product.price - product.price * product.discountPercentage / 100) * item.quantity;
         order.orderTotal += item.totalPrice;
      }

      res.render("client/pages/checkout/success.pug", {
         pageTitle: "Đặt hàng thành công",
         order: order
      })
   }
   catch (error) {
      res.redirect("/")
   }
}