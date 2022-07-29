import Glide from '@glidejs/glide';

const instances = {};

export const productSpotlight = function () {
	const spotlights = document.querySelectorAll('[data-glide]');
	console.log(spotlights);
	if (!spotlights || (spotlights && spotlights.length == 0)) return;

	spotlights.forEach((spotlight) => {
		const id = spotlight.getAttribute('data-glide');
		const instance = new Glide('[data-glide="' + id + '"]');
		instance.mount();
		instances[id] = instance;
	});
};
