const applyClasses = function (elements, classes) {
	if (classes.length === 1) {
		elements.forEach((element) => element.toggle(classes));
		return;
	}
};

export const toggle = function () {
	const toggles = document.querySelectorAll('[data-toggle]');

	toggles.forEach((toggle) => {
		const target = toggle.getAttribute('data-toggle');
		const classes = toggle.getAttribute('data-toggle-class');

		if (!classes || (classes && !classes.length)) return;

		if (target) {
			const elements = document.querySelectorAll(target);
			applyClasses(elements, classes);
			return;
		}

		applyClasses(toggle, classes);
	});
};
