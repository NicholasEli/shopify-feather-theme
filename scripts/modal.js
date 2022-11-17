import { asyncTimeout, getCSSVariable } from './utils.js';

const delay = parseInt(getCSSVariable('--animate-duration'));

const modalActiveUI = async function (e, id) {
	if (e) event.preventDefault();

	const _modal = document.querySelector(`[data-modal="${id}"]`);
	if (!_modal) return;

	_modal.classList.add('feather-modal--active');
	await asyncTimeout(delay);
	_modal.classList.add('animate__fadeIn');
};

const modalInactiveUI = async function (e, id) {
	if (e) event.preventDefault();

	const _modal = document.querySelector(`[data-modal="${id}"]`);
	if (!_modal) return;

	_modal.classList.add('animate__fadeOut');
	await asyncTimeout(delay);
	_modal.classList.remove('feather-modal--active', 'animate__fadeIn', 'animate__fadeOut');
};

const modalUIBounds = function (e, id) {
	const _modal = document.querySelector(`[data-modal="${id}"]`);
	const dialog = _modal.querySelector('[data-modal-dialog]');
	const bounds = dialog.getBoundingClientRect();

	if (e.clientX < bounds.x || e.clientX > bounds.x + bounds.width) modalInactiveUI(e, id);
	if (e.clientY < bounds.y || e.clientY > bounds.y + bounds.height) modalInactiveUI(e, id);
};

export const modal = function () {
	const modals = document.querySelectorAll('[data-modal]');
	window.modalActiveUI = modalActiveUI;
	window.modalInactiveUI = modalInactiveUI;
	window.modalUIBounds = modalUIBounds;

	document.addEventListener('keyup', (e) => {
		if (e.keyCode === 27) {
			for (let _modal of modals) {
				modalInactiveUI(e, _modal.getAttribute('data-modal'));
			}
		}
	});
};
