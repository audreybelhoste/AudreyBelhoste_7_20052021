const list = document.querySelector('#recipes');

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
	
		cardContainer.classList.add('col-md-12');
		cardContainer.classList.add('col-lg-6');
		cardContainer.classList.add('col-xl-4');
		cardContainer.classList.add('blocRecipe');
		card.classList.add('card');
		card.classList.add('mb-4');
		img.classList.add('card-img-top');
		cardBody.classList.add('bg-secondary');
		infos.classList.add('row');
		infos.classList.add('justify-content-between');
		title.classList.add('col-7');
		time.classList.add('col-4');
		time.classList.add('text-right');
		time.classList.add('font-weight-bold');
		time.classList.add('h2');
		time.classList.add('time');
		content.classList.add('row');
		content.classList.add('mt-2');
		ingredientsList.classList.add('col');
		descriptionContainer.classList.add('col');
		description.classList.add('description');
	
		cardContainer.setAttribute('idRecipe', recipes[i].name);
		img.src = 'img.svg';
		cardBody.classList.add('card-body');
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
}