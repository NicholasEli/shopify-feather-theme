import Glide from '@glidejs/glide';
import { getCSSVariable } from './utils.js';
import { isSame } from './algorithims.js';

const sm = parseInt(getCSSVariable('--sm'));
const md = parseInt(getCSSVariable('--md'));
const lg = parseInt(getCSSVariable('--lg'));
const xl = parseInt(getCSSVariable('--xl'));

const state = {
	sliders: [],
	variant: null,
	options: {},
	quantity: 0,
	set setSliders({ sliders }) {
		this.sliders = sliders;
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

const setUI = function () {
	const { product } = window.Feather;
	const { variant, options, quantity, sliders } = state;

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

		sliders.forEach((slider) => {
			slider.go('=' + index);
		});
	}

	// Add to cart
	const btn = document.querySelector('[data-add-to-cart]');

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

const setState = function () {
	const { product } = window.Feather;

	const options = {};

	product.options.forEach((option) => (options[option] = null));

	state.setOptions = { options, callback: null };
};

const variantSlider = function () {
	const { product } = window.Feather;
	const sliders = document.querySelectorAll('[data-variant-slider]');

	if (!sliders || (sliders && !sliders.length)) return;

	let instances = [];
	sliders.forEach((slider, index) => {
		const id = slider.getAttribute('data-variant-slider');
		const instance = new Glide('[data-variant-slider="' + id + '"]', { perView: 1 });
		instances.push(instance);
	});

	instances.forEach((instance, index) => {
		const options = {};
		instance.on('run.after', () => {
			const slide = document.querySelector('.glide__slide--active');
			if (!slide) return;

			const id = slide.getAttribute('data-variant-slide-item');
			if (!id) return;

			product.variants.forEach((variant) => {
				if (variant.id == id) {
					variant.options.forEach((option, i) => (options[product.options[i]] = option));
				}
			});

			state.setOptions = { options, callback: () => setUI() };
		});
		instance.mount();
	});

	state.setSliders = { sliders: instances };
};

const recommendations = async function () {
	try {
		const sliders = document.querySelectorAll('[data-related-product-slider]');

		if (sliders && sliders.length) {
			const _numSlides = () => {
				let num = 1;
				if (window.innerWidth > sm) {
					num = 2;
				}

				if (window.innerWidth > md) {
					num = 3;
				}

				if (window.innerWidth > xl) {
					num = 4;
				}

				return num;
			};

			sliders.forEach((slider) => {
				const id = slider.getAttribute('data-related-product-slider');
				const instance = new Glide('[data-related-product-slider="' + id + '"]', {
					perView: _numSlides(),
				});
				instance.mount();
				instance.on(['resize'], function () {
					const { perView } = instance.settings;
					const num = _numSlides();

					if (perView !== num) {
						instance.update({ perView: num });
					}
				});
			});
		}
	} catch (err) {
		console.error(err);
	}
};

export const product = function () {
	if (!window.Feather || (window.Feather && !window.Feather.product)) return;
	setState();
	variantSlider();
	recommendations();
	setOption();
	setQuantity();
};
