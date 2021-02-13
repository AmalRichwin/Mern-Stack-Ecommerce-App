import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Base from "../core/Base";
import { getCategory, updateCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const UpdateCategory = ({ match }) => {
	const { user, token } = isAuthenticated();

	const [name, setName] = useState("");
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	console.log(success);

	const preload = (categoryId) => {
		getCategory(categoryId).then((data) => {
			if (data.error) {
				setError(data.error);
			}
			setName(data.name);
		});
	};

	useEffect(() => {
		preload(match.params.categoryId);
	}, []);

	const onSubmit = (e) => {
		e.preventDefault();
		setError("");
		updateCategory(match.params.categoryId, user._id, token, { name }).then(
			(data) => {
				if (data.error) {
					setError(data.error);
				} else {
					setError(false);
					setSuccess(true);
				}
			}
		);
	};

	const performRedirect = () => {
		if (success) {
			setTimeout(() => {
                <Redirect to="/admin/categories" exact/>;
                setSuccess(false)
			}, 2000);
		}
	};

	const handleChange = (name) => (event) => {
		setName(event.target.value);
	};

	const successMessage = () => (
		<div
			className="alert alert-success mt-3"
			style={{ display: success ? "" : "none" }}
		>
			<h4>{name} updated successfully</h4>
		</div>
	);

	const errorMessage = () => (
		<div
			className="alert alert-success mt-3"
			style={{ display: error ? "" : "none" }}
		>
			<h4>failed to update {name} category</h4>
		</div>
	);

	const updateProductForm = () => (
		<form>
			<div className="form-group">
				<input
					onChange={handleChange("name")}
					name="name"
					className="form-control mt-4  mb-auto"
					placeholder="Category"
					value={name}
				/>
			</div>
			<button
				type="submit"
				onClick={onSubmit}
				className="btn btn-outline-danger mb-3"
			>
				Update Category
			</button>
		</form>
	);

	return (
		<Base
			title="Add a product here!"
			description="Welcome to create product section"
			className="container bg-info p-4"
		>
			<Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
				Admin Home
			</Link>
			<Link to="/admin/categories" className="btn btn-md btn-warning ml-3 mb-3">
				Back
			</Link>
			<div className="row bg-dark text-white rounded">
				<div className="col-md-8 offset-md-2">
					{performRedirect()}
					{successMessage()}
					{errorMessage()}
					{updateProductForm()}
				</div>
			</div>
		</Base>
	);
};

export default UpdateCategory;
