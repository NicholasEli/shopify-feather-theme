import Swiper from 'swiper/bundle';

export const swiper = function () {
	const swipers = document.querySelectorAll('[data-swiper]');
	console.log('gettings');
	if (!swipers || (swipers && !swipers.length)) return;

	swipers.forEach((_swiper) => {
		const id = _swiper.getAttribute('data-swiper');

		const config = {
			// Optional parameters
			direction: 'horizontal',
			loop: true,

			// If we need pagination
			pagination: {
				el: '.swiper-pagination',
			},

			// Navigation arrows
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},

			// And if we need scrollbar
			scrollbar: {
				el: '.swiper-scrollbar',
			},
		};

		new Swiper(`[data-swiper="${id}"]`, config);
	});
};
