export default class RecipeCard {
	constructor(data) {
		this.name = data.name;
		this.id = data.id;
		this.time = data.time;
		this.description = data.description;
		this.ingredients = data.ingredients;
	}

	renderIngredients() {
		return this.ingredients
			.map((ingredient) => {
				if (ingredient.quantity == null) {
					return `
					<li class="recipe__ingredient">
						<span class="ingredient__name">${ingredient.ingredient}</span>
					</li>`;
				}
				if (ingredient.unit == null) {
					return `
				<li class="recipe__ingredient">
					<span class="ingredient__name">${ingredient.ingredient}</span>
					<span class="ingredient__quantity">: ${ingredient.quantity} </span>
				</li>`;
				} else {
					return `
					<li class="recipe__ingredient">
						<span class="ingredient__name">${ingredient.ingredient}</span>
						<span class="ingredient__quantity">: ${ingredient.quantity} </span>
						<span class="ingredient__unit">${ingredient.unit}</span>
					</li>`;
				}
			})
			.join("");
	}

	render() {
		return `
		<article class="recipe__card" data-id="${this.id}">
      <div class="recipe__picture">
      </div>
			<div class="recipe__info">
				<div class="recipe__header">
					<h2 class="recipe__name">${this.name}</h2>
					<div class="recipe__time">
						<img src="./img/clock_icon.svg" class="time__icon" alt="clock icon">
						<div class="time__number">${this.time} min</div>
					</div>
				</div>
				<div class="recipe__body">
					<ul class="recipe__ingredients">${this.renderIngredients()}</ul>
					<p class="recipe__description">${this.description}</p>
				</div>
			</div>
    </article>`;
	}
}
