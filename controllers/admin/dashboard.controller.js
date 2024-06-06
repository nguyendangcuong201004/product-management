const ProductCategory = require("../../models/product-category.model.js");
const Product = require("../../models/product.model.js");
const Account = require("../../models/account.model.js");
const User = require("../../models/user.model.js");

module.exports.index = async (req, res) => {

    const countTotalProductCategory = await ProductCategory.countDocuments({
        deleted: false,
    });
    const countActiveProductCategory = await ProductCategory.countDocuments({
        deleted: false,
        status: "active"
    });
    const countInActiveProductCategory = await ProductCategory.countDocuments({
        deleted: false,
        status: "inactive"
    })



    const countTotalProduct = await Product.countDocuments({
        deleted: false,
    });
    const countActiveProduct = await Product.countDocuments({
        deleted: false,
        status: "active"
    });
    const countInActiveProduct = await Product.countDocuments({
        deleted: false,
        status: "inactive"
    })


    const countTotalAcc = await Account.countDocuments({
        deleted: false,
    });
    const countActiveAcc= await Account.countDocuments({
        deleted: false,
        status: "active"
    });
    const countInActiveAcc = await Account.countDocuments({
        deleted: false,
        status: "inactive"
    })

    
    const countTotalUser = await User.countDocuments({
        deleted: false,
    });
    const countActiveUser= await User.countDocuments({
        deleted: false,
        status: "active"
    });
    const countInActiveUser = await User.countDocuments({
        deleted: false,
        status: "inactive"
    })


    const statistic = {
        categoryProduct: {
            total: countTotalProductCategory,
            active: countActiveProductCategory,
            inactive: countInActiveProductCategory,
        },
        product: {
            total: countTotalProduct,
            active: countActiveProduct,
            inactive: countInActiveProduct,
        },
        account: {
            total: countTotalAcc,
            active: countActiveAcc,
            inactive: countInActiveAcc,
        },
        user: {
            total: countTotalUser,
            active: countActiveUser,
            inactive: countInActiveUser,
        },

    }

    res.render("admin/pages/dashboard/index.pug", {
        pageTitle: "Trang tổng quan",
        statistic: statistic
    })
}