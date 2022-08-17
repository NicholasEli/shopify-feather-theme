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
		console.log(list);
		const id = list.getAttribute('data-filter-checklist').split(':')[0];
		if (id && !filters[id]) filters[id] = [];
	});

	state.setFilters = filters;
};

export const productFilter = function () {
	checklist();
};
