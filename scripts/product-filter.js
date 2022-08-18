const state = {
	filters: {},
	sortby: {},
	set setFilters(filters) {
		if (!filters) return;
		this.filters = { ...this.filters, ...filters };
	},
	set setList(list) {
		const { id, key, value } = list;
		if (!id || !key) return;
		this.filters[id][key] = value;
	},
	set setRange(range) {
		if (!input.id || !input.key) return;

		this.filters[input.id][input.key] = input.value;
	},
	set setSortBy(sortby) {
		if (!sortby || (sortby && !sortby.value)) return;

		this.sortby = sortby.value;

		if (sortby.callback) sortby.callback();
	},
};

const checklist = function () {
	const checklists = document.querySelectorAll('[data-filter-checklist]');

	if (!checklists && checklists && !checklists.length) return;

	const filters = Object.assign({}, state.filters);
	checklists.forEach((item) => {
		const list = item.getAttribute('data-filter-checklist');
		const listItem = item.getAttribute('data-filter-checklist-item');
		const { name, value } = item;

		if (!filters[list]) filters[list] = {};
		if (!filters[list][listItem]) filters[list][listItem] = {};
		filters[list][listItem].value = value;
		filters[list][listItem].query = name;
	});

	state.setFilters = filters;
};

const priceRange = function () {
	const checklists = document.querySelectorAll('[data-filter-price-range]');

	if (!checklists && checklists && !checklists.length) return;

	const filters = Object.assign({}, state.filters);
	checklists.forEach((item) => {
		const list = item.getAttribute('data-filter-price-range');
		const listItem = item.getAttribute('data-filter-price-range-item');
		const { name, value } = item;

		if (!filters[list]) filters[list] = {};
		if (!filters[list][listItem]) filters[list][listItem] = {};
		filters[list][listItem].value = value;
		filters[list][listItem].query = name;
	});

	state.setFilters = filters;
};

const querySortBy = async function () {
	const params = new URLSearchParams({
		sort_by: state.sortby,
	});

	const url = new URL(window.location.href);
	url.searchParams.set('sort_by', state.sortby);

	const res = await fetch(url.href);
	const html = await res.text();
	console.log(html);
	//window.location = url.href;
};

const sortby = function () {
	const el = document.querySelector('[data-sortby]');

	if (!el) return;

	el.addEventListener('change', () => {
		state.setSortBy = { value: el.value, callback: querySortBy };
	});
};

export const productFilter = function () {
	console.clear();
	checklist();
	priceRange();
	console.log(state);
};
