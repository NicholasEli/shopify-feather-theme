const state = {
	modals: {},
	set setModals(modals) {
		if (!modals) return;
		this.modals = modals;
	},
};

const setModals = function () {
	const modals = document.querySelectorAll('[data-modal]');

	if (!modals || (modals && !modals.length)) return;

	const state = Object.assign({}, state.modals);
	modals.forEach((mdoal) => {
		const id = modal.getAttribute('data-modal');
		obj[id] = {
			el: modal,
			dialog: modal.querySelector('.feather-modal__dialog'),
			active: false,
		};
	});

	state.setModals = state;
};

export const modal = function () {
	setModals();
};
