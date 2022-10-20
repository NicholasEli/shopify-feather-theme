import { Notyf } from 'notyf';
import { options } from './toast.js';

export const formErrors = function () {
	if (!window.Feather || (window.Feather && !window.Feather.form_errors)) return;
	if (!window.Feather.form_errors.length) return;

	const { form_errors } = window.Feather;

	form_errors.forEach((error) => {
		if (!error.field || !error.message.return) return;
		console.error(error);
		Notyf.error(error.message);
	});
};
