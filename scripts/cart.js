import currency from 'currency.js';
import { asyncTimeout, getCSSVariable } from './utils.js';
import { cart as api } from './api.js';
import { Notyf } from 'notyf';
import { options } from './toast.js';

const delay = parseInt(getCSSVariable('--animate-duration'));

/**
 * Sets cart UI to active
 */
export const cartActiveUI = function () {
	const overlay = document.querySelector('[data-menu-cart="overlay"]');
	const dialog = document.querySelector('[data-menu-cart="dialog"]');

	document.body.classList.add('overflow-hidden');
	overlay.classList.add('animate__fadeIn');
	dialog.classList.add('animate__fadeInRight');
};

/**
 * Sets cart UI to inactive
 */
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

/**
 * Toggles cart UI active/inactive
 */
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

/**
 * Sets the cart product count
 */
export const setCartProductCount = function (items = []) {
	if (!items) return;

	const count = document.querySelectorAll('[data-cart-item-count]');
	if (!count || (count && !count.length)) return;

	count.forEach((c) => (c.innerText = items.length + ' Products'));
};

/**
 * Sets the cart total
 * @param {Object} cart - /cart.js http response
 */
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

export const setLineItem = function (item) {
	if (!item) return null;

	const { product_title, image, variant_id, variant_title, final_line_price, quantity } = item;
	const template = document.querySelector('[data-template="cart-item"]').cloneNode(true);
	const containers = document.querySelectorAll('[data-cart-items]');

	if (!containers || (containers && !containers.length) || !template) return;

	containers.forEach((container) => {
		template.content.querySelector('[data-cart-item-title]').innerText = product_title;

		const _image = template.content.querySelector('[data-cart-item-image]');
		_image.src = image;
		_image.title = product_title;

		template.content.querySelector('[data-cart-item-variant]').innerText = variant_title;
		template.content
			.querySelector('[data-remove-lineitem]')
			.setAttribute('data-remove-lineitem', variant_id);
		template.content.querySelector('[data-cart-item-quantity]').value = quantity;
		template.content.querySelector('[data-cart-item-price]').innerText = currency(
			final_line_price,
			{ fromCents: true }
		).format();

		container.append(template.content);
	});

	removeLineItem();
};

/**
 * Removes cart line item from UI
 */
const removeLineItem = function () {
	const btns = document.querySelectorAll('[data-remove-lineitem]');
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

			removeLineItems();
			res.data.items.forEach((item) => setLineItem(item));
			setCartProductCount(res.data.items);
			setCartTotal(res.data);
		});
	});
};

/**
 * Removes all cart line items
 */
export const removeLineItems = function () {
	const containers = document.querySelectorAll('[data-cart-items]');
	containers.forEach((container) => (container.innerHTML = ''));
};

export const cart = function () {
	toggleCart();
	removeLineItem();
};
