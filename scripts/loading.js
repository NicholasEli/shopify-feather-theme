export const loading = function () {
	if (!window.fetch) return;

	let requests = 0;

	const mock = window.fetch;
	window.fetch = async function () {
		requests++;
		const response = await mock.apply(this, arguments);
		if (response && response.status === 200) {
			requests--;
			return response;
		}

		return null;
	};
};
