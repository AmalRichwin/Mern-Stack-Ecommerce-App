const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const crypto = require("crypto");
const { Schema } = mongoose;

const userSchema = new Schema(
	{
		firstname: {
			type: String,
			required: true,
			maxlength: 32,
			trim: true,
		},
		lastname: {
			type: String,
			maxlength: 32,
			trim: true,
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		userinfo: {
			type: String,
			trim: true,
		},
		// TODO: come back here
		encryp_password: {
			type: String,
			required: true,
		},
		salt: String,
		// TODO: higher the number higher the privilege
		role: {
			type: Number,
			default: 0,
		},
		purchases: {
			type: Array,
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

// virtuals
userSchema
	.virtual("password")
	.set(function (password) {
		this._password = password;
		this.salt = uuidv4();
		this.encryp_password = this.securePassword(password);
	})
	.get(function () {
		return this._password;
	});

userSchema.virtual("domain").get(function () {
	return this.email.slice(this.email.indexOf("@") + 1);
});

// userSchema methods

userSchema.methods = {
	authenticate: function (plainPassword) {
		return this.securePassword(plainPassword) === this.encryp_password;
	},
	securePassword: function (plainPassword) {
		if (!plainPassword) return "";
		try {
			return crypto
				.createHmac("sha256", this.salt)
				.update(plainPassword)
				.digest("hex");
		} catch (err) {
			return "";
		}
	},
};

module.exports = mongoose.model("User", userSchema);
