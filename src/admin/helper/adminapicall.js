import { API } from "../../backend";

// category calls
// CREATE: A product
export const createCategory = (userId, token, category) => {
	return fetch(`${API}/category/create/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(category),
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => console.log(error));
};

// get all categories
export const getAllCategories = () => {
	return fetch(`${API}/categories`, {
		method: "GET",
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

// get a category
export const getCategory = (categoryId	) => {
	return fetch(`${API}/category/${categoryId}`, {
		method: "GET",
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
	// /category:categoryId
};

//UPDATE:
export const updateCategory = (categoryId, userId, token, category) => {
	return fetch(`${API}/category/${categoryId}/${userId}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(category)
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

// DELETE:
export const deleteCategory = (categoryId, userId, token) => {
	return fetch(`${API}/category/${categoryId}/${userId}`, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

// product calls
export const createProduct = (userId, token, product) => {
	return fetch(`${API}/product/create/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: product,
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

// get all products
export const getAllProducts = () => {
	return fetch(`${API}/products`, {
		method: "GET",
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

// get a product
export const getProduct = (productId) => {
	return fetch(`${API}/product/${productId}`, {
		method: "GET",
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

// UPDATE:  a product
export const updateProduct = (productId, userId, token, product) => {
	return fetch(`${API}/product/${productId}/${userId}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: product,
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

// DELETE: a product
export const deleteProduct = (productId, userId, token) => {
	return fetch(`${API}/product/${productId}/${userId}`, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

// TODO: DEBUG: HACK: UPDATE: NOTE: CREATE: DELETE:
