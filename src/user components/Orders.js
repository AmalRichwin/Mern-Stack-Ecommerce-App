import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getUser } from "../user/helper/userapicalls";
import OrderCard from "./OrderCard";

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [error, setError] = useState("");
	const { user, token } = isAuthenticated();
	const getUserDetails = () => {
		getUser(user._id, token).then((data) => {
			setOrders(data.purchases);
		});
	};
	useEffect(() => {
		getUserDetails();
	}, []);
	return (
		<Base title="Orders Page" description="All of your orders are listed here">
			<div className="container bg-fancy mb-3 pb-4">
				<h3 className="text-center pt-4 pb-4">Your Orders</h3>
				{orders.map((order, index) => {
					return <OrderCard key={index} order={order} />;
				})}
			</div>
		</Base>
	);
};

export default Orders;
