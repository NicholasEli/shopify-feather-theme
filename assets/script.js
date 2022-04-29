(function () {
	'use strict';

	const MobileMenu = function () {
		console.log('--Init MobileMenu');
		let isOpen = false;

		const menuBtn = document.querySelector('nav .nav__mobile-menu-btn');

		menuBtn.addEventListener('click', () => {
			if (isOpen) {
				isOpen = false;
				return;
			}

			isOpen = true;
		});
	};

	window.onload = function () {
		console.log('--Initializing Scripts');
		MobileMenu();
		console.log('--Scripts Loaded');
	};

})();
