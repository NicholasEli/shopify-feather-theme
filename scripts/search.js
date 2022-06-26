import { search as api } from './api.js';
import { getCSSVariable } from './utils.js';

let time = 0;

const clearResults = function () {
	const results = document.querySelectorAll('.form__search-results');
	results.forEach((container) => {
		container.classList.add('animate__fadeOut');
		setTimeout(() => (container.innerHTML = ''), time);
	});
};

const searchResults = async function (term, input) {
	if (!term || !input) return;

	const container = input.parentElement.nextElementSibling;
	const res = await api.get(term);

	container.innerHTML = res;
	container.classList.remove('animate__fadeOut');
	container.classList.add('animate__animated');
	container.classList.add('animate__fadeIn');
};

const searchTerm = function () {
	const forms = document.querySelectorAll('.feather-header__search form');
	const inputs = document.querySelectorAll('.feather-header__search input');
	let timeout = null;
	forms.forEach((form) => form.addEventListener('submit', (e) => e.preventDefault()));
	inputs.forEach((input) => {
		input.addEventListener('keyup', (e) => {
			const value = e.currentTarget.value;
			if (!value || (value && value === '')) {
				clearTimeout(timeout);
				timeout = null;
				clearResults();
				return;
			}
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				searchResults(value, input);
			}, 500);
		});
	});
};

export const search = async function () {
	time = parseInt(getCSSVariable('--animate-duration'));
	searchTerm();
};
