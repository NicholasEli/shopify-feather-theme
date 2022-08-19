import { intersectionObserver } from './utils.js';

/**
 * Determines when element is inside the viewport.
 * If element is in view, will set value to true
 */
export const inView = function () {
	const elements = document.querySelectorAll('[data-in-view]');
	elements.forEach((el) => {
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
