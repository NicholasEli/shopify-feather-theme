import Swiper from 'swiper/bundle';

export const swiper = function () {
	const swipers = document.querySelectorAll('[data-swiper]');
	console.log('gettings');
	if (!swipers || (swipers && !swipers.length)) return;

	console.log(swipers);
};
