import { Notyf } from 'notyf';
import { asyncTimeout, getCSSVariable, getStorage } from './utils.js';
import { options } from './toast.js';
import { modalOpen } from './modal.js';

const delay = parseInt(getCSSVariable('--animate-duration'));

export const newsletter = function () {
	const storage = getStorage();

	if (window.Feather?.newsletter?.message) {
		let notyf = new Notyf(options());
		notyf.success(window.Feather.newsletter.message);
		return;
	}

	if (!storage) modalOpen({ id: 'newsletter' });
	if (storage && !storage.newsletter) modalOpen(modal);
};
