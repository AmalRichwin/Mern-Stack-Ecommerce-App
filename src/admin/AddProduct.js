import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Base from "../core/Base";
import { getAllCategories, createProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const AddProduct = () => {
	const { user, token } = isAuthenticated();

	const [values, setValues] = useState({
		name: "",
		description: "",
		price: "",
		stock: "",
		photo: "",
		categories: [],
		category: "",
		loading: false,
		error: "",
		createdProduct: "",
		getaRedirect: false,
		formData: "",
	});

	const {
		name,
		description,
		price,
		stock,
		categories,
		category,
		loading,
		error,
		createdProduct,
		getaRedirect,
		formData,
	} = values;

	const performreDirect = () => {
		if (loading) {
			setTimeout(() => {
				return <Redirect to="/admin/dashboard"></Redirect>;
			}, 2000);
		}
	};

	const preload = () => {
		getAllCategories().then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({ ...values, categories: data, formData: new FormData() });
			}
		});
	};
	useEffect(() => {
		preload();
	}, []);

	const onSubmit = (e) => {
		e.preventDefault();
		console.log(values);
		setValues({ ...values, error: "", loading: true });
		console.log(formData);
		createProduct(user._id, token, formData).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					...values,
					name: "",
					description: "",
					price: "",
					photo: "",
					stock: "",
					success: true,
					loading: false,
					createdProduct: data.name,
				});
			}
		});
	};

	const handleChange = (name) => (event) => {
		const value = name === "photo" ? event.target.files[0] : event.target.value;
		formData.set(name, value);
		setValues({ ...values, [name]: value });
	};

	const successMessage = () => (
		<div
			className="alert alert-success mt-3"
			style={{ display: createdProduct ? "" : "none" }}
		>
			<h4>{createdProduct} created successfully</h4>
		</div>
	);

	const errorMessage = () => (
		<div
			className="alert alert-success mt-3"
			style={{ display: error ? "" : "none" }}
		>
			<h4>failed to create {createdProduct} product</h4>
		</div>
	);

	const createProductForm = () => (
		<form>
			<span>Post photo</span>
			<div className="form-group">
				<label className="btn btn-block btn-success">
					<input
						onChange={handleChange("photo")}
						type="file"
						name="photo"
						accept="image"
						placeholder="choose a file"
					/>
				</label>
			</div>
			<div className="form-group">
				<input
					onChange={handleChange("name")}
					name="photo"
					className="form-control"
					placeholder="Name"
					value={name}
				/>
			</div>
			<div className="form-group">
				<textarea
					onChange={handleChange("description")}
					name="photo"
					className="form-control"
					placeholder="Description"
					value={description}
				/>
			</div>
			<div className="form-group input-group mb-3">
				<div class="input-group-prepend">
					<span class="input-group-text fas fa-dollar-sign pt-2"></span>
				</div>
				<input
					onChange={handleChange("price")}
					type="number"
					className="form-control"
					placeholder="Price"
					value={price}
				/>
			</div>
			<div className="form-group">
				<select
					onChange={handleChange("category")}
					className="form-control"
					placeholder="Category"
				>
					<option value="select" defaultChecked>
						Select
					</option>
					{categories &&
						categories.map((category, index) => (
							<option key={index} value={category._id}>
								{category.name}
							</option>
						))}
				</select>
			</div>
			<div className="form-group">
				<input
					onChange={handleChange("stock")}
					type="number"
					className="form-control"
					placeholder="Quantity"
					value={stock}
				/>
			</div>

			<button
				type="submit"
				onClick={onSubmit}
				className="btn btn-outline-success mb-3"
			>
				Create Product
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
			<div className="row bg-dark text-white rounded">
				<div className="col-md-8 offset-md-2">
					{performreDirect()}
					{successMessage()}
					{errorMessage()}
					{createProductForm()}
				</div>
			</div>
		</Base>
	);
};

export default AddProduct;
