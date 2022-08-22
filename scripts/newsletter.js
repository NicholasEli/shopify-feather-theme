import { modalOpen } from './modal.js';
import { asyncTimeout, getCSSVariable, getStorage } from './utils.js';

const delay = parseInt(getCSSVariable('--animate-duration'));

export const newsletter = function () {
	let storage = getStorage();

	console.log(window.Feather);
	if (window.Feather?.newsletter?.message) {
		return;
	}

	if (!storage) modalOpen({ id: 'newsletter' });
	if (storage && !storage.newsletter) modalOpen(modal);
};
