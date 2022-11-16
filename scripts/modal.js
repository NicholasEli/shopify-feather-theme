import { asyncTimeout, getCSSVariable } from './utils.js';
import { button } from './button.js';

const delay = parseInt(getCSSVariable('--animate-duration'));

const toggle = function () {
	const btns = document.querySelectorAll('[data-btn]');
	Array.from(btns)
		.filter((btn) => {
			const attr = btn.getAttribute('data-btn');
			if (attr.indexOf('data-modal') > -1 && attr.indexOf('data-modal-dialog') === -1) return btn;
			return null;
		})
		.forEach((btn) => {
			const attr = btn.getAttribute('data-btn');
			button(attr, async (e, { btn, target }) => {
				console.log(btn);
				// if (target.className.indexOf('feather-modal--active') > -1) {
				// 	console.log('close');
				// 	target.classList.add('animate__fadeOut');
				// 	await asyncTimeout(delay);
				// 	target.classList.remove('feather-modal--active', 'animate__fadeIn', 'animate__fadeOut');
				// 	return;
				// }

				// target.classList.add('feather-modal--active');
				// await asyncTimeout(delay);
				// target.classList.add('animate__fadeIn');
			});
		});
};

const close = function () {
	const modals = document.querySelectorAll('[data-modal]');
	const btns = document.querySelectorAll('[data-btn]');

	if (!modals || (modals && !modals.length)) return;

	const _close = async function (modal) {
		if (modal.className.indexOf('feather-modal--active') === -1) return;
		modal.classList.add('animate__fadeOut');
		await asyncTimeout(delay);
		modal.classList.remove('feather-modal--active', 'animate__fadeIn', 'animate__fadeOut');
	};

	Array.from(btns)
		.filter((btn) => {
			const attr = btn.getAttribute('data-btn');
			if (attr.indexOf('data-modal-dialog') > -1) return btn;
			return null;
		})
		.forEach((_btn) => {
			const attr = _btn.getAttribute('data-btn');
			button(attr, async (e, { btn, target }) => {
				const bounds = target.getBoundingClientRect();

				if (btn.className.indexOf('feather-modal--active') === -1) return;
				if (e.clientX < bounds.x || e.clientX > bounds.x + bounds.width) _close(btn);
				if (e.clientY < bounds.y || e.clientY > bounds.y + bounds.height) _close(btn);
			});
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
	//close();
};
