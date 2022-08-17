const state = {
	filters: {},
	set setFilters(filters) {
		if (!filters) return;
		this.filters = { ...this.filters, ...filters };
	},
	set setCheckbox(checkbox) {
		const { id, key, value } = checkbox;
		if (!id || !key) return;
		this.filters[id][key] = value;
	},
	set setInput(input) {
		if (!input.id || !input.key) return;

		this.filters[input.id][input.key] = input.value;
	},
	set setSortBy(sortby) {
		if (!sortby) return;

		this.sortby = sortby;
	},
};

const checklist = function () {
	const lists = document.querySelectorAll('[data-filter-checklist]');

	if (!lists || (lists && !lists.length)) return;

	const filters = Object.assign({}, state.filters);

	lists.forEach((list) => {
		const idKeyValue = list.getAttribute('data-filter-checklist').split(':');
		if (
			!idKeyValue ||
			(idKeyValue && !idKeyValue.length) ||
			(idKeyValue && idKeyValue.length && idKeyValue.length != 2)
		)
			return;

		const [id, key] = idKeyValue;

		if (!filters[id]) filters[id] = {};
		filters[id][key] = false;

		list.addEventListener('change', () => {
			state.setCheckbox = { id, key, value: list.checked };
		});
	});

	state.setFilters = filters;
};

const range = function () {
	const ranges = document.querySelectorAll('[data-filter-range]');

	if (!ranges || (ranges && !ranges.length)) return;

	const filters = Object.assign({}, state.filters);

	ranges.forEach((range) => {
		const keyValueInit = range.getAttribute('data-filter-range').split(':');

		if (!keyValueInit || (keyValueInit && !keyValueInit.length)) return;

		const [id, key, init] = keyValueInit;

		if (!filters[id]) filters[id] = {};

		filters[id][key] = init;

		range.addEventListener('keyup', () => {
			state.setInput = { id, key, value: range.value };
		});
	});

	state.setFilters = filters;
};

const sortby = function () {
	const el = document.querySelector('[data-sortby]');

	if (!el) return;

	const filters = Object.assign({}, state.filters);

	filters.sortby = null;

	state.setFilters = filters;

	el.addEventListener('change', () => {
		state.setSortBy = el.value;
	});
};

export const productFilter = function () {
	checklist();
	range();
	sortby();
};
