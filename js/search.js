const searchBar = document.getElementById('searchBar');
const blocsRecipe = document.querySelectorAll('.blocRecipe');
const applianceItem = document.querySelectorAll('.applianceItem');
const ustensilItem = document.querySelectorAll('.ustensilItem');
const dropdownTitle = document.querySelectorAll('.dropdownTitle');
const searchIngredient = document.getElementById('searchIngredient');
const tagList = document.getElementById('tagList');
const searchTag = document.querySelectorAll('.searchTag');
const btnGroup = document.querySelectorAll('.btn-group');

let filteredRecipes = [];
// barre de recherche
let searchTerms = [];
searchTerms[0] = '';
// tags ingrédients
searchTerms[1] = [];
// tags appareils
searchTerms[2] = [];
// tags ustensiles
searchTerms[3] = [];

let tags = [];

searchBar.addEventListener('keyup', function(){
	searchTerm = searchBar.value.toLowerCase(); 

	// La recherche contient plus de 2 caractères
	if(searchTerm.length > 2 || searchTerms[1].length > 0 || searchTerms[2].length > 0 || searchTerms[3].length > 0){
		// Après la première saisie et lorsqu'un nouveau caractère est ajouté
		if(searchTerm.length != 3 && searchTerm.length > searchTerms[0].length) {	
			searchTerms[0] = searchTerm.toLowerCase();
			// Permet de tester la vitesse de la recherche
			let start = performance.now();
			searchInData(searchTerms, filteredRecipes);
			let end =  performance.now();
			let diff = end - start;
			console.log(diff);
		} else {
			searchTerms[0] = searchTerm;
			// Permet de tester la vitesse de la recherche
			let start = performance.now();
			searchInData(searchTerms, recipes);
			let end = performance.now(); 
			let diff2 = end - start;
			console.log(diff2);
			
		}
	} else {
		searchTerms[0] = '';
		blocsRecipe.forEach(element => {
			element.classList.remove('d-none');
		});
		noResult.classList.add('invisible');
		displayIngredients(allIngredients);
		displayAppliances(allAppliances);
		displayUstensils(allUstensils);
	}
})

// Recherche par mot clé dans la liste d'ingrédients
searchIngredient.addEventListener('keyup', function(){
	searchInData(searchTerms, recipes);
	ingredients = [];
	document.querySelectorAll('.ingredientItem').forEach(element => {
		if (element.textContent.toLowerCase().includes(searchIngredient.value.toLowerCase()) ) {
			ingredients.push(element.textContent.toLowerCase());
		}
	});

	displayIngredients(ingredients);
})

// Recherche par mot clé dans la liste d'appareils
searchAppliance.addEventListener('keyup', function(){
	searchInData(searchTerms, recipes);
	appliances = [];
	document.querySelectorAll('.applianceItem').forEach(element => {
		if (element.textContent.toLowerCase().includes(searchAppliance.value.toLowerCase()) ) {
			appliances.push(element.textContent.toLowerCase());
		}
	});
	displayAppliances(appliances);
})

// Recherche par mot clé dans la liste d'ustensiles
searchUstensil.addEventListener('keyup', function(){
	searchInData(searchTerms, recipes);
	ustensils = [];
	document.querySelectorAll('.ustensilItem').forEach(element => {
		if (element.textContent.toLowerCase().includes(searchUstensil.value.toLowerCase()) ) {
			ustensils.push(element.textContent.toLowerCase());
		}
	});

	displayUstensils(ustensils);
})

