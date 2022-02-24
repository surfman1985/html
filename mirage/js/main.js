
let tabNav = Array.from(document.getElementsByClassName('nav-section'));

function tab() {

	tabNav.forEach(item => {
		item.addEventListener('click', selectTabNav)
	});

	function selectTabNav() {
		tabNav.forEach(item => {
			item.classList.remove('nav-section--open');
		});
		this.classList.add('nav-section--open');
		
	}

};

tab();

(() => {
	const menuButton = document.querySelector('.nav__button');
	const menuList = document.querySelector('.nav__list');

	menuButton.addEventListener('click', () => {
		menuButton.classList.toggle('nav__button--open');
		menuList.classList.toggle('nav__list--open');
	});
})();

