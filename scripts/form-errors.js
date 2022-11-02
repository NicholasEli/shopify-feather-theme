import { Notyf } from 'notyf';
import { options } from './toast.js';
import { asyncTimeout } from './utils';

let notyf = null;

/**
 * Sets input error UI needing correction, scrolls into view if input exists
 * @param { Object } error - object of error information
 * */
const errorUI = function (error) {
	const form = document.getElementById(error.section);
	if (!form) return;

	const bounds = form.getBoundingClientRect();
	window.scrollTo({ top: bounds.top + window.pageYOffset - 200, behavior: 'smooth' });

	const input = form.querySelector(`.form__input[data-input="${error.field}"]`);
	if (!input) return;

	input.classList.add('form__input--error');
};

/**
 * Handles notify notification
 * @param { Object } error - object of error information
 * */
const toast = function (error) {
	notyf.error(error.message);
};

/**
 * Reads form errors array in window.Feather object
 * */
export const formErrors = async function () {
	notyf = new Notyf({ duration: 5000 });
	if (!window.Feather || (window.Feather && !window.Feather.form_errors)) return;
	if (!window.Feather.form_errors.length) return;

	const { form_errors } = window.Feather;
	for (let error of form_errors) {
		if (!error.section || !error.form || !error.field || !error.message) return;
		if (error.form === 'register' && form_errors[0].form === 'login') return; // Register submits with login as default behavior
		console.error(error.message);
		toast(error);
		errorUI(error);
		await asyncTimeout(500);
	}
};
