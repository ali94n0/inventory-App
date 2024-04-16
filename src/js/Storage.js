// const categories = [
// 	{
// 		id: 1,
// 		title: "frontend",
// 		description: "web dev",
// 		createdAt: "2022-04-14T16:18:16.746Z",
// 	},
// 	{
// 		id: 2,
// 		title: "backend",
// 		description: "web dev back",
// 		createdAt: "2023-04-14T16:18:16.746Z",
// 	},
// ];

class Storage {
	// get all categories
	static getAllCategories() {
		const savedCategories =
			JSON.parse(localStorage.getItem("categories")) || [];
		// earliest sort
		const sortedCategories = savedCategories.sort(
			(a, b) => new Date(b.createdAt) - new Date(a.createdAt),
		);
		return sortedCategories;
	}

	// create, edit and save category
	static saveCategory(category) {
		const savedCategories = Storage.getAllCategories();
		const existedCategory = savedCategories.find(
			(item) => item.id === category.id,
		);

		if (existedCategory) {
			// edit category
			existedCategory.title = category.title;
			existedCategory.description = category.description;
		} else {
			// create new category
			const newCategory = {
				...category,
				id: new Date().getTime(),
				createdAt: new Date().toISOString(),
			};
			savedCategories.push(newCategory);
			// saved categoris
			localStorage.setItem("categories", JSON.stringify(savedCategories));
		}
	}

	// get all products
	static getAllProducts(option = "latest") {
		const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
		if (option === "earliest") {
			const earliest = savedProducts.sort(
				(a, b) => new Date(a.createdAt) - new Date(b.createdAt),
			);
			return earliest;
		} else if (option === "latest") {
			const latest = savedProducts.sort(
				(a, b) => new Date(b.createdAt) - new Date(a.createdAt),
			);
			return latest;
		}
	}

	// create, edit and save product
	static saveProduct(product) {
		const savedProducts = Storage.getAllProducts();
		const existedProduct = savedProducts.find((item) => item.id === product.id);

		if (existedProduct) {
			// edit product
			existedProduct.title = product.title;
			existedProduct.quantity = product.quantity;
			existedProduct.category = product.category;
		} else {
			// create new product
			const newProduct = {
				...product,
				id: new Date().getTime(),
				createdAt: new Date().toISOString(),
			};
			savedProducts.push(newProduct);
			localStorage.setItem("products", JSON.stringify(savedProducts));
		}
	}

	// remove products
	static deleteProduct(id) {
		const allProducts = this.getAllProducts();
		const updatedProducts = allProducts.filter((item) => item.id !== +id);
		localStorage.setItem("products", JSON.stringify(updatedProducts));
	}
}

export default Storage;
