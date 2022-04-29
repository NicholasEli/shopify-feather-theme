(function () {
	'use strict';

	const getCSSVariable = function (variable) {
		return getComputedStyle(document.body).getPropertyValue(variable);
	};

	const setMenuBtnActive = function (active) {
		if (active) {
			document.body.classList.add('mobile-menu-active');
			return;
		}

		document.body.classList.remove('mobile-menu-active');
	};

	const MobileMenu = function () {
		console.log('--Init MobileMenu');
		const headerMenuBtn = document.querySelector('header .nav__mobile-menu-btn');
		const menuBtn = document.querySelector('#mobile-menu .nav__mobile-menu-btn');

		menuBtn.addEventListener('click', () => setMenuBtnActive(false));
		headerMenuBtn.addEventListener('click', () => setMenuBtnActive(true));

		window.addEventListener('resize', () => {
			const maxWidth = parseInt(getCSSVariable('--max-width'));
			if (window.innerWidth >= maxWidth) setMenuBtnActive(false);
		});
	};

	window.onload = function () {
		console.log('--Initializing Scripts');
		MobileMenu();
		console.log('--Scripts Loaded');
	};

})();
