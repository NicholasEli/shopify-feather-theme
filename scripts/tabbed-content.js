const state = {
	tabs: {},
	set setTabs(tabs) {
		if (!tabs || (tabs && !Object.keys(tabs).length)) return;
		this.tabs = tabs;
	},
	set setActive({ tab, callback }) {
		if (!tab) return;

		const _tabs = Object.assign({}, state.tabs);

		for (const t in _tabs) {
			_tabs[t].active = false;
		}

		_tabs[tab.id].active = true;

		this.tabs = _tabs;

		if (callback) callback();
	},
};

/**
 * Sets UI of tab element
 * @param {Object} tab - DOM element representing tab item
 */
const setUI = function (tab) {
	const active = state.tabs[tab.id].active;

	for (const t in state.tabs) {
		state.tabs[t].tabEl.classList.remove('feather-tab-content__tab-item--active');
		state.tabs[t].contentEl.classList.remove('feather-tab-content__content-item--active');
	}

	if (active) {
		tab.tabEl.classList.add('feather-tab-content__tab-item--active');
		tab.contentEl.classList.add('feather-tab-content__content-item--active');
		return;
	}
};

/**
 * Tracks all tab elements in the DOM and sets them to state
 */
const setTabs = function () {
	const tabs = document.querySelectorAll('[data-tab]');

	if (!tabs || (tabs && !tabs.length)) return;

	let currentTab = null;
	const _state = Object.assign({}, state.tabs);
	tabs.forEach((tab, index) => {
		const id = tab.getAttribute('data-tab');
		const content = document.querySelector(`[data-tab-item="${id}"]`);

		if (!id || !content) return;

		const obj = {
			id,
			tabEl: tab,
			contentEl: content,
			active: false,
		};

		_state[id] = obj;
		if (index === 0) currentTab = obj;
	});

	state.setTabs = _state;
	state.setActive = { tab: currentTab, callback: () => setUI(currentTab) };
};

const tabActive = function (e, id) {
	if (e) e.preventDefault();

	const obj = {
		id,
		tabEl: document.querySelector(`[data-tab="${id}"]`),
		contentEl: document.querySelector(`[data-tab-item="${id}"]`),
		active: false,
	};

	state.setActive = { tab: obj, callback: () => setUI(obj) };
};

export const tabbedContent = function () {
	setTabs();
	window.tabActive = tabActive;
};
