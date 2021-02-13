import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";

const UserDashBoard = () => {
	const {
		user: { firstname, lastname, email },
	} = isAuthenticated();

	// const capitalize = (s) => {
	// 	if (typeof s !== "string") return "";
	// 	return s.charAt(0).toUpperCase() + s.slice(1);
	// };
	const userLeftSide = () => {
		return (
			<div className="card">
				<h4 className="card-header bg-dark text-white">your Account</h4>
				<ul className="list-group">
					<li className="list-group-item">
						<Link to="/user/orders" className="nav-link text-success">
							Yours Orders
						</Link>
					</li>
					<li className="list-group-item">
						<Link to="/user/wishlist" className="nav-link text-success">
							Your Wishlist
						</Link>
					</li>
					<li className="list-group-item">
						<Link to="/user/returns" className="nav-link text-success">
							Returns
						</Link>
					</li>
				</ul>
			</div>
		);
	};

	const userRightSide = () => {
		return (
			<div className="card mb-4">
				<h4 className="card-header">User Information</h4>
				<ul className="list-group">
					<li className="list-group-item text-capitalize">
						<span className="badge badge-success mr-2 p-2">Firstname:</span>{" "}
						{firstname}
					</li>
					<li className="list-group-item text-capitalize">
						<span className="badge badge-success mr-2 p-2">Lastname:</span>{" "}
						{lastname}
					</li>
					<li className="list-group-item">
						<span className="badge badge-success mr-2 p-2">Email:</span> {email}
					</li>
					<li className="list-group-item">
						<span className="badge badge-danger p-2">update</span>
					</li>
				</ul>
			</div>
		);
	};

	return (
		<Base
			title="UserDashBoard page"
			description="Manage all of your products here"
			className="container bg-fancy p-4"
		>
			<div className="row">
				<div className="col-3">{userLeftSide()}</div>
				<div className="col-9">{userRightSide()}</div>
			</div>
		</Base>
	);
};

export default UserDashBoard;
