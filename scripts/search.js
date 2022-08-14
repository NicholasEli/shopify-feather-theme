import { search as api } from './api.js';
import { getCSSVariable, asyncTimeout } from './utils.js';

const SEARCHING = 'form__input--searching';
const FADEIN = 'animate__fadeIn';
const FADEOUT = 'animate__fadeOut';

const delay = parseInt(getCSSVariable('--animate-duration'));
const state = {
	forms: {},
	results: null,
	set initForms(forms) {
		if (!forms) return;

		const obj = {};
		forms.forEach((form, id) => {
			form.addEventListener('submit', (e) => e.preventDefault());
			const input = form.querySelector('input');
			const results = form.querySelector('.form__search-results');

			obj[id] = {
				form,
				input,
				results,
			};

			obj[id].input.addEventListener('keyup', doSearch.bind(input, id));
		});

		this.forms = obj;
	},
	set setResults(results) {
		this.results = results;

		if (!results) return;
		if (callback) callback();
	},
};

const doSearch = async function (id) {
	const inputContainer = this.parentElement;
	let timeout = null;
	clearTimeout(timeout);

	if (!this.value) {
		timeout = null;
		clearResults();
		return;
	}

	inputContainer.classList.add(SEARCHING);
	timeout = setTimeout(async () => {
		const results = await api.get(this.value);
		state.setResults = { results: { id, results }, callback: displayResults };
		inputContainer.classList.remove(SEARCHING);
	}, 500);
};

const displayResults = function () {
	if (!state.results) return;
	const { id, results } = state.results;

	const container = state.forms[id].results;
	container.innerHTML = results;
	container.classList.remove(FADEOUT);
	container.classList.add(FADEIN);

	const _close = (e) => {
		const { x, y, width, height } = container.getBoundingClientRect();
		const { clientX, clientY } = e;

		if (clientX < x || clientX > x + width) {
			clearResults();
			document.removeEventListener('click', _close);
		}
		if (clientY < y || clientY > y + height) {
			clearResults();
			document.removeEventListener('click', _close);
		}
	};

	document.addEventListener('click', _close);
};

const clearResults = async function () {
	if (!state.results) return;

	const { results, id } = state.results;
	const input = state.forms[id].input;
	const container = state.forms[id].results;

	input.value = '';
	state.setResults = null;
	container.classList.add(FADEOUT);

	await asyncTimeout(delay);

	container.innerHTML = '';
	container.classList.remove(FADEOUT);
	container.classList.remove(FADEIN);
};

export const search = async function () {
	const forms = document.querySelectorAll('.feather-header__search form');
	state.initForms = forms;
};
