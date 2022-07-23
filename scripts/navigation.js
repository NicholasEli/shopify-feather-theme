import { getCSSVariable } from './utils.js';

const state = {
	active: false,
	set setActive(active) {
		this.active = active;
	},
};

const active = 'eather-header__dropdown-item--active';
const md = parseInt(getCSSVariable('--md'));

const clearNavItems = function () {
	const navItems = document.querySelectorAll('[data-nav-item]');
	navItems.forEach((navItem) => navItem.classList.remove(active));
	const menus = document.querySelectorAll('[data-nav]');
	menus.forEach((menu) => menu.classList.remove('active'));
};

const clearDropdowns = function () {
	const dropdowns = document.querySelectorAll('[data-nav-dropdown]');
	dropdowns.forEach((dropdown) => dropdown.addEventListener('mouseleave', () => clearNavItems()));
};

const displayNavItems = function () {
	const navItems = document.querySelectorAll('[data-nav-item]');

	navItems.forEach((navItem) => {
		const _select = () => {
			const selector = navItem.getAttribute('data-nav-item');
			const nav = document.querySelector(`[data-nav="${selector}"]`);
			clearNavItems();
			navItem.classList.add(active);
			nav.classList.add('active');
		};
		navItem.addEventListener('mouseover', () => _select());
		navItem.addEventListener('click', () => _select());
	});
};

const mobileNavBtn = function () {
	const nav = document.querySelector('[data-nav]');
	const btn = document.querySelector('[data-nav-btn]');
	if (!nav || !btn) return;

	btn.addEventListener('click', () => {
		if (!state.active) {
			nav.classList.add('animate__slideInLeft');
			state.setActive = true;
			return;
		}

		nav.classList.remove('animate__slideInLeft');
		state.setActive = false;
	});

	window.addEventListener('resize', () => {
		if (window.innerWidth > md && state.active) {
			nav.classList.remove('animate__slideInLeft');
			state.setActive = false;
		}
	});
};

export const navigation = function () {
	displayNavItems();
	clearDropdowns();
	mobileNavBtn();
};
