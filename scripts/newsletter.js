import { Notyf } from 'notyf';
import { asyncTimeout, getCSSVariable, storage } from './utils.js';
import { options } from './toast.js';

const delay = parseInt(getCSSVariable('--animate-duration'));

/**
 * Tracks if newsletter form has been filled out
 * and success message is set
 */
export const newsletter = function () {
	const obj = storage.get();

	if (obj && obj.newsletter) return;

	if (window.Feather?.newsletter?.message) {
		let notyf = new Notyf(options());
		notyf.success(window.Feather.newsletter.message);
		storage.set({ key: 'newsletter', value: true });
		return;
	}
};
