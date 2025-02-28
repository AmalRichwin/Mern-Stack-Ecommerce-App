import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";

import { signin, authenticate, isAuthenticated } from "../auth/helper/index";

const Signin = () => {
	const [values, setValues] = useState({
		email: "amalrichwin@mutant.com",
		password: "testing321123",
		error: "",
		loading: false,
		didRedirect: false,
	});

	const { email, password, didRedirect, error, loading } = values;
	const { user } = isAuthenticated();

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, error: false, loading: true });
		signin({ email, password })
			.then((data) => {
				if (data.error) {
					setValues({
						email: "",
						password: "",
						error: data.error,
						loading: false,
					});
				} else {
					authenticate(data, () => {
						setValues({
							...values,
							didRedirect: true,
						});
					});
				}
			})
			.catch(() => console.log("Signin request failed"));
	};

	const performRedirect = () => {
		// TODO: for redirect come back here
		if (didRedirect) {
			if (user && user.role === 1) {
				return <Redirect to="/admin/dashboard" />;
			} else {
				return <Redirect to="/user/dashboard" />;
			}
		}
		if (isAuthenticated()) {
			return <Redirect to="/signin" />;
		}
	};

	const loadingMessage = () => {
		return (
			loading && (
				<div className="alert alert-info">
					<h2>loading...</h2>
				</div>
			)
		);
	};

	const errorMessage = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<div
						className="alert alert-danger"
						style={{ display: error ? "" : "none" }}
					>
						{error}
					</div>
				</div>
			</div>
		);
	};

	const signInForm = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<form>
						<div className="form-group">
							<label className="text-light">Email</label>
							<input
								className="form-control"
								type="email"
								value={email}
								onChange={handleChange("email")}
							/>
						</div>

						<div className="form-group">
							<label className="text-light">Password</label>
							<input
								className="form-control"
								type="password"
								value={password}
								onChange={handleChange("password")}
							/>
						</div>
						<button onClick={onSubmit} className="btn btn-success btn-block">
							Submit
						</button>
					</form>
				</div>
			</div>
		);
	};

	return (
		<Base title="Sign In page" description="A page for user to sign in!">
			{loadingMessage()}
			{errorMessage()}
			{signInForm()}
			{performRedirect()}
			<p className="text-white text-center">{JSON.stringify(values)}</p>
		</Base>
	);
};

export default Signin;
