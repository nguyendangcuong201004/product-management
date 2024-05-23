const Cart = require("../../models/cart.model.js");


// [POST] /cart/add/:productId
module.exports.addPost = async (req, res) => {
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);
    const cartId = req.cookies.cartId;

    try {

        const cart = await Cart.findOne({
            _id: cartId
        });

        const exitProductInCart = cart.products.find((item) => {
            return item.product_id == productId;
        })

        if (exitProductInCart){
            const quantityUpdate = exitProductInCart.quantity + quantity;
            await Cart.updateOne({
                _id: cartId,
                "products.product_id" : productId
            }, {
                $set: { "products.$.quantity" : quantityUpdate }
            })
        }
        else {
            const ObjectCart = {
                product_id: productId,
                quantity: quantity
            }
            
            await Cart.updateOne({
                _id: cartId,
            }, {
                $push: {
                    products: ObjectCart
                }
            })
        }
        req.flash("success", "Sản phẩm đã được thêm vào giỏ hàng!")
    }
    catch(error){
        req.flash("error", "Thêm sản phầm không thành công!")
    }

    res.redirect("back")
}