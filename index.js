import Header from "./js/components/Header.js";
import Search from "./js/components/Search.js";
import RecipeCard from "./js/components/RecipeCard.js";
import SearchButton from "./js/components/SearchButton.js";
import SearchList from "./js/components/SearchList.js";
import Tag from "./js/components/Tag.js";
import recipes from "./recipes.js";

class Index {
	constructor() {
		this.recipes = recipes;
		this.query = "";
		this.displayHeader();
		this.displaySearch();
		this.displayRecipeCard(this.recipes);
		this.displayButtons();
		this.displayList(this.recipes);
		this.displayTag();
		this.removeTag();
		this.sortWithSearchBar();
	}

	displayHeader() {
		const headerContainer = document.querySelector(".headerContainer");
		const header = new Header();
		headerContainer.innerHTML += header.render();
	}

	displaySearch() {
		const searchContainer = document.querySelector(".searchContainer");
		const search = new Search();
		searchContainer.innerHTML += search.render();
		search.workingSearch();
	}

	displayRecipeCard(recipes) {
		const cardsContainer = document.querySelector(".cardsContainer");
		const cards = recipes.map((recipe) => {
			const recipeCard = new RecipeCard(recipe);
			return recipeCard.render();
		});
		//for each recipe, create a new card (array), then .join("") to string
		cardsContainer.innerHTML = cards.join("");
	}

	displayButtons() {
		const searchButtonContainer = document.querySelector(".searchButtonContainer");
		const searchButton = new SearchButton(recipes);
		searchButtonContainer.innerHTML += searchButton.render("Ingredients", "ingredients");
		searchButtonContainer.innerHTML += searchButton.render("Appareil ", "appliance");
		searchButtonContainer.innerHTML += searchButton.render("Ustensiles", "ustensils");
		searchButton.workingSearchButton();
	}

	displayList(recipes) {
		this.searchList = new SearchList(recipes);
		const resultContainerI = document.querySelector(".searchButton__results-ingredients");
		resultContainerI.innerHTML = this.searchList.render("ingredients");
		const resultContainerA = document.querySelector(".searchButton__results-appliance");
		resultContainerA.innerHTML = this.searchList.render("appliance");
		const resultContainerU = document.querySelector(".searchButton__results-ustensils");
		resultContainerU.innerHTML = this.searchList.render("ustensils");
	}

	displayTag() {
		const tagContainer = document.querySelector(".tagContainer");
		document.addEventListener("click", (e) => {
			if (e.target.dataset.trigger === "result") {
				const type = e.target.dataset.type;
				const content = e.target.textContent.trim();
				const tag = new Tag(type, content);
				// type = define class, content = define data-id and content (see Tag.js)
				tagContainer.innerHTML += tag.render();
				this.sortRecipes();
				this.emptyInputs();
			}
		});
	}

	emptyInputs() {
		const buttonInputs = document.querySelectorAll(".searchButton__input");
		buttonInputs.forEach((input) => (input.value = ""));
	}

	removeTag() {
		document.addEventListener("click", (e) => {
			//delete tag if click on the div containing icon and span (text)
			if (e.target.dataset.trigger === "tag") {
				e.target.remove();
				this.sortRecipes();
			}
			//delete tag if click on icon and span (text)
			if (e.target.dataset.trigger === "tagDelete" || e.target.dataset.trigger === "tagContent") {
				e.target.parentNode.remove();
				this.sortRecipes();
			}
		});
	}

	sortRecipes() {
		// // -- Sort with SearchBar V1 --
		// //search in name, description or ingredient if recipe contains searchstring from workingSearchBar
		// this.filteredRecipes = this.recipes.filter((recipe) => {
		// 	if (
		// 		recipe.name.toLowerCase().includes(this.query) ||
		// 		recipe.description.toLowerCase().includes(this.query) ||
		// 		recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(this.query))
		// 	) {
		// 		return true;
		// 	}
		// });

		// -- Sort with SearchBar V2 --
		this.filteredRecipes = [];
		//search in name, description or ingredient if recipe contains searchstring from workingSearchBar
		for (let i = 0; i < this.recipes.length; i++) {
			if (
				this.recipes[i].name.toLowerCase().includes(this.query) ||
				this.recipes[i].description.toLowerCase().includes(this.query) ||
				this.recipes[i].ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(this.query))
			) {
				this.filteredRecipes.push(this.recipes[i]);
			}
		}
		this.filteredRecipes = [...new Set(this.filteredRecipes)];

		// -- Sort with Tags --
		const tags = document.querySelectorAll(".tag");
		tags.forEach((tag) => {
			const contentTag = tag.dataset.id;
			// if tag ingredient, filter all the recipes by this ingredient. return filteredRecipes filtered
			if (tag.classList.contains("tag-ingredients")) {
				this.filteredRecipes = this.filteredRecipes.filter((recipe) => {
					return recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(contentTag));
				});
			}
			// if tag appliance, filter all the recipes by this apliance. return filteredRecipes filtered
			if (tag.classList.contains("tag-appliance")) {
				this.filteredRecipes = this.filteredRecipes.filter((recipe) => {
					return recipe.appliance.toLowerCase().includes(contentTag);
				});
			}
			// if tag ustensils, filter all the recipes by this ustensils. return filteredRecipes filtered
			if (tag.classList.contains("tag-ustensils")) {
				this.filteredRecipes = this.filteredRecipes.filter((recipe) => {
					return recipe.ustensils.some((ustensil) => ustensil.toLowerCase().includes(contentTag));
				});
			}
		});
		this.displayRecipeCard(this.filteredRecipes);
		this.displayList(this.filteredRecipes);
		this.checkIfResultInTag();
		this.noResultMessage();
	}

	//if <li> clicked and transformed to tag, remove the <li> selected from the list of results (= a tag is unique)
	//adding a class instead of display: none to avoid conflict with searchResults() in SearchButton.js
	checkIfResultInTag() {
		const tags = [...document.querySelectorAll(".tag")];
		const tagsArray = tags.map((tag) => {
			return tag.textContent.trim();
		});
		const results = document.querySelectorAll(".searchButton__result");
		results.forEach((result) => {
			if (tagsArray.includes(result.textContent.trim())) {
				result.classList.add("tagged");
			}
		});
	}

	// display message for "no result". remove message "no result" if results.
	noResultMessage() {
		const messageContainer = document.querySelector(".messageContainer");
		if (this.filteredRecipes.length == 0) {
			messageContainer.innerHTML = `
			<img src="./img/no_result.png" class="empty__image">
			<span class="empty__message">Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc.</span>`;
		} else {
			messageContainer.innerHTML = "";
		}
	}

	//search with searchbar with at least 3 letters. Define this query for this.sortRecipes
	sortWithSearchBar() {
		const searchInput = document.querySelector(".search__input");
		searchInput.addEventListener("keyup", (e) => {
			this.searchString = e.target.value.toLowerCase().trim();
			if (this.searchString.length > 2) {
				this.query = this.searchString;
				this.sortRecipes();
			}
			if (this.searchString.length <= 2) {
				this.query = "";
				this.sortRecipes();
			}
		});
	}
}

new Index();
