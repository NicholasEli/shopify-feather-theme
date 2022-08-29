import { search as api } from './api.js';
import { getCSSVariable, asyncTimeout } from './utils.js';

const SEARCHING = 'form__input--searching';
const FADEIN = 'animate__fadeIn';
const FADEOUT = 'animate__fadeOut';

const delay = parseInt(getCSSVariable('--animate-duration'));
const state = {
	forms: {},
	results: null,
	/**
	 * Sets each search form and attaches its event listeners with callback
	 * @param  { object } forms - HTML markup for search form
	 */
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
	/**
	 * Sets search results
	 * @param { object } results - results of the most recent search
	 */
	set setResults({ results, callback }) {
		this.results = results;

		if (!results) return;
		if (callback) callback();
	},
};

/**
 * Conducts search via API
 * @param  { string } id - id of form based on index of position in document
 */
const doSearch = async function (id) {
	try {
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
			const res = await api.get(this.value);

			if (res && res.data) {
				state.setResults = { results: { id, results: res.data }, callback: displayResults };
				inputContainer.classList.remove(SEARCHING);
			}
		}, 500);
	} catch (error) {
		console.log(error);
	}
};

/**
 * Sets markup of search results and reinstantiates events
 * listeners for new markup
 */
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

/**
 * Clears search results
 */
const clearResults = async function () {
	if (!state.results) return;

	const { results, id } = state.results;
	const input = state.forms[id].input;
	const container = state.forms[id].results;

	input.value = '';
	state.setResults = { results: null, callback: null };
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
