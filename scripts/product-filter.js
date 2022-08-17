const state = {
	filters: {},
	set setFilters(filters) {
		if (!filters) return;
		this.filters = { ...this.filters, ...filters };
	},
};

const checklist = function () {
	const lists = document.querySelectorAll('[data-filter-checklist]');

	if (!lists || (lists && !lists.length)) return;

	const filters = Object.assign({}, state.filters);

	lists.forEach((list) => {
		const id = list.getAttribute('data-filter-checklist').split(':')[0];
		if (id && !filters[id]) filters[id] = [];
	});

	state.setFilters = filters;
};

const range = function () {
	const ranges = document.querySelectorAll('[data-filter-range]');

	if (!ranges || (ranges && !ranges.length)) return;

	const filters = Object.assign({}, state.filters);

	ranges.forEach((range) => {
		const keyValue = range.getAttribute('data-filter-range').split(':');

		if (!keyValue || (keyValue && !keyValue.length)) return;

		const [key, value, init] = keyValue;

		if (!filters[key]) filters[key] = {};

		filters[key][value] = init;
	});

	state.setFilters = filters;
};

export const productFilter = function () {
	console.clear();
	checklist();
	range();
	console.log(state.filters);
};
