import Glide from '@glidejs/glide';
import { getCSSVariable } from './utils.js';

const sm = parseInt(getCSSVariable('--sm'));
const md = parseInt(getCSSVariable('--md'));
const lg = parseInt(getCSSVariable('--lg'));
const xl = parseInt(getCSSVariable('--xl'));

const state = {
	variants: {},
	quantity: 0,
	set setVariants({ variants, callback }) {
		this.variants = variants;

		if (callback) callback();
	},
	set setQuantity({ quantity, callback }) {
		this.quantity = quantity;

		if (callback) callback();
	},
};

const toggleAddToCartBtn = function () {
	if (!window.Feather || (window.Feather && !window.Feather.product)) return;
	const { product } = window.Feather;

	const btn = document.querySelector('[data-add-to-cart]');
	if (!btn) return;

	const _state = Object.assign({}, state);

	if (Object.keys(_state.variants) === product.options.length && _state.quantity > 0) {
		btn.classList.remove('button--disabled');
	} else {
		btn.classList.add('button--disabled');
	}
};

const setState = function () {
	if (!window.Feather || (window.Feather && !window.Feather.product)) return;

	const { product } = window.Feather;

	const variants = {};

	product.options.forEach((option) => (variants[option] = null));

	state.setVariants = variants;
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

const variantSlider = function () {
	const sliders = document.querySelectorAll('[data-variant-slider]');

	if (!sliders || (sliders && !sliders.length)) return;

	sliders.forEach((slider) => {
		const id = slider.getAttribute('data-variant-slider');
		const instance = new Glide('[data-variant-slider="' + id + '"]', { perView: 1 });
		instance.mount();
	});
};

export const product = function () {
	setState();
	variantSlider();
	recommendations();
	toggleAddToCartBtn();
};
