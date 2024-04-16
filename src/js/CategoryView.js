import Storage from "./Storage.js";

// get all needed elements
const addNewCategoryBtn = document.querySelector("#add-category-btn");
const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-description");
const categoryToggleBtn = document.querySelector("#category-toggle");
const categorySection = document.querySelector("#category-section");
const cancelCategoryBtn = document.querySelector("#cancel-category");

class CategoryView {
	constructor() {
		this.categories = [];
		addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
		categoryToggleBtn.addEventListener("click", (e) => this.toggleCategory(e));
		cancelCategoryBtn.addEventListener("click", (e) => this.cancelCategory(e));
	}
	// add new category
	addNewCategory(e) {
		e.preventDefault();
		const newCategory = {
			title: categoryTitle.value,
			description: categoryDescription.value,
		};

		if (!newCategory.title || !newCategory.description) {
			alert("title and description is require");
			return;
		}
		Storage.saveCategory(newCategory);
		this.categories = Storage.getAllCategories();
		this.createCategoriesListOption();
		categoryTitle.value = "";
		categoryDescription.value = "";
	}
	// get and show all categories
	setApp() {
		this.categories = Storage.getAllCategories();
	}
	// add and show category list in select option element
	createCategoriesListOption() {
		let result = `<option  >select a category</option>`;
		this.categories.forEach(
			(item) => (result += `<option value=${item.id}>${item.title}</option>`),
		);
		const categoriesOption = document.getElementById("product-category");
		categoriesOption.innerHTML = result;
	}
	toggleCategory(e) {
		e.preventDefault();
		categoryToggleBtn.classList.add("hidden");
		categorySection.classList.remove("hidden");
	}
	cancelCategory(e) {
		e.preventDefault();
		categoryToggleBtn.classList.remove("hidden");
		categorySection.classList.add("hidden");
	}
}
export default new CategoryView();
