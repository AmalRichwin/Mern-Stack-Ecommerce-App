import React, { useState } from "react";
import { addItemToCart } from "../core/helper/cartHelper";
import ImageHelper from "../core/helper/ImageHelper";
import { toast } from "react-toastify";

const OrderCard = ({ order }) => {
	const [success, setSuccess] = useState(false);
	const addToCart = () => {
		order.price = parseInt(order.amount);
		console.log(order);
		addItemToCart(order, () => setSuccess(true));
	};

	const toastmessage = () => {
		toast.warn("Product added to Cart", {
			position: "top-center",
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	return (
		<div className="row mb-4 justify-content-center">
			<div className="card col-sm-4 mr-2">
				<ImageHelper product={order} />
			</div>
			<div className="card col-sm-6 mt-3 justify-content-center">
				<li className="list-group-item text-dark">{order.name}</li>
				<li className="list-group-item text-dark">$ {order.amount}</li>
				<button
					className="badge badge-danger col-2 mt-4 pt-2 text-center"
					onClick={() => {
						addToCart();
						toastmessage();
					}}
				>
					Buy Again
				</button>
			</div>
		</div>
	);
};

export default OrderCard;
