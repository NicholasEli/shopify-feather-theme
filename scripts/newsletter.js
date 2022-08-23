import { Notyf } from 'notyf';
import { asyncTimeout, getCSSVariable, storage } from './utils.js';
import { options } from './toast.js';
import { modalOpen } from './modal.js';

const delay = parseInt(getCSSVariable('--animate-duration'));

export const newsletter = function () {
	const obj = storage.get();

	if (obj && obj.newsletter) return;

	if (window.Feather?.newsletter?.message) {
		let notyf = new Notyf(options());
		notyf.success(window.Feather.newsletter.message);
		storage.set({ key: 'newsletter', value: true });
		return;
	}

	if (!obj) modalOpen({ id: 'newsletter' });
	if (obj && !obj.newsletter) modalOpen({ id: 'newsletter' });
};
