var express = require("express");
var router = express.Router();

const { body, validationResult } = require("express-validator");
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

router.post(
	"/signup",
	[
		body("firstname")
			.isLength({ min: 3 })
			.withMessage("firstname should be at least 3 chars long"),
		body("email").isEmail().withMessage("email is required").normalizeEmail(),
        body("password")
			.isLength({ min: 5 })
			.withMessage("password should be atleast 5 chars long")
			.matches(/\d/)
            .withMessage("must contain a number"),
	],
	signup
);

router.post(
	"/signin",
	[
		body("email").isEmail().withMessage("email is required"),
		body("password")
			.isLength({ min: 5 })
			.withMessage("pasword field is required"),
	],
	signin
);
router.get("/signout", signout);

module.exports = router;
