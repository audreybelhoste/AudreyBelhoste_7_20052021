const searchBar = document.getElementById('searchBar');
const blocsRecipe = document.querySelectorAll('.blocRecipe');
const ingredientItem = document.querySelectorAll('.ingredientItem');
const applianceItem = document.querySelectorAll('.applianceItem');
const ustensilItem = document.querySelectorAll('.ustensilItem');
const dropdownTitle = document.querySelectorAll('.dropdownTitle');
const searchIngredient = document.getElementById('searchIngredient');
const tagList = document.getElementById('tagList');
const searchTag = document.querySelectorAll('.searchTag');

let filteredRecipes = [];
//recipesToFilter = recipes;
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
			console.log('ici');
			searchTerms[0] = searchTerm;
			searchInData(searchTerms, filteredRecipes);
		} else {
			searchTerms[0] = searchTerm;
			searchInData(searchTerms, recipes);
		}
	} else {
		blocsRecipe.forEach(element => {
			noResult.classList.add('invisible');
			element.classList.remove('d-none');
		});

		if(searchTerms[1].length > 0 || searchTerms[2].length > 0 || searchTerms[3].length > 0){
			searchInData(searchTerms, recipes);
		}
	}
})

dropdownTitle.forEach(function(element) {
	element.addEventListener('click', function() {
		this.parentNode.querySelector('.dropdownTitle').classList.add('d-none');
		this.parentNode.querySelector('.searchTag').classList.remove('d-none');
		this.parentNode.querySelector('.searchTag').focus();
	})
})

searchTag.forEach(function(element) {
	element.addEventListener('click', function() {
	});
	// element.addEventListener('focus', function() {
	// 	//element.parentNode.focus();
	// 	element.parentNode.nextElementSibling.classList.add('show');
	// });
	element.addEventListener('keyup', function() {
		element.parentNode.querySelector('.dropdown-menu').classList.add('show');
	});
	//element.addEventListener('keyup', displayListOfTags(element));
})

function displayListOfTags(element){
	element.parentNode.nextElementSibling.classList.add('show');
}

searchIngredient.addEventListener('keyup', function(){
	ingredientItem.forEach(element => {
		element.classList.remove('d-none');
	});

	for(let i = 0; i < ingredientItem.length; i++){
		if(!ingredientItem[i].textContent.toLowerCase().includes(searchIngredient.value.toLowerCase())){
			ingredientItem[i].classList.add('d-none');
		}
	}
})

ingredientItem.forEach(function(element) {
	const classListIngredient = 'btn-primary';
	element.addEventListener('click', function() {
		if(!searchTerms[1].includes(element.textContent)){
			searchTerms[1].push(element.textContent);
			displayTag(element.textContent, searchTerms, classListIngredient);
			searchInData(searchTerms, recipes);
		}
	})
})

applianceItem.forEach(function(element) {
	const classListAppliance = 'btn-secondary';
	element.addEventListener('click', function() {
		if(!searchTerms[2].includes(element.textContent)){
			searchTerms[2].push(element.textContent.toLowerCase());
			displayTag(element.textContent, searchTerms, classListAppliance);
			searchInData(searchTerms, recipes);
		}
	})
})

ustensilItem.forEach(function(element) {
	const classListAppliance = 'btn-info';
	element.addEventListener('click', function() {
		if(!searchTerms[3].includes(element.textContent)){
			searchTerms[3].push(element.textContent.toLowerCase());
			displayTag(element.textContent, searchTerms, classListAppliance);
			searchInData(searchTerms, recipes);
		}
	})
})

function searchInData(searchTerms, recipesToFilter){
	console.log(recipesToFilter);
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

	console.log(filteredRecipes);

	displayRecipes(filteredRecipes);
	displayIngredients(filteredRecipes);
	displayAppliances(filteredRecipes);
	displayUstensils(filteredRecipes);
};

function recipeSearch(recipe, searchTerms){
	if(recipe.name.toLowerCase().includes(searchTerms[0]) || recipe.description.toLowerCase().includes(searchTerms[0])){
		return true;
	} else {
		for(let i = 0; i < recipe.ingredients.length; i++){
			if(recipe.ingredients[i].ingredient.includes(searchTerms[0])){
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
			if(recipe.ingredients[i].ingredient.includes(searchTerm)){
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
			if(recipe.ustensils.includes(searchTerm)){
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

function displayIngredients(recipesToDisplay){
	ingredientItem.forEach(element => {
		element.classList.remove('d-none');
	});

	let ingredients = [];
		for(let i = 0; i < recipesToDisplay.length; i++){
			for(let j = 0; j < recipesToDisplay[i].ingredients.length ; j++){
				recipesToDisplay[i].ingredients.forEach(function(ingredient){
					if(!ingredients.includes(ingredient.ingredient)){
						ingredients.push(ingredient.ingredient);
					}
				})
			}
		}
	
	ingredientItem.forEach(function(ingredient){
		if(!ingredients.includes(ingredient.textContent)){
			ingredient.classList.add('d-none');
		}
	})
}

function displayAppliances(recipesToDisplay){
	applianceItem.forEach(element => {
		element.classList.remove('d-none');
	});

	let appliances = [];
		for(let i = 0; i < recipesToDisplay.length; i++){
			if(!appliances.includes(recipesToDisplay[i].appliance)){
				appliances.push(recipesToDisplay[i].appliance);
			}
		}
	
	applianceItem.forEach(function(appliance){
		if(!appliances.includes(appliance.textContent)){
			appliance.classList.add('d-none');
		}
	})
}

function displayUstensils(recipesToDisplay){
	ustensilItem.forEach(element => {
		element.classList.remove('d-none');
	});

	let ustensils = [];
	for(let i = 0; i < recipesToDisplay.length; i++){
		for(let j = 0; j < recipesToDisplay[i].ustensils.length ; j++){
			recipesToDisplay[i].ustensils.forEach(function(ustensil){
				if(!ustensils.includes(ustensil)){
					ustensils.push(ustensil);
				}
			})
		}
	}
	
	ustensilItem.forEach(function(ustensil){
		if(!ustensils.includes(ustensil.textContent)){
			ustensil.classList.add('d-none');
		}
	})
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
			
			searchInData(searchTerms);
		})
	})
}