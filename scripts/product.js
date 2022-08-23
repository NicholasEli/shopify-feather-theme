const variantSlider = function () {
	const slider = document.querySelectorAll('[data-variant-slider]');

	if (!slider || (slider && slider.length == 0)) return;

	spotlights.forEach((spotlight) => {
		const id = slider.getAttribute('data-variant-slider');
		const instance = new Glide('[data-variant-slider="' + id + '"]', { perView: 1 });
		instance.mount();
	});
};

export const product = function () {};
