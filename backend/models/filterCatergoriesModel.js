const mongoose = require("mongoose");

const filterCategoriesModelSchema = mongoose.Schema({
    category: { type: String },
    options: { type: Array },
});

module.exports = mongoose.model(
    "filterCategoriesModel",
    filterCategoriesModelSchema
);
