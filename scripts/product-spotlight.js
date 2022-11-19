import { getCSSVariable } from './utils.js';
import Glide from '@glidejs/glide';

const sm = parseInt(getCSSVariable('--sm'));
const md = parseInt(getCSSVariable('--md'));
const lg = parseInt(getCSSVariable('--lg'));
const instances = {};

/**
 * Controls wether product spotlight element is in slide show
 * or block view depending on the viewport width
 */
export const productSpotlight = function () {
	const spotlights = document.querySelectorAll('[data-spotlight]');

	if (!spotlights || (spotlights && spotlights.length == 0)) return;

	const _numSlides = (mobile, tablet, desktop) => {
		if (window.innerWidth >= lg) {
			return desktop;
		}

		if (window.innerWidth >= md) {
			return tablet;
		}

		return mobile;
	};

	spotlights.forEach((spotlight) => {
		const id = spotlight.getAttribute('data-spotlight');
		let mobile = parseInt(spotlight.getAttribute('data-mobile'));
		if (!mobile) mobile = 1;
		let tablet = parseInt(spotlight.getAttribute('data-tablet'));
		if (!tablet) tablet = 1;
		let desktop = parseInt(spotlight.getAttribute('data-desktop'));
		if (!desktop) desktop = 1;

		const instance = new Glide('[data-spotlight="' + id + '"]', { perView: _numSlides() });
		instance.mount();
		instance.on(['resize'], function () {
			const { perView } = instance.settings;
			const num = _numSlides(mobile, tablet, desktop);
			instance.update({ perView: num });
		});
		instances[id] = instance;
	});
};
