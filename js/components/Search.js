export default class Search {

	workingSearch(){
		document.addEventListener("submit", (e) => {
			if (e.target.dataset.trigger === "form") {
				e.preventDefault();
			}
		});
	}

	render() {
		return `
		<form data-trigger="form">
		<div class="search">
			<input type="search" class="search__input" placeholder="Rechercher un ingrédient, appareil, ustensiles ou une recette" name="search">
			<input type="image" name="submit" class="search__submit" src="img/search_icon.svg" alt="search">
		</div>
		</form>`;
	}
}