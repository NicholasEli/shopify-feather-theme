import { asyncTimeout, getCSSVariable } from './utils.js';

const delay = parseInt(getCSSVariable('--animate-duration'));

const state = {
	modals: {},
	set setModals(modals) {
		if (!modals) return;
		this.modals = modals;
	},
	set setActive({ id, active }) {
		if (!id || active === undefined || !this.modals[id]) return;
		this.modals[id].active = !this.modals[id].active;
		setUI(this.modals[id]);
	},
};

const setUI = async function (modal) {
	if (modal.active) {
		modal.el.classList.add('feather-modal--active');

		await asyncTimeout(500);
		modal.el.classList.add('animate__fadeIn');

		await asyncTimeout(500);
		modal.dialog.classList.add('animate__fadeInDown');

		return;
	}

	modal.dialog.classList.add('animate__fadeOutUp');

	await asyncTimeout(delay);
	modal.el.classList.add('animate__fadeOut');
	modal.dialog.classList.remove('animate__fadeInDown');

	await asyncTimeout(delay);
	modal.el.classList.remove('animate__fadeOut', 'animate__fadeIn', 'feather-modal--active');
	modal.dialog.classList.remove('animate__fadeOutUp');
};

export const modalOpen = function (modal) {
	state.setActive = { id: modal.id, active: true };
};

export const modalClose = function (modal) {
	modal.close.addEventListener(
		'click',
		async () => (state.setActive = { id: modal.id, active: false })
	);
	document.addEventListener('keyup', (e) => {
		if (e.keyCode == 27 && state.modals[modal.id].active) {
			state.setActive = { id: modal.id, active: false };
		}
	});
};

const setModals = function () {
	const modals = document.querySelectorAll('[data-modal]');

	if (!modals || (modals && !modals.length)) return;

	const _state = Object.assign({}, state.modals);

	modals.forEach((modal) => {
		const id = modal.getAttribute('data-modal');

		_state[id] = {
			id,
			el: modal,
			dialog: modal.querySelector('[data-modal-dialog]'),
			close: modal.querySelector('[data-modal-close]'),
			active: false,
		};

		modalClose(_state[id]);
	});

	state.setModals = _state;
};

export const modal = function () {
	setModals();
};
