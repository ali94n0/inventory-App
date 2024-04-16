import Storage from "./Storage.js";

const productTitle = document.querySelector("#product-title");
const productQuantity = document.querySelector("#product-quantity");
const productCategory = document.querySelector("#product-category");
const addProductBtn = document.querySelector("#add-product-btn");
const productsList = document.getElementById("products-list");
const selectSort = document.querySelector("#sort-products");
const searchInput = document.querySelector("#search-products");
const totalProducts = document.querySelector("#total-products");
const productToggleBtn = document.querySelector("#product-toggle");
const productSection = document.querySelector("#product-section");
const cancelProductBtn = document.querySelector("#cancel-product");

class ProductView {
	constructor() {
		this.products = [];

		addProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
		selectSort.addEventListener("change", (e) => this.sortProducts(e));
		searchInput.addEventListener("input", () => this.searchProduct());
		productToggleBtn.addEventListener("click", (e) => this.toggleProduct(e));
		cancelProductBtn.addEventListener("click", (e) => this.cancelProduct(e));
	}

	addNewProduct(e) {
		e.preventDefault();
		const newProduct = {
			title: productTitle.value,
			quantity: productQuantity.value,
			category: productCategory.value,
		};
		if (
			!newProduct.title ||
			!newProduct.quantity ||
			newProduct.category === "select a category"
		) {
			alert("title ,quantity & category is require");
			return;
		}
		Storage.saveProduct(newProduct);
		this.products = Storage.getAllProducts();
		this.createProductsList(this.products);
		productTitle.value = "";
		productQuantity.value = "";
		productCategory.value = "";
	}

	setApp() {
		this.products = Storage.getAllProducts();
		this.updateTotalQuantity();
	}

	createProductsList(products) {
		let result = "";
		products.forEach((item) => {
			const allCategories = Storage.getAllCategories();
			const selectedCategory = allCategories.find(
				(c) => c.id === +item.category,
			);

			result += `<div class="flex items-center justify-between p-2 border-b border-slate-600">
                    <span class="flex flex-1 text-slate-400">${
											item.title
										}</span>
                    <div class="flex items-center gap-x-4">
                        <span class="text-sm text-slate-600">${new Date(
													item.createdAt,
												).toLocaleDateString("fa-ir")}</span>
                        <span class="text-sm text-slate-500 border border-slate-500 rounded-full py-0.5 px-2">${
													selectedCategory.title
												}</span>
                                                <span id="total-products" class="bg-slate-500 text-slate-300 border border-slate-300 rounded-full flex items-center justify-center py-0.5 px-1 text-sm ">${+item.quantity}</span>
                        <button id="delete-product" class="text-sm text-rose-400 border border-rose-400 rounded-full py-0.5 px-2" data-id=${
													item.id
												}>Delete</button>
                    </div>
                </div>`;
		});
		productsList.innerHTML = result;
		this.updateTotalQuantity();
		const deleteBtns = document.querySelectorAll("#delete-product");
		deleteBtns.forEach((btn) => {
			btn.addEventListener("click", (e) => this.deleteProduct(e));
		});
	}
	sortProducts(e) {
		e.preventDefault();
		this.products = Storage.getAllProducts(selectSort.value);
		this.createProductsList(this.products);
	}
	searchProduct() {
		const allProducts = this.products;
		const searchValue = searchInput.value.trim().toLowerCase();
		const searchedProduct = allProducts.filter((item) =>
			item.title.toLowerCase().includes(searchValue),
		);
		this.createProductsList(searchedProduct);
	}
	deleteProduct(e) {
		e.preventDefault();
		const productId = e.target.dataset.id;
		Storage.deleteProduct(productId);
		this.products = Storage.getAllProducts();
		this.createProductsList(this.products);
	}
	updateTotalQuantity() {
		totalProducts.textContent = Storage.getAllProducts().reduce(
			(acc, cur) => +cur.quantity + acc,
			0,
		);
	}
	toggleProduct(e) {
		e.preventDefault();
		productToggleBtn.classList.add("hidden");
		productSection.classList.remove("hidden");
	}
	cancelProduct(e) {
		e.preventDefault();
		productToggleBtn.classList.remove("hidden");
		productSection.classList.add("hidden");
	}
}

export default new ProductView();
