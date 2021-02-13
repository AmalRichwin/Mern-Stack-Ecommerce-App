import React, { Component } from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";

class Notify extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return ReactDOM.createPortal(
			<div>
				<ToastContainer />
			</div>
		);
	}
}

export default Notify;
