import { asyncTimeout, getCSSVariable } from './utils.js';
import { button } from './button.js';

const delay = parseInt(getCSSVariable('--animate-duration'));

const toggle = function () {
	const btns = button('modal', async (selector) => {
		const modal = document.querySelector(selector);
		if (!modal) return;

		if (modal.className.indexOf('feather-modal--active') > -1) {
			modal.classList.add('animate__fadeOut');
			await asyncTimeout(delay);
			modal.classList.remove('feather-modal--active', 'animate__fadeIn', 'animate__fadeOut');
			return;
		}

		modal.classList.add('feather-modal--active');
		await asyncTimeout(delay);
		modal.classList.add('animate__fadeIn');
	});
};

const close = function () {
	const modals = document.querySelectorAll('[data-modal]');

	if (!modals || (modals && !modals.length)) return;

	const _close = async function (modal) {
		if (modal.className.indexOf('feather-modal--active') === -1) return;
		modal.classList.add('animate__fadeOut');
		await asyncTimeout(delay);
		modal.classList.remove('feather-modal--active', 'animate__fadeIn', 'animate__fadeOut');
	};

	document.addEventListener('click', (e) => {
		for (let modal of modals) {
			const dialog = modal.querySelector('.feather-modal__dialog');
			const bounds = dialog.getBoundingClientRect();

			if (modal.className.indexOf('feather-modal--active') === -1) return;
			if (e.clientX < bounds.x || e.clientX > bounds.x + bounds.width) _close(modal);
			if (e.clientY < bounds.y || e.clientY > bounds.y + bounds.height) _close(modal);
		}
	});

	document.addEventListener('keyup', (e) => {
		if (e.keyCode === 27) {
			for (let modal of modals) {
				_close(modal);
			}
		}
	});
};

export const modal = function () {
	toggle();
	close();
};
