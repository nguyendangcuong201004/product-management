const dashboardRoutes = require("./dashboard.route.js");
const systemConfig = require("../../config/system.js");
const productRoutes = require("./product.route.js");

module.exports = (app) => {
    app.use(systemConfig + "/dashboard", dashboardRoutes);

    app.use(systemConfig + "/products", productRoutes);
}
