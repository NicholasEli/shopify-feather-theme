import { asyncTimeout, getCSSVariable } from './utils.js';
import { button } from './button.js';

const delay = parseInt(getCSSVariable('--animate-duration'));

const open = function () {
	const btns = button('modal', async (selector) => {
		const modal = document.querySelector(selector);
		if (!modal) return;

		if (modal.className.indexOf('feather-modal--active') > -1) {
			modal.classList.add('animate__fadeOut');
			await asyncTimeout(delay);
			modal.classList.add('feather-modal--active', 'animate__fadeIn', 'animate__fadeOut');
			return;
		}

		modal.classList.add('feather-modal--active');
		await asyncTimeout(delay);
		modal.classList.add('animate__fadeIn');
	});
};

export const modal = function () {
	open();
};
