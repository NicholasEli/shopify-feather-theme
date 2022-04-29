(function () {
	'use strict';

	const setMenuBtnActive = function (active) {
		if (active) {
			document.body.classList.add('mobile-menu-active');
			return;
		}

		document.body.classList.remove('mobile-menu-active');
	};

	const MobileMenu = function () {
		console.log('--Init MobileMenu');
		let isOpen = false;

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
	};

	window.onload = function () {
		console.log('--Initializing Scripts');
		MobileMenu();
		console.log('--Scripts Loaded');
	};

})();
