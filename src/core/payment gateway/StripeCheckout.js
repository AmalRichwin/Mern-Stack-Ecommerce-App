import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth/helper";
import { cartEmpty, loadCart } from "../helper/cartHelper";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../../backend";

const StripeCheckout = ({
	products,
	setReload = (f) => f,
	reload = undefined,
}) => {
	const [data, setData] = useState({
		loading: false,
		success: false,
		error: "",
		address: "",
	});
	const { user, token } = isAuthenticated();

	const getFinalPrice = () => {
		let amount = 0;
		products.map((product) => {
			amount += product.price;
		});
		return amount;
	};

	const makePayment = (token) => {
		const body = {
			token,
			products,
		};
		const headers = {
			"Content-Type": "application/json",
		};

		return fetch(`${API}/stripepayment`, {
			method: "POST",
			headers,
			body: JSON.stringify(body),
		})
			.then((response) => {
				console.log("RESPONSE", response);

				const { status } = response;
				console.log("STATUS", status);
			})
			.catch((err) => console.log(err));
	};

	const showStripeButton = () => {
		return isAuthenticated() ? (
			<StripeCheckoutButton
				stripeKey={process.env.REACT_APP_STRIPE_PK}
				token={makePayment}
				name="Buy Tshirts"
				amount={getFinalPrice() * 100}
				billingAddress
				shippingAddress
				currency="USD"
			>
				<button className="btn btn-success">Pay with stripe</button>
			</StripeCheckoutButton>
		) : (
			<Link to="/Signin">
				<button className="btn btn-warning">Signin to Continue</button>
			</Link>
		);
	};

	useEffect(() => {}, []);

	return (
		<div>
			{/* {getFinalPrice()} */}
			<h3 className="text-white">
				Stripe Checkout <i className="fas fa-dollar-sign"></i>
				{getFinalPrice()}
			</h3>
			{showStripeButton()}
		</div>
	);
};

export default StripeCheckout;
