const dashboardRoutes = require("./dashboard.route.js");


module.exports = (app) => {
    const PATH_ADMIN = "/admin";
    app.use(PATH_ADMIN + "/dashboard", dashboardRoutes);
}
