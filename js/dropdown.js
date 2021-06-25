window.addEventListener('click', function(){
	document.querySelectorAll('.btn-group').forEach(function(element) {
		element.classList.remove('show');
		element.classList.add('close');
		element.querySelector('.dropdownTitle').classList.remove('d-none');
		element.querySelector('.searchTag').classList.add('d-none');
		element.querySelector('.searchTag').value = '';
	})
})

const dropdownToggle = document.querySelectorAll('.dropdown-toggle');

dropdownToggle.forEach(function(element) {

	element.addEventListener('click', function(event) {
		event.stopPropagation();
		if(!this.parentNode.classList.contains('show')) {
			btnGroup.forEach(function(element){
				element.classList.remove('show');
				element.parentNode.classList.add('close');
				element.parentNode.querySelector('.dropdownTitle').classList.remove('d-none');
				element.parentNode.querySelector('.searchTag').classList.add('d-none');
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

searchTag.forEach(function(element) {
	element.addEventListener('click', function() {
		this.parentNode.classList.add('show');
	});
})

function displayListOfTags(element){
	element.parentNode.nextElementSibling.classList.add('show');
}
