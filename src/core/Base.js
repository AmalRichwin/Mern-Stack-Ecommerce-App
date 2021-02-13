import React from "react";
import Menu from "./Menu";

const Base = ({
	title,
	description = "My desription",
	className = "bg-black text-white p-4",
	children,
}) => (
	<div>
		<Menu />
		<div className="container-fluid min-vh-100">
			{title  ? (
				<div className="jumbotron bg-black text-white text-center">
					<h2 className="display-4">{title}</h2>
					<p className="lead">{description}</p>
				</div>
			) : null}
			<div className={className}>{children}</div>
		</div>
		<footer className="footer bg-black mt-auto py-3">
			<div className="container-fluid bg-orange text-dark text-center py-3">
				<h5>If you got any questions, feel free to reach out!</h5>
				<button className="btn btn-info btn-md">Contact Us</button>
			</div>
			<div className="container">
				<span className="text-muted">
					An Amazing <span className="text-white">T-SHIRT</span> STORE
				</span>
			</div>
		</footer>
	</div>
);

export default Base;
