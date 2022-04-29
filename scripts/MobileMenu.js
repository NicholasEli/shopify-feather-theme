export const MobileMenu = function () {
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
