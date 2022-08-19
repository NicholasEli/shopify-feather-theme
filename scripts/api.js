export const search = {
	get: async (term) => {
		try {
			const res = await fetch(
				`/search/suggest?q=${term}&resources[type]=product&resources[limit]=4&section_id=predictive-search`
			);

			if (!res.ok) {
				throw new Error(res.status);
			}

			const text = await res.text();

			return new DOMParser()
				.parseFromString(text, 'text/html')
				.querySelector('#shopify-section-predictive-search').innerHTML;
		} catch (err) {
			return err;
		}
	},
};

export const filter = {
	get: async (query) => {
		try {
			const res = await fetch(query);

			if (!res.ok) {
				throw new Error(res.status);
			}

			const text = await res.text();

			return new DOMParser()
				.parseFromString(text, 'text/html')
				.querySelector('[data-feather-results]').innerHTML;
		} catch (err) {
			return err;
		}
	},
};
