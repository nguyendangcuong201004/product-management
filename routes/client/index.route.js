const homeRoutes = require("./home.route.js");
const productRoutes = require("./product.route.js");
const searchRoutes = require("./search.route.js");
const categoryMiddleware = require("../../middlewares/client/category.middleware.js");
const cartMiddleware = require("../../middlewares/client/cart.middleware.js");
const cartRoutes = require("./cart.route.js");

module.exports = (app) => {

    app.use(categoryMiddleware.category);

    app.use(cartMiddleware.cart);

    app.use("/", homeRoutes);

    app.use("/products", categoryMiddleware.category, productRoutes);

    app.use("/search", searchRoutes )

    app.use("/cart", cartRoutes);
}
