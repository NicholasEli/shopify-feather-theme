import { modalOpen } from './modal.js';
import { asyncTimeout, getCSSVariable, getStorage } from './utils.js';

const delay = parseInt(getCSSVariable('--animate-duration'));
let modal = null;

export const newsletter = function () {
	const container = document.querySelector('[data-modal="newsletter"]');
	let storage = getStorage();

	if (container) {
		modal = {
			el: container,
			dialog: container.querySelector('[data-modal-dialog]'),
			close: container.querySelector('[data-modal-close]'),
		};
	}

	if (!storage && modal) {
		modalOpen(modal);
		return;
	}

	if (storage && !storage.newsletter && modal) {
		modalOpen(modal);
	}
};
