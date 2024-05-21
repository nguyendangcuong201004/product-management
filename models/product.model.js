const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
    title: String,
    product_category_id: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
        type: Boolean,
        default: false
    },
    slug: {
        type: String, 
        slug: "title",
        unique: true
    },
    createdBy: String,
    deletedBy: String,
    deletedAt: Date,
    updatedBy: String,
    featured: {
        type: String,
        default: "0"
    }
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema , "products")

module.exports = Product;