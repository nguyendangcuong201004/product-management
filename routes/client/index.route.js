const homeRoutes = require("./home.route.js");
const productRoutes = require("./product.route.js");
const searchRoutes = require("./search.route.js");
const categoryMiddleware = require("../../middlewares/client/category.middleware.js");
const cartMiddleware = require("../../middlewares/client/cart.middleware.js");
const cartRoutes = require("./cart.route.js");
const orderRoutes = require("./order.route.js");
const userRoutes = require("./user.route.js");
const userMiddleware = require("../../middlewares/client/user.middleware.js");
const settingMiddleware = require("../../middlewares/client/setting.middleware.js");

module.exports = (app) => {

    app.use(categoryMiddleware.category);

    app.use(userMiddleware.infoUser);

    app.use(cartMiddleware.cart);

    app.use(settingMiddleware.settingGeneral);

    app.use("/", homeRoutes);

    app.use("/products", categoryMiddleware.category, productRoutes);

    app.use("/search", searchRoutes )

    app.use("/cart", cartRoutes);

    app.use("/checkout", orderRoutes);

    app.use("/user", userRoutes);
}
