let isDropdownActive = false;

const clearNavItems = function () {
	const navItems = document.querySelectorAll('[data-nav-item]');
	navItems.forEach((navItem) => navItem.classList.remove('feather-header__dropdown-item--active'));
	const menus = document.querySelectorAll('[data-nav]');
	menus.forEach((menu) => menu.classList.remove('active'));
};

const clearDropdowns = function () {
	const dropdowns = document.querySelectorAll('.feather-header__dropdown');

	dropdowns.forEach((dropdown) => {
		dropdown.addEventListener('mouseenter', () => console.log('enter'));
		dropdown.addEventListener('mouseleave', () => clearNavItems());
	});
};

const displayNavItems = function () {
	const navItems = document.querySelectorAll('[data-nav-item]');

	navItems.forEach((navItem) => {
		navItem.addEventListener('mouseover', () => {
			const selector = navItem.getAttribute('data-nav-item');
			const nav = document.querySelector(`[data-nav="${selector}"]`);
			clearNavItems();
			navItem.classList.add('feather-header__dropdown-item--active');
			nav.classList.add('active');
		});
	});
};

export const navigation = function () {
	displayNavItems();
	clearDropdowns();
};
