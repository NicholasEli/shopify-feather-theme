import currency from 'currency.js';
import { asyncTimeout, getCSSVariable } from './utils.js';
import { cart as api } from './api.js';
import { Notyf } from 'notyf';
import { options } from './toast.js';

const delay = parseInt(getCSSVariable('--animate-duration'));

export const cartActiveUI = function () {
	const overlay = document.querySelector('[data-menu-cart="overlay"]');
	const dialog = document.querySelector('[data-menu-cart="dialog"]');

	document.body.classList.add('overflow-hidden');
	overlay.classList.add('animate__fadeIn');
	dialog.classList.add('animate__fadeInRight');
};

export const cartInactiveUI = async function () {
	const overlay = document.querySelector('[data-menu-cart="overlay"]');
	const dialog = document.querySelector('[data-menu-cart="dialog"]');

	dialog.classList.add('animate__fadeOutRight');
	overlay.classList.add('animate__fadeOut');

	await asyncTimeout(delay);

	overlay.classList.remove('animate__fadeIn', 'animate__fadeOut');
	dialog.classList.remove('animate__fadeInRight', 'animate__fadeOutRight');
	document.body.classList.remove('overflow-hidden');
};

const toggleCart = function () {
	const btns = document.querySelectorAll('[data-btn="cart"]');
	const overlay = document.querySelector('[data-menu-cart="overlay"]');
	const dialog = document.querySelector('[data-menu-cart="dialog"]');

	if (!btns || (btns && !btns.length) || !overlay || !dialog) return;

	btns.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();

			if (overlay.className.indexOf('animate__fadeIn') > -1) {
				cartInactiveUI();
				return;
			}

			cartActiveUI();
		});
	});
};

export const setCartTotal = function (cart) {
	if (!cart) return;

	const elements = document.querySelectorAll('[data-cart-total]');
	if (!elements || (elements && !elements.length)) return;
	console.log({ cart, elements });
	elements.forEach((el) => {
		el.innerText = currency(cart.total_price, { fromCents: true }).format();
	});

	if (!window.Feather || (window.Feather && !window.Feather.cart)) return;
	window.Feather.cart = cart;
};

const removeLineItem = function () {
	const btns = document.querySelectorAll('[data-remove-lineitem]');
	console.log(btns);
	if (!btns || (btns && !btns.length)) return;

	btns.forEach((btn) => {
		btn.addEventListener('click', async () => {
			const variantID = btn.getAttribute('data-remove-lineitem');

			if (!variantID) return;

			const res = await api.change({
				id: variantID,
				quantity: 0,
			});

			if (res.error || !res.data) {
				console.error(res.error);
				notyf.error('Could not add item to cart');
				return;
			}

			setCartTotal(res.data);
		});
	});
};

export const cart = function () {
	toggleCart();
	removeLineItem();
};
