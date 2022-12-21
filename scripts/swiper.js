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
		const spaceBetweenSlides = _swiper.getAttribute('data-space-between-slides');
		const slidesPerViewMobile = _swiper.getAttribute('data-slides-per-view-mobile');
		const slidesPerViewDesktop = _swiper.getAttribute('data-slides-per-view-desktop');

		const config = {
			direction: 'horizontal',
			loop: true,
			slidesPerView: 1,
			breakpoints: {
				950: {
					slidesPerView: 1,
				},
			},
		};

		if (pagination) {
			config.pagination = {
				el: '.swiper-pagination',
				clickable: true,
			};
		}

		if (navigation) {
			config.navigation = {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
				clickable: true,
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

		if (spaceBetweenSlides) {
			config.spaceBetween = parseInt(spaceBetweenSlides);
		}

		if (slidesPerViewMobile) {
			config.slidesPerView = parseInt(slidesPerViewMobile);
		}

		if (slidesPerViewMobile) {
			config.breakpoints[950].slidesPerView = parseInt(slidesPerViewDesktop);
		}

		console.log(config);

		new Swiper(`[data-swiper="${id}"]`, config);
	});
};
