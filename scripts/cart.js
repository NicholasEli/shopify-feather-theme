import currency from 'currency.js';
import { asyncTimeout, getCSSVariable } from './utils.js';

const delay = parseInt(getCSSVariable('--animate-duration'));

const toggleCart = function () {
	const btns = document.querySelectorAll('[data-btn="cart"]');
	const overlay = document.querySelector('[data-menu-cart="overlay"]');
	const dialog = document.querySelector('[data-menu-cart="dialog"]');

	if (!btns || (btns && !btns.length) || !overlay || !dialog) return;

	btns.forEach((btn) => {
		btn.addEventListener('click', async (e) => {
			e.preventDefault();
			if (overlay.className.indexOf('animate__fadeIn') > -1) {
				dialog.classList.add('animate__fadeOutRight');

				await asyncTimeout(delay);

				overlay.classList.add('animate__fadeOut');

				await asyncTimeout(delay);

				overlay.classList.remove('animate__fadeIn', 'animate__fadeOut');
				dialog.classList.remove('animate__fadeInRight', 'animate__fadeOutRight');
				document.body.classList.remove('overflow-hidden');
				return;
			}

			document.body.classList.add('overflow-hidden');
			overlay.classList.add('animate__fadeIn');
			dialog.classList.add('animate__fadeInRight');
		});
	});
};

export const setCartTotal = function (cart) {
	if (!cart) return;

	const elements = document.querySelectorAll('[data-cart-total]');
	if (!elements || (elements && !elements.length)) return;

	elements.forEach((el) => {
		el.innerText = currency(cart.total_price, { fromCents: true }).format();
	});

	if (!window.Feather || (window.Feather && !window.Feather.cart)) return;
	window.Feather.cart = cart;
};

export const cart = function () {
	toggleCart();
};
