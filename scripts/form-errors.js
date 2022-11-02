import { Notyf } from 'notyf';
import { options } from './toast.js';

const errorUI = function (error) {
	const form = document.getElementById(error.section);
	if (!form) return;

	const input = form.querySelector(`.form__input[data-input="${error.field}"]`);
	if (!input) return;

	const bounds = form.getBoundingClientRect();

	input.classList.add('form__input--error');

	window.scrollTo({ top: bounds.top + window.pageYOffset - 200, behavior: 'smooth' });
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
