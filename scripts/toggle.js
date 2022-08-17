import { getCSSVariable, asyncTimeout } from './utils.js';

const delay = getCSSVariable('--animate-duration');

const applyClasses = async function (elements, classlist) {
	if (!classlist || (classlist && !classlist.length)) return;

	const arr = classlist.split(',');
	const [active, inactive] = arr;

	if (arr.length === 1) {
		elements.forEach((element) => element.toggle(active));
		return;
	}

	for (element of elements) {
		if (!active) {
			element.classlist.add(active);
			return;
		}

		if (active) {
			classlist.add(inactive);

			await asyncTimeout(delay);

			classlist.remove(active);
			classlist.remove(inactive);
		}
	}
};

export const toggle = function () {
	const toggles = document.querySelectorAll('[data-toggle]');

	toggles.forEach((toggle) => {
		const target = toggle.getAttribute('data-toggle');
		const classlist = toggle.getAttribute('data-toggle-class');

		if (target) {
			const elements = document.querySelectorAll(target);
			applyClasses(elements, classlist);
			return;
		}

		applyClasses(toggle, classlist);
	});
};
