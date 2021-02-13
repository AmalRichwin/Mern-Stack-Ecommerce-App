import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { createCategory } from "./helper/adminapicall";

function AddCategory() {
	const [name, setName] = useState("");
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	const { user, token } = isAuthenticated();

	const goBack = () => (
		<div className="mt-5">
			<Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
				Admin Home
			</Link>
		</div>
	);

	const handleChange = (e) => {
		setError("");
		setName(e.target.value);
	};

	const onSumbit = (e) => {
		e.preventDefault();
		setError("");
		setSuccess(false);

		// backend request
		createCategory(user._id, token, { name })
		.then(data => {
				if(data.error){
					setError(true)
				} else{
					setError(false)
					setSuccess(true)
					setName("")
				}
		})
	};

	const successMessage = () => {
		if (success) {
			return <h4 className="text-success">Category created successfully</h4> 
		}
	}

	const warningMessage = () => {
		if (error) {
			return <h4 className="text-success">Failed to create category</h4> 
		}
	}

	const myCategoryForm = () => (
		<form>
			<div className="form-group">
				<p className="lead">Enter the Category</p>
				<input
					type="text"
					className="form-control my-3"
					onChange={handleChange}
					autoFocus
					required
					placeholder="For Ex. Summer"
				/>
				<button onClick={onSumbit} className="btn btn-outline-info">
					Create Category
				</button>
			</div>
		</form>
	);

	return (
		<Base
			title="Create a new category here"
			description="Add a new category for new tshirts"
			className="container bg-info p-4"
		>
			<div className="row bg-white rounded">
				<div className="col-md-8 offset-md-2">
					{successMessage()}
					{warningMessage()}
					{myCategoryForm()}
					{goBack()}
				</div>
			</div>
		</Base>
	);
}

export default AddCategory;
