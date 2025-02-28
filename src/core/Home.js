import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getAllProducts } from "./helper/coreapicalls";

export default function Home() {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(false);

	const loadAllProducts = () => {
		getAllProducts().then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setProducts(data);
			}
		});
	};
	console.log(products);
	useEffect(() => {
		loadAllProducts();
	}, []);

	return (
		<Base title="Home Page" description="Welcome to the Tshirt Store">
			<div className="row text-center">
				<h1 className="text-white">All of tshirts</h1>
				<div className="row">
					{products.map((product, index) => {
						return (
							<div key={index} className=" col-sm-6 col-md-6 col-lg-4 mb-4">
								<Card product={product} />
							</div>
						);
					})}
				</div>
			</div>
		</Base>
	);
}
