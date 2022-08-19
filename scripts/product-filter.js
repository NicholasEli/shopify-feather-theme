import { filter } from './api.js';
import { inView } from './in-view.js';

const state = {
	filters: {},
	sortby: {
		value: null,
		callback: null,
	},
	set setFilters(filters) {
		if (!filters) return;
		this.filters = { ...this.filters, ...filters };
	},
	set setList(checklist) {
		const { list, listItem, value, callback } = checklist;

		if (!list || !listItem) return;

		this.filters[list][listItem].value = value;

		if (callback) callback();
	},
	set setRange(range) {
		const { list, listItem, value, callback } = range;

		if (!list || !listItem) return;

		this.filters[list][listItem].value = value;

		if (callback) callback();
	},
	set setSortBy(sortby) {
		const { value, callback } = sortby;

		this.sortby = value;

		if (callback) callback();
	},
};

const checklist = function () {
	const checklists = document.querySelectorAll('[data-filter-checklist]');

	if (!checklists && checklists && !checklists.length) return;

	let filters = Object.assign({}, state.filters);
	checklists.forEach((item) => {
		const list = item.getAttribute('data-filter-checklist');
		const listItem = item.getAttribute('data-filter-checklist-item');
		const { name, value } = item;

		if (!filters[list]) filters[list] = {};
		if (!filters[list][listItem]) filters[list][listItem] = {};
		filters[list][listItem].value = null;
		filters[list][listItem].query = name;

		item.addEventListener('change', () => {
			const obj = { list, listItem, callback: setQuery };

			if (item.checked) obj.value = value;
			if (!item.checked) obj.value = null;

			state.setList = obj;
		});
	});

	state.setFilters = filters;
};

const priceRange = function () {
	const ranges = document.querySelectorAll('[data-filter-price-range]');
	if (!ranges && ranges && !ranges.length) return;

	const filters = Object.assign({}, state.filters);
	ranges.forEach((item) => {
		const list = item.getAttribute('data-filter-price-range');
		const listItem = item.getAttribute('data-filter-price-range-item');
		const { name, value } = item;

		if (!filters[list]) filters[list] = {};
		if (!filters[list][listItem]) filters[list][listItem] = {};
		filters[list][listItem].value = value;
		filters[list][listItem].query = name;

		let timeout = null;
		item.addEventListener('keyup', () => {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			timeout = setTimeout(() => {
				state.setRange = { list, listItem, value: item.value, callback: setQuery };
			}, 500);
		});
	});

	state.setFilters = filters;
};

const sortby = function () {
	const el = document.querySelector('[data-sortby]');

	if (!el) return;

	el.addEventListener('change', () => {
		if (!el.value || el.value === null || el.value === 'null') {
			state.setSortBy = { value: null, callback: setQuery };
			return;
		}

		state.setSortBy = { value: el.value, callback: setQuery };
	});
};

const setQuery = async function () {
	try {
		if (!window.Feather || (window.Feather && !window.Feather.path)) return;

		let filters = [];

		for (let filter in state.filters) {
			const items = state.filters[filter];
			for (let key in items) {
				const { value, query } = items[key];
				if (value) filters.push(query + '=' + value);
			}
		}

		let query = window.Feather.path;

		if (filters && filters.length) query += '?' + filters.join('&');

		if (state.sortby && filters && filters.length) query += '&sort_by=' + state.sortby;
		if (state.sortby && filters && !filters.length) query += '?sort_by=' + state.sortby;

		const res = await filter.get(query);

		setUI(res);
	} catch (err) {
		console.error(err);
	}
};

const setUI = function (html) {
	const container = document.querySelector('[data-feather-results]');

	if (html && container) {
		container.innerHTML = html;
		inView();
	}
};

export const productFilter = function () {
	checklist();
	priceRange();
	sortby();
};
