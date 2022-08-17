const state = {
	selects: {},
	set setSelect(select) {
		if (!select || (select && !select.id) || (select && !select.properties)) return;
		this.selects[select.id] = { ...select.properties };
	},
	set setActive({ id, callback }) {
		if (!id) return;
		const selects = Object.assign({}, state.selects);
		selects[id].dropdown.active = !state.selects[id].dropdown.active;
		this.selects = selects;

		if (callback) callback();
	},
};

const setUI = function (id) {
	const active = 'feather-select--active';
	const el = document.querySelector(`[data-select="${id}"]`);
	const dropdown = document.querySelector(`[data-select] + [data-select-dropdown="${id}"]`);
	el.parentElement.classList.toggle(active);

	document.body.addEventListener('click', (e) => {
		const { clientX, clientY } = e;
		const parentBounds = el.parentElement.getBoundingClientRect();
		const dropdownBounds = dropdown.getBoundingClientRect();

		if (!dropdown || el.parentElement.className.indexOf(active) === -1) return;

		if (clientX < dropdownBounds.x || clientX > dropdownBounds.x + dropdownBounds.width) {
			el.parentElement.classList.remove(active);
		}

		if (clientY < parentBounds.y || clientY > dropdownBounds.y + dropdownBounds.height) {
			el.parentElement.classList.remove(active);
		}
	});
};

export const select = function () {
	const selects = document.querySelectorAll('[data-select]');

	if (!selects || (selects && !selects.length)) return;

	selects.forEach((select) => {
		const obj = {
			id: null,
			properties: {
				dropdown: null,
			},
		};

		const id = select.getAttribute('data-select');
		if (!id) return;
		obj.id = id;

		const isDropdown = document.querySelector(`[data-select] + [data-select-dropdown="${id}"]`);

		if (isDropdown) {
			obj.properties.dropdown = { active: false };
			select.addEventListener('click', () => (state.setActive = { id, callback: () => setUI(id) }));
		}

		state.setSelect = obj;
	});
};
