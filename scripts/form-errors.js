import { Notyf } from 'notyf';
import { options } from './toast.js';

const errorUI = function (error) {
	const input = document.querySelector(`input[name="${error.form}[${error.field}]"]`);
	if (!input) return;

	const parent = input.parentElement;
	if (!parent || (parent && parent.className.indexOf('input') == -1)) return;
	parent.classList.add('input--error');
};

const toast = function (error) {
	const notyf = new Notyf();
	notyf.error(error.message);
};

export const formErrors = function () {
	if (!window.Feather || (window.Feather && !window.Feather.form_errors)) return;
	if (!window.Feather.form_errors.length) return;

	const { form_errors } = window.Feather;
	form_errors.forEach((error) => {
		if (!error.form || !error.field || !error.message) return;
		console.error(error.message);
		toast(error);
		errorUI(error);
	});
};
