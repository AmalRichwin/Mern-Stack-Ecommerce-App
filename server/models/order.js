const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const ProductCartSchema = new Schema({
	product: {
		type: ObjectId,
		ref: "Product",
	},
	name: String,
	count: Number,
	price: Number,
});

const ProductCart = mongoose.model("ProductCart", ProductCartSchema);

const OrderSchema = new Schema(
	{
		products: [ProductCartSchema],
		transaction_id: {},
		amount: { type: Number },
		address: String,
		status: {
			type: String,
			default: "Recieved",
			// think of aeroplane seat - window seat, middle seat,
			// aisle seat
			enum: ["Cancelled", "Delivered", "Shipping", "Processing", "Recieved"],
		},
		Updated: Date,
		user: {
			type: ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, ProductCart };
