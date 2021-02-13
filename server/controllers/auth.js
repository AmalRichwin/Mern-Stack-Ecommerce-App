// Naming convention, use the same name that you used while exporting it
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({
			error: errors.array()[0].msg,
			// param: errors.array()[0].param,
		});
	}

	const user = new User(req.body);
	user.save((err, user) => {
		if (err) {
			return res.status(400).json({
				err: "NOT ABLE TO SAVE USER IN DB",
			});
		}
		res.json({
			firstname: user.firstname,
			email: user.email,
			ID: user._id,
		});
	});
};

exports.signin = (req, res) => {
	const { email, password } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			error: errors.array()[0].msg,
			// param: errors.array()[2],
		});
	}

	User.findOne({ email }, (err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "USER email does not exists",
			});
		}

		if (!user.authenticate(password)) {
			return res.status(401).json({
				error: "Email and password do not match",
			});
		}

		// CREATE TOKEN
		const token = jwt.sign({ _id: user._id }, process.env.SECRET);
		// PUT TOKEN IN COOKIE
		res.cookie("token", token, { expire: new Date() + 999 });

		// Send response to frontend
		const { _id, firstname, lastname, email, role } = user;
		return res.json({ token, user: { _id, firstname, lastname, email, role } });
	});
};

exports.signout = (req, res) => {
	res.clearCookie("token");
	res.json({
		message: "user signout successfully",
	});
};

//  Protected routes
exports.isSignedIn = expressJwt({
	secret: process.env.SECRET,
	userProperty: "auth",
});

// Custom Middlewares
exports.isAuthenticated = (req, res, next) => {
	// console.log(req.profile, req.auth);
	let checker = req.profile && req.auth && req.profile._id == req.auth._id;
	if (!checker) {
		return res.status(403).json({
			error: "ACCESS DENIED",
		});
	}
	next();
};

exports.isAdmin = (req, res, next) => {
	if (req.profile.role === 0) {
		return res.status(403).json({
			error: "You are not ADMIN, ACCESS DENIED",
		});
	}
	next();
};
