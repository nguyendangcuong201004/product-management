
const Product = require("../../models/product.model.js");
const ProductCategory = require("../../models/product-category.model.js");


// [GET] /products/
module.exports.index = async (req, res) => {

    const products = await Product
    .find({
        deleted: false,
        status: "active"
    })
    .sort( {position: "desc"} );


    res.render("client/pages/products/index.pug", {
        pageTitle: "Danh sách sản phẩm",
        products: products
    });
}

// [GET] /products/detail/:slug
module.exports.detail = async (req, res) => {

    const slug = req.params.slug;

    const product = await Product.findOne({
        slug: slug,
        deleted: false,
        status: "active"
    })

    const category = await ProductCategory.findOne({
        deleted: false,
        _id: product.product_category_id
    })

    product.category = category;


    if (product){
        res.render("client/pages/products/detail", {
            pageTitle: product.title,
            product: product
        })
    }
    else {
        res.redirect("/products")
    }

}

// [GET] /products/:slugCategory
module.exports.category = async (req, res) => {

    const slugCategory = req.params.slugCategory;

    const category = await ProductCategory.findOne({
        slug: slugCategory,
        deleted: false,
        status: "active"
    });
    const category_id = category.id;

    const getSubCategory = async (parent_id) => {
        let allSub = [];
        const listSub = await ProductCategory.find({
            parent_id: parent_id,
            deleted: false,
            status: "active"
        })
        allSub = [...listSub];

        for (const sub of listSub) {
            const childs = await getSubCategory(sub.id);
            allSub = allSub.concat(childs);
        }

        return allSub;
    }

    const listSubCategory = await getSubCategory(category_id);
    const listIdSubCategory = listSubCategory.map((item) => {
        return item.id;
    })



    const products = await Product
    .find({
        deleted: false,
        status: "active",
        product_category_id: { $in: [category_id, ...listIdSubCategory] }
    })
    .sort({ position: "desc" });

    res.render("client/pages/products/index.pug", {
        pageTitle: category.title,
        products: products
    })
}