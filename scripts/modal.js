import { asyncTimeout, getCSSVariable } from './utils.js';

const delay = parseInt(getCSSVariable('--animate-duration'));

const state = {
	modals: {},
	set setModals(modals) {
		if (!modals) return;
		this.modals = modals;
	},
};

export const modalOpen = async function (modal) {
	modal.el.classList.add('feather-modal--active');

	await asyncTimeout(500);
	modal.el.classList.add('animate__fadeIn');

	await asyncTimeout(500);
	modal.dialog.classList.add('animate__fadeInDown');
};

const modalClose = function (modal) {
	modal.close.addEventListener('click', async () => {
		modal.dialog.classList.add('animate__fadeOutUp');

		await asyncTimeout(delay);
		modal.el.classList.add('animate__fadeOut');
		modal.dialog.classList.remove('animate__fadeInDown');

		await asyncTimeout(delay);
		modal.el.classList.remove('animate__fadeOut', 'animate__fadeIn', 'feather-modal--active');
		modal.dialog.classList.remove('animate__fadeOutUp');
	});
};

const setModals = function () {
	const modals = document.querySelectorAll('[data-modal]');

	if (!modals || (modals && !modals.length)) return;

	const _state = Object.assign({}, state.modals);

	modals.forEach((modal) => {
		const id = modal.getAttribute('data-modal');

		_state[id] = {
			el: modal,
			dialog: modal.querySelector('[data-modal-dialog]'),
			close: modal.querySelector('[data-modal-close]'),
		};

		modalClose(_state[id]);
	});

	state.setModals = _state;
};

export const modal = function () {
	setModals();
};
