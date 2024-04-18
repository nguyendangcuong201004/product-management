const dashboardRoutes = require("./dashboard.route.js");
const systemConfig = require("../../config/system.js");
const productRoutes = require("./product.route.js");
const productCategoryRoutes = require("./product-category.router.js");
const roleRoutes = require("./role.route.js");

module.exports = (app) => {
    app.use(systemConfig + "/dashboard", dashboardRoutes);

    app.use(systemConfig + "/products", productRoutes);

    app.use(systemConfig + "/products-category", productCategoryRoutes)

    app.use(systemConfig + "/roles", roleRoutes)
}
