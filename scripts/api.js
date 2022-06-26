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
