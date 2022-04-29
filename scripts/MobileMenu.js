import { getCSSVariable } from './utils.js';

export const setMenuBtnActive = function (active) {
	if (active) {
		document.body.classList.add('mobile-menu-active');
		return;
	}

	document.body.classList.remove('mobile-menu-active');
};

export const MobileMenu = function () {
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