// Recherche en fonction des différents filtres
function searchInData(searchTerms, recipesToFilter){
	filteredRecipes = recipesToFilter.filter(function(recipe){
		
		if(searchTerms[0]){
			if(!recipeSearch(recipe, searchTerms)){
				return false;
			}
		}

		if(searchTerms[1].length > 0){
			if(!ingredientsSearch(recipe, searchTerms)){
				return false;
			}
		}

		if(searchTerms[2].length > 0){
			if(!appliancesSearch(recipe, searchTerms)){
				return false;
			}
		}

		if(searchTerms[3].length > 0){
			if(!ustensilsSearch(recipe, searchTerms)){
				return false;
			}
		}

		return recipe;
	});

	let ingredients = [];
	for(let i = 0; i < filteredRecipes.length; i++){
		for(let j = 0; j < filteredRecipes[i].ingredients.length ; j++){
			filteredRecipes[i].ingredients.forEach(function(ingredient){
				if(!ingredients.includes(ingredient.ingredient.toLowerCase())){
					ingredients.push(ingredient.ingredient.toLowerCase());
				}
			})
		}
	}

	let appliances = [];
	for(let i = 0; i < filteredRecipes.length; i++){
		if(!appliances.includes(filteredRecipes[i].appliance.toLowerCase())){
			appliances.push(filteredRecipes[i].appliance.toLowerCase());
		}
	}

	let ustensils = [];
	for(let i = 0; i < filteredRecipes.length; i++){
		for(let j = 0; j < filteredRecipes[i].ustensils.length ; j++){
			filteredRecipes[i].ustensils.forEach(function(ustensil){
				if(!ustensils.includes(ustensil.toLowerCase())){
					ustensils.push(ustensil.toLowerCase());
				}
			})
		}
	}

	displayRecipes(filteredRecipes);
	displayIngredients(ingredients);
	displayAppliances(appliances);
	displayUstensils(ustensils);
};

function recipeSearch(recipe, searchTerms){
	if(recipe.name.toLowerCase().includes(searchTerms[0]) || recipe.description.toLowerCase().includes(searchTerms[0])){
		return true;
	} else {
		for(let i = 0; i < recipe.ingredients.length; i++){
			if(recipe.ingredients[i].ingredient.toLowerCase().includes(searchTerms[0])){
				return true;
			}
		}
	}
}

function ingredientsSearch(recipe, searchTerms){
	let globResult = true;

	searchTerms[1].forEach(function(searchTerm){
		let result = false;

		for(let i = 0; i < recipe.ingredients.length; i++){
			if(recipe.ingredients[i].ingredient.toLowerCase().includes(searchTerm)){
				result = true;
			}
		}

		if(!result){
			globResult = false;
		}
	})

	return globResult;
}

function appliancesSearch(recipe, searchTerms){
	if(recipe.appliance.toLowerCase().includes(searchTerms[2])){
		return true;
	}
}

function ustensilsSearch(recipe, searchTerms){
	let globResult = true;

	searchTerms[3].forEach(function(searchTerm){
		let result = false;
		let ustensils = recipe.ustensils.map(ustensil => ustensil.toLowerCase());

		for(let i = 0; i < ustensils.length; i++){
			if(ustensils.includes(searchTerm)){
				result = true;
			}
		}

		if(!result){
			globResult = false;
		}
	})

	return globResult;
}

// Affiche les recettes passées en paramètre
function displayRecipes(recipesToDisplay){
	if(recipesToDisplay.length == 0){
		noResult.classList.remove('invisible');
	} else {
		noResult.classList.add('invisible');
	}
		
	blocsRecipe.forEach(element => {
		element.classList.remove('d-none');
	});

	let nameRecipes = [];

	recipesToDisplay.forEach(function(recipe){
		nameRecipes.push(recipe.name)
	})

	for(let i = 0; i < blocsRecipe.length; i++){
		let nameRecipe = blocsRecipe[i].getAttribute('nameRecipe');
		if(!nameRecipes.includes(nameRecipe)){
			blocsRecipe[i].classList.add('d-none');
		}
	}
}

// Affiche les tags
function displayTag(tagContent, searchTerms, classList){
	tag = document.createElement('li');
	tag.textContent = tagContent;
	tag.classList.add('tag', 'btn', classList, 'text-light');
	tagList.appendChild(tag);

	tags.push(tag);
	tags.forEach(function(tag) {
		tag.addEventListener('click', function() {
			tag.remove();
			if(classList == 'btn-primary'){
				searchTerms[1].splice(searchTerms[1].indexOf(tag.textContent), 1);
			} else if(classList == "btn-secondary") {
				searchTerms[2].splice(searchTerms[2].indexOf(tag.textContent), 1);
			} else if(classList == "btn-info") {
				searchTerms[3].splice(searchTerms[3].indexOf(tag.textContent), 1);
			}
			searchInData(searchTerms, recipes);
		})
	})
}