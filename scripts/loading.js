import { asyncTimeout } from './utils.js';

let requests = 0;

const setUI = async function (requests) {
	const el = document.querySelector('[data-loading]');
	el.setAttribute('data-loading', 'true');

	const increment = 10 / requests;
	el.style.width = increment + '%';

	const _reset = function () {
		el.setAttribute('data-loading', 'false');
		el.style.width = '0%';
	};

	const _animate = function () {
		const percentage = parseInt(el.style.width) + increment;
		setTimeout(() => {
			if (requests > 0 && requests < 100) {
				el.style.width = percentage + '%';
			} else {
				_reset();
			}
		}, 500);
	};

	_animate();

	if (requests === 0 || !requests) {
		requests = 0;
		el.style.width = '100%';
		await asyncTimeout(200);
		_reset();
		return;
	}
};

export const loading = function () {
	if (!window.fetch) return;

	const mock = window.fetch;
	window.fetch = async function () {
		requests++;
		setUI(requests);

		const response = await mock.apply(this, arguments);

		setUI(requests);
		requests--;
		setUI(requests);

		if (response && response.status === 200) {
			return response;
		}
		return null;
	};
};
