import { asyncTimeout, getCSSVariable } from './utils.js';

const state = {
	active: false,
	set setActive(active) {
		this.active = active;
	},
};

const active = 'eather-header__dropdown-item--active';
const md = parseInt(getCSSVariable('--md'));
const duration = parseInt(getCSSVariable('--animate-duration'));

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
	const header = document.querySelector('header');
	const nav = document.querySelector('[data-nav]');
	const btn = document.querySelector('[data-nav-btn]');
	if (!nav || !btn) return;

	const limit = header.getBoundingClientRect().bottom;
	const bounds = nav.getBoundingClientRect();

	const _close = async () => {
		nav.classList.add('animate__slideOutLeft');

		await asyncTimeout(duration);
		document.body.classList.remove('nav-active');
		nav.classList.remove('animate__slideInLeft');
		nav.classList.remove('animate__slideOutLeft');
		state.setActive = false;
	};

	btn.addEventListener('click', async () => {
		if (!state.active) {
			document.body.classList.add('nav-active');
			nav.style.top = limit + 'px';
			nav.style.height = window.innerHeight - limit + 'px';
			nav.classList.add('animate__slideInLeft');
			await asyncTimeout(duration);
			state.setActive = true;
			return;
		}

		_close();
	});

	window.addEventListener('resize', () => {
		if (window.innerWidth > md && state.active) {
			_close;
		}
	});
};

export const navigation = function () {
	displayNavItems();
	clearDropdowns();
	mobileNavBtn();
};
