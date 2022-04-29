import { getCSSVariable } from './utils.js';

let isOpen = false;

export const setMenuBtnActive = function (active) {
	if (active) {
		document.body.classList.add('mobile-menu-active');
		return;
	}

	document.body.classList.remove('mobile-menu-active');
};

export const MobileMenu = function () {
	console.log('--Init MobileMenu');
	const menuBtn = document.querySelector('nav .nav__mobile-menu-btn');

	menuBtn.addEventListener('click', () => {
		if (!isOpen) {
			isOpen = true;
			setMenuBtnActive(isOpen);
			return;
		}

		isOpen = false;
		setMenuBtnActive(isOpen);
	});

	window.addEventListener('resize', () => {
		const maxWidth = parseInt(getCSSVariable('--max-width'));
		if (window.innerWidth >= maxWidth) {
			isOpen = false;
			setMenuBtnActive(isOpen);
		}
	});
};
