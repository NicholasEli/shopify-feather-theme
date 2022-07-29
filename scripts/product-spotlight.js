import { uuidv4 } from './utils.js';
import Glide from '@glidejs/glide';

export const productSpotlight = function () {
	const spotlights = document.querySelectorAll('[data-glide]');
	console.log(spotlights);
	if (!spotlights || (spotlights && spotlights.length == 0)) return;

	spotlights.forEach((spotlight) => {
		spotlight.setAttribute('data-glide', uuidv4());
	});
};
