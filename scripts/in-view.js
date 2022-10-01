import { intersectionObserver } from './utils.js';

/**
 * Determines when element is inside the viewport.
 * If element is in view, will set value to true
 * @param {Boolean} force - skips waiting for scroll into viewport
 */
export const inView = function (force) {
	const elements = document.querySelectorAll('[data-in-view]');
	elements.forEach((el) => {
		if (force) {
			el.setAttribute('data-in-view', 'true');
			return;
		}
		intersectionObserver(
			el,
			(e) => {
				if (e[0].isIntersecting) {
					el.setAttribute('data-in-view', 'true');
				}
			},
			{ threshold: 0.75 }
		);
	});
};
