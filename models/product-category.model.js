const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const productCagetorySchema = new mongoose.Schema(
    {
        title: String,
        parent_id: {
            type: String,
            defaut: ""
        },
        description: String,
        thumbnail: String,
        status: String,
        position: Number,
        slug: {
            type: String, 
            slug: "title",
            unique: true
        },
        deleted: {
            type: Boolean,
            default: false,
        },
        deleteAt: Date,
        createdBy: String,
        deletedBy: String,
        updatedBy: String
    },{
        timestamps: true
    }
)

const ProductCategory = mongoose.model("ProductCategory", productCagetorySchema, "products-category");

module.exports = ProductCategory;