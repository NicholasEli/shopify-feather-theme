import currency from 'currency.js';
import { asyncTimeout, getCSSVariable } from './utils.js';
import { cart as api } from './api.js';
import { Notyf } from 'notyf';
import { options } from './toast.js';
import { button } from './button.js';

const delay = parseInt(getCSSVariable('--animate-duration'));

/**
 * Sets cart UI to active
 */
export const cartActiveUI = function (e) {
	if (e) e.preventDefault();
	const overlay = document.querySelector('[data-cart-overlay]');
	const dialog = document.querySelector('[data-cart-dialog]');

	document.body.classList.add('overflow-hidden');
	overlay.classList.add('animate__fadeIn');
	dialog.classList.add('animate__fadeInRight');
};

/**
 * Sets cart UI to inactive
 */
export const cartInactiveUI = async function (e) {
	if (e) e.preventDefault();
	const overlay = document.querySelector('[data-cart-overlay]');
	const dialog = document.querySelector('[data-cart-dialog]');

	dialog.classList.add('animate__fadeOutRight');
	overlay.classList.add('animate__fadeOut');

	await asyncTimeout(delay);

	overlay.classList.remove('animate__fadeIn', 'animate__fadeOut');
	dialog.classList.remove('animate__fadeInRight', 'animate__fadeOutRight');
	document.body.classList.remove('overflow-hidden');
};

const emptyCartUI = function (cart) {
	if (!cart) return;

	const alerts = document.querySelectorAll('[data-alert="cart-empty"]');

	if (!alerts || (alerts && !alerts.length)) return;

	alerts.forEach((alert) => {
		if (cart.item_count === 0) alert.classList.remove('hide');
		if (cart.item_count !== 0) alert.classList.add('hide');
	});
};

const cartHeaderUi = function (cart) {
	if (!cart) return;

	const headers = document.querySelectorAll('[data-cart-header]');

	if (!headers || (headers && !headers.length)) return;

	headers.forEach((header) => {
		if (cart.item_count === 0) header.classList.add('hide');
		if (cart.item_count !== 0) header.classList.remove('hide');
	});
};

/**
 * Show/Hide checkout btns if cart is empty
 * @param  {Object} cart - http cart response
 */
const checkoutButtonUI = function (cart) {
	if (!cart) return;

	const btns = document.querySelectorAll('[data-btn="checkout"]');

	if (!btns || (btns && !btns.length)) return;

	btns.forEach((btn) => {
		if (cart.item_count === 0) btn.classList.add('hide');
		if (cart.item_count !== 0) btn.classList.remove('hide');
	});
};

/**
 * Runs all cart UI methods
 * @param  {Object} cart - http cart response
 */
const cartUI = function (cart) {
	if (!cart) return;

	removeLineItems();
	cart.items.forEach((item) => setLineItem(item));
	updateLineItem();
	setCartProductCount(cart.items);
	setCartSubTotal(cart);
	setCartTotal(cart);
	checkoutButtonUI(cart);
	emptyCartUI(cart);
	emptyCartUI(cart);
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
 * Sets the cart subtotal
 * @param {Object} cart - /cart.js http response
 */
export const setCartSubTotal = function (cart) {
	if (!cart) return;

	const elements = document.querySelectorAll('[data-cart-subtotal]');
	if (!elements || (elements && !elements.length)) return;

	elements.forEach((el) => {
		el.innerText = currency(cart.items_subtotal_price, { fromCents: true }).format();
	});

	if (!window.Feather || (window.Feather && !window.Feather.cart)) return;
	window.Feather.cart = cart;
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
	const containers = document.querySelectorAll('[data-cart-items]');

	if (!containers || (containers && !containers.length)) return;

	containers.forEach((container) => {
		const template = document.querySelector('[data-template="cart-item"]').cloneNode(true);

		if (!template) return;

		template.content.querySelector('[data-cart-item-title]').innerText = product_title;

		const _image = template.content.querySelector('[data-cart-item-image]');
		_image.src = image;
		_image.title = product_title;

		// title
		template.content.querySelector('[data-cart-item-variant]').innerText = variant_title;
		// remove line item
		template.content
			.querySelector('[data-remove-lineitem]')
			.setAttribute('data-remove-lineitem', variant_id);
		template.content.querySelector('[data-remove-lineitem]').onclick = (e) =>
			removeLineItem(e, variant_id);
		// quantity
		template.content.querySelector('[data-cart-item-quantity]').value = quantity;
		template.content
			.querySelector('[data-cart-item-quantity]')
			.setAttribute('data-cart-item-quantity', variant_id);
		template.content.querySelector('[data-cart-item-quantity]').onchange = (e) =>
			updateLineItem(e, variant_id);
		// price
		template.content.querySelector('[data-cart-item-price]').innerText = currency(
			final_line_price,
			{ fromCents: true }
		).format();

		container.append(template.content);
	});

	removeLineItem();
};

const updateLineItem = async function (e, id, qty = 0) {
	let quantity = qty;
	if (e) {
		e.preventDefault();
		quantity = e.currentTarget.value;
	}

	if (!id) return;

	quantity = parseInt(quantity);

	const res = await api.change({
		id: id.toString(),
		quantity,
	});

	if (res.error || !res.data) {
		console.error(res.error);
		const notyf = new Notyf();
		notyf.error('Could not add item to cart');
		return;
	}

	cartUI(res.data);
};

/**
 * Makes http request to remove lineitem from cart
 */
const removeLineItem = async function (e, id) {
	if (e) e.preventDefault();
	if (!id) return;

	const res = await api.change({
		id: id.toString(),
		quantity: 0,
	});

	if (res.error || !res.data) {
		console.error(res.error);
		const notyf = new Notyf();
		notyf.error('Could not add item to cart');
		return;
	}

	cartUI(res.data);
};

/**
 * Removes all lineitems from cart
 */
export const removeLineItems = function () {
	const containers = document.querySelectorAll('[data-cart-items]');
	containers.forEach((container) => (container.innerHTML = ''));
};

export const cart = function () {
	window.cartActiveUI = cartActiveUI;
	window.cartInactiveUI = cartInactiveUI;
	window.removeLineItem = removeLineItem;
	window.updateLineItem = updateLineItem;

	window.addEventListener('keyup', (e) => {
		if (e.keyCode === 27) cartInactiveUI();
	});
};
