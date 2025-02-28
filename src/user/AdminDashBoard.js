import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";

const AdminDashBoard = () => {
	const {
		user: { firstname, lastname, email, role },
	} = isAuthenticated();

	const adminLeftSide = () => {
		return (
			<div className="card">
				<h4 className="card-header bg-dark text-white">Admin Navigation</h4>
				<ul className="list-group">
					<li className="list-group-item">
						<Link to="/admin/create/category" className="nav-link text-success">
							Create Categories
						</Link>
					</li>
					<li className="list-group-item">
						<Link to="/admin/categories" className="nav-link text-success">
							Manage Categories
						</Link>
					</li>
					<li className="list-group-item">
						<Link to="/admin/create/product" className="nav-link text-success">
							Create Product
						</Link>
					</li>
					<li className="list-group-item">
						<Link to="/admin/products" className="nav-link text-success">
							Manage Products
						</Link>
					</li>
					<li className="list-group-item">
						<Link to="/admin/orders" className="nav-link text-success">
							Manage Orders
						</Link>
					</li>
				</ul>
			</div>
		);
	};

	const adminRightSide = () => {
		return (
			<div className="card mb-4">
				<h4 className="card-header">Admin Information</h4>
				<ul className="list-group">
					<li className="list-group-item">
						<span className="badge badge-success mr-2 p-2">Firstname:</span>{" "}
						{firstname}
					</li>
					<li className="list-group-item">
						<span className="badge badge-success mr-2 p-2">Lastname:</span>{" "}
						{lastname}
					</li>
					<li className="list-group-item">
						<span className="badge badge-success mr-2 p-2">Email:</span> {email}
					</li>
                    <li className="list-group-item">
						<span className="badge badge-danger p-2">Admin Area</span>
					</li>
				</ul>
			</div>
		);
	};

	return (
		<Base
			title="AdminDashBoard page"
			description="Manage all of your products here"
			className="container bg-fancy p-4"
		>
			<div className="row">
				<div className="col-3">{adminLeftSide()}</div>
				<div className="col-9">{adminRightSide()}</div>
			</div>
		</Base>
	);
};

export default AdminDashBoard;
