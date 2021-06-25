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
// search bar
let searchTerms = [];
searchTerms[0] = '';
// ingredient tags
searchTerms[1] = [];
// appliance tags
searchTerms[2] = [];
// ustensils tags 
searchTerms[3] = [];

let tags = [];

searchBar.addEventListener('keyup', function(){
	searchTerm = searchBar.value.toLowerCase(); 

	if(searchTerm.length > 2){
		if(searchTerm.length != 3 && searchTerm.length > searchTerms[0].length) {
			searchTerms[0] = searchTerm.toLowerCase();
			searchInData(searchTerms, filteredRecipes);
		} else {
			searchTerms[0] = searchTerm;
			searchInData(searchTerms, recipes);
		}
	} else {
		blocsRecipe.forEach(element => {
			searchInData(searchTerms, recipes);
		});

		searchTerms[0] = searchTerm.toLowerCase();
	}
})

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

searchAppliance.addEventListener('keyup', function(){
	searchInData(searchTerms, recipes);
	appliances = [];
	document.querySelectorAll('.applianceItem').forEach(element => {
		if (element.textContent.includes(searchAppliance.value) ) {
			appliances.push(element.textContent);
		}
	});

	displayAppliances(appliances);
})

searchUstensil.addEventListener('keyup', function(){
	searchInData(searchTerms, recipes);
	ustensils = [];
	document.querySelectorAll('.ustensilItem').forEach(element => {
		if (element.textContent.toLowercase().includes(searchUstensil.value.toLowerCase()) ) {
			ustensils.push(element.textContent.toLowerCase());
		}
	});

	displayUstensils(ustensils);
})

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

		for(let i = 0; i < recipe.ustensils.length; i++){
			if(recipe.ustensils.toLowerCase().includes(searchTerm)){
				result = true;
			}
		}

		if(!result){
			globResult = false;
		}
	})

	return globResult;
}

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