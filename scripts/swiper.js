import Swiper from 'swiper/bundle';

export const swiper = function () {
	const swipers = document.querySelectorAll('[data-swiper]');
	if (!swipers || (swipers && !swipers.length)) return;

	swipers.forEach((_swiper) => {
		const id = _swiper.getAttribute('data-swiper');
		const pagination = _swiper.getAttribute('data-pagination');
		const navigation = _swiper.getAttribute('data-navigation');
		const scrollbar = _swiper.getAttribute('data-scrollbar');
		const loop = _swiper.getAttribute('data-loop');

		const config = {
			direction: 'horizontal',
			loop: true,
		};

		if (pagination) {
			config.pagination = {
				el: '.swiper-pagination',
			};
		}

		if (navigation) {
			config.navigation = {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			};
		}

		if (scrollbar) {
			config.scrollbar = {
				el: '.swiper-scrollbar',
			};
		}

		if (loop) {
			config.loop = true;
		}

		new Swiper(`[data-swiper="${id}"]`, config);
	});
};
