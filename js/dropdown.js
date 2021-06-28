// Permet de fermer les listes au clic en dehors
window.addEventListener('click', function(){
	document.querySelectorAll('.btn-group').forEach(function(element) {
		element.classList.remove('show');
		console.log(element);
		element.classList.add('close');
		element.querySelector('.dropdownTitle').classList.remove('d-none');
		element.querySelector('.searchTag').classList.add('d-none');
		element.querySelector('.searchTag').value = '';
	})
})

const dropdownToggle = document.querySelectorAll('.dropdown-toggle');

// Affiche ou masque de la liste avec changement entre nom et barre de recherche
dropdownToggle.forEach(function(element) {

	element.addEventListener('click', function(event) {
		event.stopPropagation();
		if(!this.parentNode.classList.contains('show')) {
			btnGroup.forEach(function(element){
				element.classList.remove('show');
				element.classList.add('close');
				element.querySelector('.dropdownTitle').classList.remove('d-none');
				element.querySelector('.searchTag').classList.add('d-none');
			})
			this.parentNode.classList.add('show');
			this.parentNode.classList.remove('close');
			this.parentNode.querySelector('.dropdownTitle').classList.add('d-none');
			this.parentNode.querySelector('.searchTag').classList.remove('d-none');
			this.parentNode.querySelector('.searchTag').focus();
		} else {
			this.parentNode.classList.remove('show');
			this.parentNode.classList.add('close');
			this.parentNode.querySelector('.dropdownTitle').classList.remove('d-none');
			this.parentNode.querySelector('.searchTag').classList.add('d-none');
		}
	})
})

// Permet de ne pas masque la liste au clic sur la barre de recherche
searchTag.forEach(function(element) {
	element.addEventListener('click', function(event) {
		event.stopPropagation();
	});
})