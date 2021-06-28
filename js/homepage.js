const list = document.querySelector('#recipes');
const ingredientList = document.querySelector('.ingredientList');
const applianceList = document.querySelector('.applianceList');
const ustensilList = document.querySelector('.ustensilList');
let allIngredients = [];
let allAppliances = [];
let allUstensils= [];

createDOM();

// Affichage des recettes
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
		cardBody.classList.add('bg-light');
		infos.classList.add('row', 'justify-content-between');
		title.classList.add('col-9');
		time.classList.add('col-3', 'text-right', 'font-weight-bold', 'h2', 'time', 'position-relative');
		content.classList.add('row', 'mt-2');
		ingredientsList.classList.add('col');
		descriptionContainer.classList.add('col');
		description.classList.add('description');
	
		cardContainer.setAttribute('nameRecipe', recipes[i].name);
		img.src = 'img/img.svg';
		cardBody.classList.add('card-body');
		cardBody.classList.add('rounded-bottom');
		title.textContent = recipes[i].name;
		time.textContent = recipes[i].time + ' min';
		description.textContent = recipes[i].description;
	
		const ingredients = recipes[i].ingredients;
		
		for(let j = 0; j < ingredients.length; j++){
	
			const ingredient = document.createElement('p');
	
			ingredient.innerHTML = '<span class="font-weight-bold">' + capitalizeFirstLetter(ingredients[j].ingredient);
			
			if(ingredients[j].quantity !== undefined){
				ingredient.innerHTML += ': </span>' + ingredients[j].quantity;
			} else {
				ingredient.innerHTML += '</span>'
			}
	
			if(ingredients[j].unit !== undefined){
				ingredient.innerHTML += ' ' + ingredients[j].unit;
			}
	
			ingredientsList.appendChild(ingredient);

			// Création de la liste de tous les ingrédients
			if(!allIngredients.includes(ingredients[j].ingredient.toLowerCase())){
				allIngredients.push(ingredients[j].ingredient.toLowerCase());
			}
		}

		// Création de la liste de tous les appareils
		if(!allAppliances.includes(recipes[i].appliance)){
			allAppliances.push(recipes[i].appliance.toLowerCase());
		}

		// Création de la liste de tous les ustensiles
		recipes[i].ustensils.forEach(function(ustensil){
			if(!allUstensils.includes(ustensil)){
				allUstensils.push(ustensil.toLowerCase());
			}
		})

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
	displayAppliances(allAppliances);
	displayUstensils(allUstensils);
}

// Affiche les ingrédients passés en paramètre
function displayIngredients(ingredients){

	const classListIngredient = 'btn-primary';
	if(ingredientList.hasChildNodes()){
		ingredientList.innerHTML = ' ';
		ingredientList.parentNode.classList.remove('col1');
		ingredientList.parentNode.classList.remove('col2');
	}

	// Gestion de l'affichage en fonction du nombre d'ingrédients à afficher
	switch(ingredients.length) {
		case 0 : 
			ingredientList.innerHTML = 'Aucun ingrédient';
			break; 

		case 1 : 
			ingredientList.parentNode.classList.add('col1');
			break;

		case 2 :
			ingredientList.parentNode.classList.add('col2');
			break;
	}

	for(let i = 0; i < ingredients.length; i++){
		
		const ingredientItem = document.createElement('li');
		const ingredientLink = document.createElement('a');
		ingredientLink.href = '#';
		ingredientLink.classList.add('dropdown-item-custom', 'ingredientItem');
		ingredientLink.textContent = capitalizeFirstLetter(ingredients[i]);
		ingredientList.appendChild(ingredientItem);
		ingredientItem.appendChild(ingredientLink);

		ingredientItem.addEventListener('click', function() {
			if(!searchTerms[1].includes(ingredientItem.textContent.toLowerCase())){
				searchTerms[1].push(ingredientItem.textContent.toLowerCase());
				displayTag(ingredientItem.textContent, searchTerms, classListIngredient);
				searchInData(searchTerms, recipes);
			}
		})
	}
}

// Affiche les appareils passés en paramètre
function displayAppliances(appliances){
	const classListAppliance = 'btn-secondary';
	if(applianceList.hasChildNodes()){
		applianceList.innerHTML = ' ';
		applianceList.parentNode.classList.remove('col1');
		applianceList.parentNode.classList.remove('col2');
	}

	// Gestion de l'affichage en fonction du nombre d'appareils à afficher
	switch(appliances.length) {
		case 0 : 
		applianceList.innerHTML = 'Aucun appareil';
			break; 

		case 1 : 
			applianceList.parentNode.classList.add('col1');
			break;

		case 2 :
			applianceList.parentNode.classList.add('col2');
			break;
	}

	for(let i = 0; i < appliances.length; i++){
		
		const applianceItem = document.createElement('li');
		const applianceLink = document.createElement('a');
		applianceLink.href = '#';
		applianceLink.classList.add('dropdown-item-custom', 'applianceItem');
		applianceLink.textContent = capitalizeFirstLetter(appliances[i]);
		applianceList.appendChild(applianceItem);
		applianceItem.appendChild(applianceLink);

		applianceItem.addEventListener('click', function() {
			if(!searchTerms[2].includes(applianceItem.textContent.toLowerCase())){
				searchTerms[2].push(applianceItem.textContent.toLowerCase());
				displayTag(applianceItem.textContent, searchTerms, classListAppliance);
				searchInData(searchTerms, recipes);
			}
		})
	}
}

// Affiche les ustensiles passés en paramètre
function displayUstensils(ustensils){
	const classListUstensil = 'btn-info';
	if(ustensilList.hasChildNodes()){
		ustensilList.innerHTML = ' ';
		ustensilList.parentNode.classList.remove('col1');
		ustensilList.parentNode.classList.remove('col2');
	}

	// Gestion de l'affichage en fonction du nombre d'ustensiles à afficher
	switch(ustensils.length) {
		case 0 : 
		ustensilList.innerHTML = 'Aucun appareil';
			break; 

		case 1 : 
			ustensilList.parentNode.classList.add('col1');
			break;

		case 2 :
			ustensilList.parentNode.classList.add('col2');
			break;
	}

	for(let i = 0; i < ustensils.length; i++){
		
		const ustensilItem = document.createElement('li');
		const ustensilLink = document.createElement('a');
		ustensilLink.href = '#';
		ustensilLink.classList.add('dropdown-item-custom', 'ustensilItem');
		ustensilLink.textContent = capitalizeFirstLetter(ustensils[i]);
		ustensilList.appendChild(ustensilItem);
		ustensilItem.appendChild(ustensilLink);

		ustensilItem.addEventListener('click', function() {
			if(!searchTerms[3].includes(ustensilItem.textContent.toLowerCase())){
				searchTerms[3].push(ustensilItem.textContent.toLowerCase());
				displayTag(ustensilItem.textContent, searchTerms, classListUstensil);
				searchInData(searchTerms, recipes);
			}
		})
	}
}

// Permet d'afficher en élément avec la première lettre en majuscule
function capitalizeFirstLetter(element){
	return (element+'').charAt(0).toUpperCase()+element.substr(1);
}