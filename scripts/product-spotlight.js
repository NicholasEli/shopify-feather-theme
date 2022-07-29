import { getCSSVariable } from './utils.js';
import Glide from '@glidejs/glide';

const sm = parseInt(getCSSVariable('--sm'));
const instances = {};

export const productSpotlight = function () {
	const spotlights = document.querySelectorAll('[data-glide]');

	if (!spotlights || (spotlights && spotlights.length == 0)) return;

	const _numSlides = () => {
		if (window.innerWidth > sm) {
			return 2;
		}

		return 1;
	};

	spotlights.forEach((spotlight) => {
		const id = spotlight.getAttribute('data-glide');
		const instance = new Glide('[data-glide="' + id + '"]', { perView: _numSlides() });
		instance.mount();
		instance.on(['resize'], function () {
			const { perView } = instance.settings;
			const num = _numSlides();

			if (perView === 2 && num === 1) {
				instance.update({ perView: 1 });
			}

			if (perView === 1 && num === 2) {
				instance.update({ perView: 2 });
			}
		});
		instances[id] = instance;
	});
};
