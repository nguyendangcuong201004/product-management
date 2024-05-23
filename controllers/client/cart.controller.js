const Cart = require("../../models/cart.model.js");
const Product = require("../../models/product.model.js");

// [GET] /cart
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


        res.render("client/pages/cart/index.pug", {
            pageTitle: 'Giỏ hàng',
            cartDetail: cart
        });
    }
    catch(error){
        res.redirect("/")
    }
}
 

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

// [GET] cart/delete/item.product_id

module.exports.deleteProduct = async (req, res) => {
    const productId = req.params.productId;

    await Cart.updateOne({
        _id: req.cookies.cartId,
    }, {
        $pull: { products: { product_id: productId } }
    })
    res.redirect("back")
}

// [GET] cart/update/:product_id/:quantity

module.exports.updateProduct = async (req, res) => {
    const productId = req.params.productId;
    const quantity = parseInt(req.params.quantity);

    try {
        await Cart.updateOne({
            _id: req.cookies.cartId,
            "products.product_id": productId
        }, {
            $set: { "products.$.quantity":  quantity}
        })

        req.flash("success", "Cập nhật sản phẩm thành công !")

        res.redirect("back")
    }

    catch(error){
        res.redirect("/products")
    }
}