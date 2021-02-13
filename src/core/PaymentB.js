import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { getmeToken, processPayment } from "./payment gateway/BrainTreePayment";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";

const PaymentB = ({ products, setReload = (f) => f, reload = undefined }) => {
	const [info, setInfo] = useState({
		loading: false,
		success: false,
		clientToken: null,
		error: "",
		instance: {},
	});

	const userId = isAuthenticated() && isAuthenticated().user._id;
	const token = isAuthenticated() && isAuthenticated().token;

	const getToken = (userId, token) => {
		getmeToken(userId, token).then((info) => {
			// console.log("INFORMATION", info);
			if (info.error) {
				setInfo({
					...info,
					error: info.error,
				});
			} else {
				const clientToken = info.clientToken;
				setInfo({ clientToken });
			}
		});
	};

	useEffect(() => {
		getToken(userId, token);
	}, []);

	const onPurchase = () => {
		setInfo({ loading: true });
		let nonce;
		let getNonce = info.instance.requestPaymentMethod().then((data) => {
			nonce = data.nonce;
			const paymentData = {
				paymentMethodNonce: nonce,
				amount: getAmount(),
			};
			processPayment(userId, token, paymentData)
				.then((response) => {
					setInfo({ ...info, success: response.success, loading: false });
					console.log("PAYMENT SUCCESS");
					const orderData = {
						products: products,
						transaction_id: response.transaction.id,
						amount: response.transaction.amount,
					};
					createOrder(userId, token, orderData);
					cartEmpty(() => {
						console.log("CART CLEARED");
					});
					setReload(!reload);
				})
				.catch((err) => {
					setInfo({
						loading: false,
						success: false,
					});
					console.log("PAYMENT FAILED");
				});
		});
	};

	const getAmount = () => {
		let amount = 0;
		products.map((product) => (amount += product.price));
		return amount;
	};

	const showBrainTreeDropInBut = () => {
		return (
			<div>
				{info.clientToken !== null && products.length > 0 ? (
					<div>
						<DropIn
							options={{ authorization: info.clientToken }}
							onInstance={(instance) => (info.instance = instance)}
						/>
						<button className="btn btn-success btn-block" onClick={onPurchase}>
							Buy
						</button>
					</div>
				) : !isAuthenticated ? (
					<h3>Please login to continue</h3>
				) : ( 
					null
				)}
			</div>
		);
	};

	return (
		<div>
			<h3>Your Bill is ${getAmount()}</h3>
			{showBrainTreeDropInBut()}
		</div>
	);
};

export default PaymentB;
