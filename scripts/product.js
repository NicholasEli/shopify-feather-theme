import Swiper from 'swiper/bundle';
import { Notyf } from 'notyf';
import { options } from './toast.js';
import { cart } from './api.js';
import { getCSSVariable } from './utils.js';
import { isSame } from './algorithims.js';
import {
	removeLineItems,
	setLineItem,
	setCartTotal,
	cartActiveUI,
	setCartProductCount,
} from './cart.js';

const sm = parseInt(getCSSVariable('--sm'));
const md = parseInt(getCSSVariable('--md'));
const lg = parseInt(getCSSVariable('--lg'));
const xl = parseInt(getCSSVariable('--xl'));

const state = {
	swipers: [],
	variant: null,
	options: {},
	quantity: 0,
	set setSwipers({ swipers }) {
		this.swipers = swipers;
	},
	set setVariant({}) {
		const { variants } = window.Feather.product;
		const options = this.options;

		let variant = null;
		variants.forEach((v) => {
			if (isSame(Object.values(options), v.options)) variant = v;
		});

		this.variant = variant;
	},
	set setOptions({ options, callback }) {
		this.options = options;

		this.setVariant = {};
		if (callback) callback();
	},
	set setQuantity({ quantity, callback }) {
		this.quantity = quantity;

		this.setVariant = {};
		if (callback) callback();
	},
};

/**
 * Updates the variant and add to cart button display as selections are made. In addition
 * will scroll the variant slider to the associated slide.
 */
const setUI = function () {
	const { product } = window.Feather;
	const { variant, options, quantity, swipers } = state;

	// Options
	const btns = document.querySelectorAll('[data-option]');

	btns.forEach((btn) => btn.classList.remove('feather-product__option-value--active'));

	for (const option in options) {
		const btn = document.querySelector(
			`[data-option="${option}"][data-value="${state.options[option]}"]`
		);
		if (!btn) return;

		btn.classList.add('feather-product__option-value--active');
	}

	// Slider
	if (variant) {
		let index = 0;
		const items = document.querySelectorAll('[data-variant-slide-item]');
		items.forEach((item, i) => {
			const id = item.getAttribute('data-variant-slide-item');
			if (id == variant.id) index = i;
		});

		swipers.forEach((slider) => {
			slider.go('=' + index);
		});
	}

	// Add to cart
	const btn = document.querySelector('[data-add-to-cart] .button');

	let optionsCount = 0;
	product.options.forEach((option) => {
		if (options[option]) optionsCount++;
	});

	if (optionsCount === product.options.length && quantity > 0 && variant && variant.available) {
		btn.classList.remove('button--disabled');
	} else {
		btn.classList.add('button--disabled');
	}
};

/**
 * Set the variant option to state.
 */
const setOption = function () {
	const btns = document.querySelectorAll('[data-option]');
	if (!btns || (btns && !btns.length)) return;

	const options = Object.assign({}, state.options);

	btns.forEach((btn) => {
		btn.addEventListener('click', () => {
			const option = btn.getAttribute('data-option');
			const value = btn.getAttribute('data-value');

			options[option] = value;

			state.setOptions = {
				options,
				callback: () => setUI(),
			};
		});
	});
};

/**
 * Sets the quantity on change on input field
 */
const setQuantity = function () {
	const input = document.querySelector('[data-quantity]');

	if (!input) return;

	input.addEventListener('keyup', () => {
		state.setQuantity = {
			quantity: parseInt(input.value),
			callback: () => setUI(),
		};
	});
};

/**
 * Pulls options from product object and sets them to state
 */
const setState = function () {
	const { product } = window.Feather;

	const options = {};

	product.options.forEach((option) => (options[option] = null));

	state.setOptions = { options, callback: null };
};

/**
 * Controls variant slider via Swiper
 */
const variantSwiper = function () {
	const { product } = window.Feather;
	const swipers = document.querySelectorAll('[data-variant-swiper]');

	if (!swipers || (swipers && !swipers.length)) return;

	let instances = [];
	swipers.forEach((slider, index) => {
		const id = slider.getAttribute('data-variant-swiper');
		const instance = new Swiper('.swiper', {
			direction: 'horizontal',
			loop: true,
			slidesPerView: 1,
		});
		instances.push(instance);
		instance.mount();
	});

	state.setSwipers = { swipers: instances };
};

const addToCart = async function () {
	let notyf = new Notyf(options());
	const form = document.querySelector('[data-add-to-cart]');
	if (!form) return;

	form.addEventListener('submit', async (e) => {
		try {
			e.preventDefault();

			if (!state.variant || !state.quantity) return;

			let res = await cart.add(state.variant.id, state.quantity);

			if (res.error || !res.data) {
				console.error(res.error);
				notyf.error('Could not add item to cart');
				return;
			}

			res = await cart.get();
			if (res && res.data) {
				removeLineItems();
				res.data.items.forEach((item) => setLineItem(item));
				setCartTotal(res.data);
				setCartProductCount(res.data.items);
				cartActiveUI();
			}
		} catch (error) {
			console.log(error);
			notyf.error('Could not add item to cart');
		}
	});
};

export const product = async function () {
	if (!window.Feather || (window.Feather && !window.Feather.product)) return;

	setState();
	variantSwiper();
	setOption();
	setQuantity();
	addToCart();
};
