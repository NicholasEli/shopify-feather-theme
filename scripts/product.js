import Glide from '@glidejs/glide';
import { getCSSVariable } from './utils.js';
import { product as api } from './api.js';

const sm = parseInt(getCSSVariable('--sm'));
const md = parseInt(getCSSVariable('--md'));
const lg = parseInt(getCSSVariable('--lg'));
const xl = parseInt(getCSSVariable('--xl'));

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
					console.log(perView, num);
					if (perView !== num) {
						instance.update({ perView: num });
					}
				});
			});
		}

		const el = document.querySelector('[data-recommendations]');
		if (!window.Feather || (window.Feather && !window.Feather.product) || !el) return;

		const section = el.getAttribute('data-section');
		const product = el.getAttribute('data-product');
		if (!section || !product) return;

		const res = await api.recommendations.get(section, window.Feather.product.id);
		console.clear();
		console.log(res);
		if (res && res.data) {
			console.log(res);
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
	variantSlider();
	recommendations();
};
