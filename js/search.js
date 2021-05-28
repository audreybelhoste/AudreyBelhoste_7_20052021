const searchBar = document.getElementById('searchBar');
const blocsRecipe = document.querySelectorAll('.blocRecipe');
const ingredientItem = document.querySelectorAll('.ingredientItem');
const dropdownToggle = document.querySelectorAll('.dropdown-toggle');
const searchIngredient = document.getElementById('searchIngredient');

let recipesToDisplay = [];
recipesToDisplay = recipes;
// search bar
let searchTerms = [];
// ingredient tags
searchTerms[1] = [];

searchBar.addEventListener('keyup', function(){
	searchTerm = searchBar.value.toLowerCase(); 
	searchTerms[0] = searchTerm;

	if(searchTerm.length > 2){
		searchInData(searchTerms);
	} 
	else {
		blocsRecipe.forEach(element => {
			noResult.classList.add('invisible');
			element.classList.remove('d-none');
			searchInData(searchTerms);
		});
	}
})

dropdownToggle.forEach(function(element) {
	element.addEventListener('click', function() {
		this.querySelector('.dropdownTitle').classList.add('d-none');
		this.querySelector('.searchTag').classList.remove('d-none');
	})
})

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
	element.addEventListener('click', function() {
		searchTerms[1].push(element.textContent);
		searchInData(searchTerms);
	})
})

function searchInData(searchTerms){
	recipesToDisplay = recipes.filter(function(recipe){
		
		if(searchTerms[0]){
			if(!recipeSearch(recipe, searchTerms)){
				return false;
			}
		}

		if(searchTerms[1].length > 0){
			
			console.log(ingredientsSearch(recipe, searchTerms))

			if(!ingredientsSearch(recipe, searchTerms)){
				
				return false;
			}
		}

		

		return recipesToDisplay;
	});

	displayRecipes(recipesToDisplay);
	displayIngredients(recipesToDisplay);
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

		console.log(result)

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