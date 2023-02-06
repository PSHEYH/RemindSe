const Category = require('../models/category');

exports.getCategories = async (req, res, next) => {
    const categories = await Category.findAll();

    res.status(200).json({
        categories: categories
    });
}