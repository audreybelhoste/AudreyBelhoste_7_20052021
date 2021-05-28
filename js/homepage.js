const list = document.querySelector('#recipes');
let allIngredients = [];

createDOM();

function createDOM(){

	for(let i = 0; i < recipes.length; i++){
		const cardContainer = document.createElement('div');
		const card = document.createElement('div');
		const img = document.createElement('img');
		const cardBody = document.createElement('div');
		const infos = document.createElement('div');
		const title = document.createElement('h2');
		const time = document.createElement('p');
		const content = document.createElement('div');
		const ingredientsList = document.createElement('div');
		const descriptionContainer = document.createElement('div');
		const description = document.createElement('p');
	
		cardContainer.classList.add('col-md-12', 'col-lg-6', 'col-xl-4', 'blocRecipe');
		card.classList.add('card', 'border-0', 'mb-4');
		img.classList.add('card-img-top');
		cardBody.classList.add('bg-secondary');
		infos.classList.add('row', 'justify-content-between');
		title.classList.add('col-9');
		time.classList.add('col-3', 'text-right', 'font-weight-bold', 'h2', 'time', 'position-relative');
		content.classList.add('row', 'mt-2');
		ingredientsList.classList.add('col');
		descriptionContainer.classList.add('col');
		description.classList.add('description');
	
		cardContainer.setAttribute('nameRecipe', recipes[i].name);
		img.src = 'img.svg';
		cardBody.classList.add('card-body');
		cardBody.classList.add('rounded-bottom');
		title.textContent = recipes[i].name;
		time.textContent = recipes[i].time + ' min';
		description.textContent = recipes[i].description;
	
		const ingredients = recipes[i].ingredients;
		
		for(let j = 0; j < ingredients.length; j++){
	
			const ingredient = document.createElement('p');
	
			ingredient.innerHTML = '<span class="font-weight-bold">' + ingredients[j].ingredient;
			
			if(ingredients[j].quantity !== undefined){
				ingredient.innerHTML += ': </span>' + ingredients[j].quantity;
			} else {
				ingredient.innerHTML += '</span>'
			}
	
			if(ingredients[j].unit !== undefined){
				ingredient.innerHTML += ' ' + ingredients[j].unit;
			}
	
			ingredientsList.appendChild(ingredient);

			if(!allIngredients.includes(ingredients[j].ingredient)){
				allIngredients.push(ingredients[j].ingredient);
			}
		}

		list.appendChild(cardContainer);
		cardContainer.appendChild(card);
		card.appendChild(img);
		card.appendChild(cardBody);
		cardBody.appendChild(infos);
		infos.appendChild(title);
		infos.appendChild(time);
		cardBody.appendChild(content);
		content.appendChild(ingredientsList);
		content.appendChild(descriptionContainer);
		descriptionContainer.appendChild(description);
	}

	displayIngredients(allIngredients);
}

function displayIngredients(allIngredients){
	const ingredientList = document.querySelector('.ingredientList');
	for(let i = 0; i < allIngredients.length; i++){
		const ingredientItem = document.createElement('li');
		const ingredientLink = document.createElement('a');
		ingredientLink.href = '#';
		ingredientLink.classList.add('dropdown-item', 'ingredientItem');
		ingredientLink.textContent = allIngredients[i];
		ingredientList.appendChild(ingredientItem);
		ingredientItem.appendChild(ingredientLink);
	}
}