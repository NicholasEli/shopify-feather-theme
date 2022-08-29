import Glide from '@glidejs/glide';
import { product as api } from './api.js';

const recommendations = async function () {
	try {
		const el = document.querySelector('[data-recommendations]');
		if (!window.Feather || (window.Feather && !window.Feather.product) || !el) return;

		// const section = el.getAttribute('data-section');
		// const product = el.getAttribute('data-product');

		// const res = await api.recommendations.get(section, window.Feather.product.id);

		// if (res && res.data) {
		// 	console.log(res);
		// }
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
