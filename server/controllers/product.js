const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

// controllers
exports.getProductById = (req, res, next, id) => {
	Product.findById(id)
		.populate("category")
		.exec((err, product) => {
			if (err) {
				return res.status(400).json({
					error: "Product Not Found in DB",
				});
			}
			req.product = product;
			next();
		});
};

exports.createProduct = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	console.log(req);
	console.log(res);
	form.parse(req, (err, fields, file) => {
		if (err) {
			return res.status(400).json({
				error: "Problem with image",
			});
		}
		// Destructure the fields
		const { name, description, price, category, stock } = fields;

		// restrictions on field
		if (!name || !description || !price || !category || !stock) {
			return res.status(400).json({
				error: "Please include all fields",
			});
		}

		let product = new Product(fields);

		//  handle file here
		if (file.photo) {
			if (file.photo.size > 3000000) {
				return res.status(400).json({
					error: "File size is too big!",
				});
			}
			product.photo.data = fs.readFileSync(file.photo.path);
			product.photo.contentType = file.photo.type;
		}

		// save to DB
		product.save((err, product) => {
			if (err) {
				return res.status(400).json({
					error: "Saving TShirt in DB failed",
				});
			}
			return res.json(product);
		});
	});
};

exports.getProduct = (req, res) => {
	req.product.photo = undefined;
	return res.json(req.product);
};

// update controller
exports.updateProduct = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;

	form.parse(req, (err, fields, file) => {
		if (err) {
			return res.status(400).json({
				error: "Problem with image",
			});
		}
		// here the updation of product takes place
		let product = req.product;
		product = _.extend(product, fields);

		//  handle file here
		if (file.photo) {
			if (file.photo.size > 3000000) {
				return res.status(400).json({
					error: "File size is too big!",
				});
			}
			product.photo.data = fs.readFileSync(file.photo.path);
			product.photo.contentType = file.photo.type;
		}

		// save to DB
		product.save((err, product) => {
			if (err) {
				return res.status(400).json({
					error: "Updating of in DB failed",
				});
			}
			return res.json(product);
		});
	});
};

// delete controller
exports.deleteProduct = (req, res) => {
	let product = req.product;
	product.remove((err, deletedProduct) => {
		if (err) {
			return res.status(400).json({
				error: "Unable to delete the product from DB",
			});
		}
		return res.status(200).json({
			message: "Deletion was Successfull",
			deletedProduct,
		});
	});
};

// middleware
// make the photo load on background
exports.photo = (req, res, next) => {
	if (req.product.photo.data) {
		res.set("Content-Type", req.product.photo.contentType);
		// FIXME: return
		return res.send(req.product.photo.data);
	}
	next();
};

// product listing
exports.getAllProducts = (req, res) => {
	let limit = req.query.limit ? parseInt(req.query.limit) : 8;
	let sortBy = req.query.sort ? req.query.sort : "_id";
	Product.find()
		.select("-photo")
		.populate("category")
		.sort([[sortBy, "asc"]])
		.limit(limit)
		.exec((err, products) => {
			if (err) {
				return res.status(400).json({
					error: "No Product Found",
				});
			}
			return res.json(products);
		});
};

exports.getAllUniqueCategories = (req, res) => {
	Product.distinct("category", {}, (err, category) => {
		if (err) {
			return res.status(400).json({
				error: "No category found",
			});
		}
		return res.json(category);
	});
};

// middleware for updating details about stock
exports.updateStock = (req, res, next) => {
	let myOperations = req.body.order.products.map((product) => {
		return {
			updateOne: {
				filter: { _id: product._id },
				update: { $inc: { stock: -product.count, sold: +product.count } },
			},
		};
	});

	Product.bulkWrite(myOperations, {}, (err, products) => {
		if (err) {
			return res.status(400).json({
				message: "Bulk operations Failed",
			});
		}
		next();
	});
};
