import { Notyf } from 'notyf';
import { options } from './toast.js';
import { asyncTimeout } from './utils';

let notyf = null;

/**
 * Handles notify notification
 * @param { string } success - success message
 * */
const toast = function (message) {
	notyf.success(message);
};

/**
 * Reads form errors array in window.Feather object
 * */
export const formSuccess = async function () {
	notyf = new Notyf({ duration: 5000 });
	if (!window.Feather || (window.Feather && !window.Feather.form_success)) return;
	const { form_success } = window.Feather;
	if (!form_success.message) return;
	toast(form_success.message);
};
