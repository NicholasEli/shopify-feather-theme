import Glide from '@glidejs/glide';
import { getCSSVariable } from './utils.js';
import { isSame } from './algorithims.js';

const sm = parseInt(getCSSVariable('--sm'));
const md = parseInt(getCSSVariable('--md'));
const lg = parseInt(getCSSVariable('--lg'));
const xl = parseInt(getCSSVariable('--xl'));

const state = {
	variant: null,
	options: {},
	quantity: 0,
	set setOptions({ options, callback }) {
		this.options = options;

		setVariant();

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

	const { options, quantity } = state;
	if ( !options ) return

	let optionsCount = 0
	
	product.options.forEach(option => {
		if ( options[option] ) optionsCount++
	})
	
	if (optionsCount === product.options.length && quantity > 0) {
		btn.classList.remove('button--disabled');
	} else {
		btn.classList.add('button--disabled');
	}
};

const setOptionUI = function() {
	const btns = document.querySelectorAll('[data-option]')
	if(!btns || btns && !btns.length ) return

	btns.forEach(btn => btn.classList.remove('feather-product__option-value--active'));

	for( const option in state.options ) {
		const btn = document.querySelector(`[data-option="${option}"][data-value="${state.options[option]}"]`)
		if ( !btn ) return

		btn.classList.add('feather-product__option-value--active')
	}

	toggleAddToCartBtn();
}

const setVariant = function() {
	if (!window.Feather || (window.Feather && !window.Feather.product)) return;

	const _state = state.options
	const { variants } = window.Feather.product

	let variant = null;

	variants.forEach( v => {
		console.log({options: Object.values(_state), variants: v.options})
		if ( isSame(Object.values(_state), v.options) ) {
			variant = v;
		}
	})

	console.log( variant )
}

const setOption = function() {
	if (!window.Feather || (window.Feather && !window.Feather.product)) return;

	const btns = document.querySelectorAll('[data-option]')
	if(!btns || btns && !btns.length ) return

	const options = Object.assign({}, state.options )
	
	btns.forEach( btn => {
		btn.addEventListener('click', () => {
			const option = btn.getAttribute('data-option')
			const value = btn.getAttribute('data-value')

			options[option] = value

			state.setOptions = { options, callback: () => setOptionUI() }
		})
	})
}

const setState = function () {
	if (!window.Feather || (window.Feather && !window.Feather.product)) return;

	const { product } = window.Feather;

	const options = {};

	product.options.forEach((option) => (options[option] = null));

	state.setOptions = { options, callback: null };
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
	setOption();
};
