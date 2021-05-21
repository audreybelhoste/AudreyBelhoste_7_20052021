const searchBar = document.getElementById('searchBar');
const blocsRecipe = document.querySelectorAll('.blocRecipe');

searchBar.addEventListener('keyup', function(element){
	searchTerm = searchBar.value.toLowerCase();
	searchInData(searchTerm);
})

function searchInData(searchTerm){
	let recipesToDisplay = new Array();
	recipes.map(function(recipe){
		if(recipe.name.toLowerCase().includes(searchTerm) || recipe.description.toLowerCase().includes(searchTerm)){
			recipesToDisplay.push(recipe.name);
		}

		for(let i = 0; i < recipe.ingredients.length; i++){
			if(recipe.ingredients[i].ingredient.includes(searchTerm) && !recipesToDisplay.indexOf(recipe.id)){
				recipesToDisplay.push(recipe.name);
			}
		}
	});

	displayRecipes(recipesToDisplay);
};

function clearDOMGallery(){
	var recipeSection = document.querySelector('#recipes');
	recipeSection.innerHTML = '';
}

function displayRecipes(recipesToDisplay){
	blocsRecipe.forEach(element => {
		element.classList.remove('d-none');
	});
	for(let i = 0; i < blocsRecipe.length; i++){
		let idRecipe = blocsRecipe[i].getAttribute('idRecipe');
		if(!recipesToDisplay.includes(idRecipe)){
			blocsRecipe[i].classList.add('d-none');
		}
	}
}