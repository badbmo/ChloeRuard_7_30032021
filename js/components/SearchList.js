export default class SearchList {
	constructor(data) {
		this.data = data;
		this.uniqueArrayUstensil();
		this.uniqueArrayAppliance();
		this.uniqueArrayIngredient();
	}

	//create unique array from data

	uniqueArrayUstensil() {
		const arrayUstensils = this.data.map((recipe) => {
			return recipe.ustensils;
		});
		const arrayUstensilsLw = arrayUstensils.flat().map((ustensil) => ustensil.toLowerCase());
		return (this.setUstensils = [...new Set(arrayUstensilsLw)]);
	}

	uniqueArrayAppliance() {
		const arrayAppliances = this.data.map((recipe) => {
			return recipe.appliance.toLowerCase();
		});
		return (this.setAppliances = [...new Set(arrayAppliances)]);
	}

	uniqueArrayIngredient() {
		const arrayIngredients = this.data.map((recipe) => {
			return recipe.ingredients.map((ingredient) => {
				return ingredient.ingredient;
			});
		});
		const arrayIngredientsLw = arrayIngredients.flat().map((ingredient) => ingredient.toLowerCase());
		return (this.setIngredients = [...new Set(arrayIngredientsLw)]);
	}

	//render

	render(nameEN) {
		if (nameEN == "ingredients") {
			return this.setIngredients
				.map((ingredient) => {
					return `
					<li class="searchButton__result searchButton__result-${nameEN}" data-trigger="result" data-type="${nameEN}">
						${ingredient}
					</li>`;
				})
				.join("");
		}
		if (nameEN == "appliance") {
			return this.setAppliances
				.map((appliance) => {
					return `
					<li class="searchButton__result searchButton__result-${nameEN}" data-trigger="result" data-type="${nameEN}">
						${appliance}
					</li>`;
				})
				.join("");
		}
		if (nameEN == "ustensils") {
			return this.setUstensils
				.map((ustensil) => {
					return `
					<li class="searchButton__result searchButton__result-${nameEN}" data-trigger="result" data-type="${nameEN}">
						${ustensil}
					</li>`;
				})
				.join("");
		}
	}
}
