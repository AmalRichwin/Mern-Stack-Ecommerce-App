const User = require("../models/user");
const { Order, ProductCart } = require("../models/order");
const {} = require("express-validator");

exports.getUserById = (req, res, next, id) => {
	User.findById(id).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				err: "No user was found in DB",
			});
		}
		// testing virtuals
		// console.log(user.domain);
		req.profile = user;
		next();
	});
};

exports.getUser = (req, res) => {
	req.profile.salt = undefined;
	req.profile.encryp_password = undefined;
	req.profile.createdAt = undefined;
	req.profile.updatedAt = undefined;
	return res.json(req.profile);
};

exports.updateUser = (req, res) => {
	User.findByIdAndUpdate(
		{ _id: req.profile._id },
		{ $set: req.body },
		{ new: true, useFindAndModify: false },
		(err, user) => {
			if (err) {
				return res.status(400).json({
					error: "You are not authorized to update this user",
				});
			}
			user.salt = undefined;
			user.encryp_password = undefined;
			res.json(user);
		}
	);
};

exports.userPurchaseList = (req, res) => {
	Order.findOne({ user: req.profile._id })
		.populate("user", "_id name")
		.exec((err, order) => {
			if (err) {
				return res.status(400).json({
					error: "No Order in this Account",
				});
			}
			return res.json(order);
		});
};

exports.pushOrderInPurchaseList = (req, res, next) => {
	let purchases = [];
	req.body.order.products.forEach((product) => {
		purchases.push({
			_id: product._id,
			name: product.name,
			description: product.description,
			category: product.category,
			quantity: product.quantity,
			amount: req.body.order.amount,
			transaction_id: req.body.order.transaction_id,
		});
	});

	// store this in DB
	User.findOneAndUpdate(
		{ _id: req.profile._id },
		// this is an array so $push instead $set
		{ $push: { purchases: purchases } },
		//  when set flag new = true, that means from the DB send me back the updated one
		{ new: true },
		(err, purchases) => {
			if (err) {
				return res.status(400).json({
					error: "UNABLE to save purchase list",
				});
			}
			next();
		}
	);
};
