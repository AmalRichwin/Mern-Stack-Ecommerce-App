import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
// import StripeCheckout from "./payment gateway/StripeCheckout";
import PaymentB from "./PaymentB";

const Cart = () => {
	const [products, setProducts] = useState([]);
	const [reload, setReload] = useState(false);

	useEffect(() => {
		setProducts(loadCart() ? loadCart() : []);
	}, [reload]);
	console.log(products);
	const loadAllProducts = (products) => {
		return (
			<div className="">
				<h2>This section is to load products</h2>
				{products.map((product, index) => (
					<Card
						key={index}
						product={product}
						addtoCart={false}
						removeFromCart={true}
						setReload={setReload}
						reload={reload}
					/>
				))}
			</div>
		);
	};

	return (
		<Base title="Cart Page" description="Ready to Checkout">
			<div className="row text-center">
				<div className="col-6">
					{products.length > 0 ? (
						loadAllProducts(products)
					) : (
						<h3>CART IS EMPTY</h3>
					)}
				</div>
				{/* <div className="col-6">
					<StripeCheckout
						products={products}
						setReload={setReload}
						reload={reload}
					/>
				</div>  */}
				<div className="col-6">
					<PaymentB products={products} setReload={setReload} reload={reload} />
				</div>
			</div>
		</Base>
	);
};

export default Cart;
