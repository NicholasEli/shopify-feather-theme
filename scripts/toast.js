import { getCSSVariable } from './utils.js';

const info = getCSSVariable('--info');
const warning = getCSSVariable('--warning');
const error = getCSSVariable('--error');
const success = getCSSVariable('--success');

/**
 * Toast message types
 * @param { string } text - message you be set
 **/

export const options = function () {
	return {
		duration: 5000,
		ripple: false,
		dismissible: false,
		position: {
			x: 'right',
			y: 'top',
		},
		types: [
			{
				type: 'error',
				backgroundColor: error,
			},
			{
				type: 'success',
				backgroundColor: success,
			},
		],
	};
};
