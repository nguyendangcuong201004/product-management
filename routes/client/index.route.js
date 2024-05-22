const homeRoutes = require("./home.route.js");
const productRoutes = require("./product.route.js");
const searchRoutes = require("./search.route.js");
const categoryMiddleware = require("../../middlewares/client/category.middleware.js");

module.exports = (app) => {
    app.use("/",  categoryMiddleware.category, homeRoutes);

    app.use("/products", categoryMiddleware.category, productRoutes);

    app.use("/search", searchRoutes )
}
