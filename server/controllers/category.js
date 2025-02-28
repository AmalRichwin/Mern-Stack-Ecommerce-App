const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
	Category.findById(id).exec((err, category) => {
		if (err) {
			return res.status(400).json({
				error: "Category Not Found in DB",
			});
		}
		req.category = category;
		next();
	});
};

exports.createCategory = (req, res) => {
	const category = new Category(req.body);
	category.save((err, category) => {
		if (err) {
			return res.status(400).json({
				error: "Not able to save category in DB",
			});
		}
		return res.json({ category });
	});
};

exports.getCategory = (req, res) => {
	return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
	Category.find().exec((err, categories) => {
		if (err) {
			return res.status(400).json({
				error: "No Categories Found",
			});
		}
		return res.json(categories);
	});
};

exports.updateCategory = (req, res) => {
	const category = req.category;
	category.name = req.body.name;

	category.save((err, updatedCategory) => {
		if (err) {
			return res.status(400).json({
				error: "Failed to update category in DB",
			});
		}
		return res.json(updatedCategory);
	});
};

exports.removeCategory = (req, res) => {
	const category = req.category;
	category.remove((err, category) => {
		if (err) {
			return res.status(400).json({
				error: `Failed to Delete ${category.name} category`,
			});
		}
		return res.json({
			message: `Sucessfully deleted ${category.name} category`,
		});
	});
};
