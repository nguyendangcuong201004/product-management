const dashboardRoutes = require("./dashboard.route.js");
const systemConfig = require("../../config/system.js");
const productRoutes = require("./product.route.js");
const productCategoryRoutes = require("./product-category.router.js");
const roleRoutes = require("./role.route.js");
const accountRoutes = require("./account.route.js");
const authRoutes = require("./auth.route.js");
const authMiddleware = require("../../middlewares/admin/auth.middleware.js")
const myAccountRoutes = require("./my-account.route.js");

module.exports = (app) => {
    app.use(systemConfig + "/dashboard", authMiddleware.requireAuth , dashboardRoutes);

    app.use(systemConfig + "/products", authMiddleware.requireAuth, productRoutes);

    app.use(systemConfig + "/products-category", authMiddleware.requireAuth, productCategoryRoutes)

    app.use(systemConfig + "/roles", authMiddleware.requireAuth, roleRoutes)

    app.use(systemConfig + "/accounts", authMiddleware.requireAuth, accountRoutes)

    app.use(systemConfig + "/auth"  , authRoutes)

    app.use(systemConfig + "/my-account"  , myAccountRoutes)
}
