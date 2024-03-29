import { getCSSVariable, asyncTimeout } from './utils.js';

const delay = parseInt(getCSSVariable('--animate-duration'));

/**
 * Sets toggle classes based on inactive or active state.
 * @param  { array } elements - array of toggles to apply class list
 * @param  { string } classlist - comma separated values of active and inactive class
 */
const applyClasses = async function (elements, classlist) {
	if (!classlist || (classlist && !classlist.length)) return;

	const arr = classlist.split(',');
	const [active, inactive] = arr;

	if (arr.length === 1) {
		elements.forEach((element) => element.toggle(active));
		return;
	}

	for (let element of elements) {
		if (element.className.indexOf(active) === -1) {
			element.classList.add(active);
			return;
		}

		if (element.className.indexOf(active) > -1) {
			element.classList.add(inactive);

			await asyncTimeout(delay);

			element.classList.remove(active, inactive);
		}
	}
};

/**
 * Aggregates toggle elements and applies event listeners
 */
export const toggle = function () {
	const toggles = document.querySelectorAll('[data-toggle]');

	toggles.forEach((toggle) => {
		toggle.addEventListener('click', () => {
			const target = toggle.getAttribute('data-toggle');
			const classlist = toggle.getAttribute('data-toggle-class');

			if (target) {
				const elements = document.querySelectorAll(target);
				applyClasses(elements, classlist);
				return;
			}

			applyClasses(toggle, classlist);
		});
	});
};
