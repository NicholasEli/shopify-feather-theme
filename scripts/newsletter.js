import { modalOpen } from './modal.js';
import { asyncTimeout, getCSSVariable, getStorage } from './utils.js';

const delay = parseInt(getCSSVariable('--animate-duration'));

export const newsletter = function () {
	let storage = getStorage();

	if (!storage) modalOpen({ id: 'newsletter' });
	if (storage && !storage.newsletter) modalOpen(modal);
};
