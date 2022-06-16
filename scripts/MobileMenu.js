import { getCSSVariable } from './utils.js';

export const MobileMenu = function () {
	console.log('--Init MobileMenu');

	const header = document.querySelector('header');
	const menu = document.querySelector('[data-el="mobile-menu"]');
	const menuBtns = document.querySelectorAll('[data-btn="mobile-menu-btn"]');

	for (let i = 0; i < menuBtns.length; i++) {
		const btn = menuBtns[i];
		btn.addEventListener('click', () => {
			const bounds = header.getBoundingClientRect();
			const diff = bounds.height;

			menu.style.top = diff + 'px';
			menu.style.height = window.innerHeight - diff + 'px';

			document.body.classList.toggle('mobile-menu-active');
		});
	}
};
