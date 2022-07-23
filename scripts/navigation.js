import { getCSSVariable } from './utils.js';

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
	const btn = document.querySelector('[data-nav-btn]');
	if (!btn) return;

	btn.addEventListener('click', () => document.body.classList.add('nav-active'));
};

export const navigation = function () {
	displayNavItems();
	clearDropdowns();
	mobileNavBtn();
};
