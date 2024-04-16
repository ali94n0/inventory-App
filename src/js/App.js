import CategoryView from "./CategoryView.js";
import ProductView from "./ProductView.js";

document.addEventListener("DOMContentLoaded", () => {
	CategoryView.setApp();
	CategoryView.createCategoriesListOption();
	ProductView.setApp();
	ProductView.createProductsList(ProductView.products);
});
