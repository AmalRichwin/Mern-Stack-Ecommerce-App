const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

const productSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			maxlength: 32,
		},
		description: {
			type: String,
			trim: true,
			required: true,
			maxlength: 2000,
		},
		price: {
			type: Number,
			required: true,
			maxlength: 32,
			trim: true,
		},
		category: {
			type: ObjectId,
			ref: "Category",
		},
		stock: {
			type: Number,
			default: 0,
		},
		sold: {
			type: Number,
			default: 0,
		},
		photo: {
			data: Buffer,
			contentType: String,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Product", productSchema);
