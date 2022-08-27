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

/**
 * Mechanisim for filter API
 * @type {Object}
 */
export const filter = {
	/**
	 * Sets filter values
	 * @param  { string } query - filter values based on vartiant, option and sortby
	 * @return { string } HTML Markup
	 */
	set: async (query) => {
		try {
			const res = await fetch(query);

			if (!res.ok) {
				throw new Error(res.status);
			}

			const text = await res.text();

			const html = new DOMParser()
				.parseFromString(text, 'text/html')
				.querySelector('[data-feather-results]');

			if (!html) return { data: null };

			return {
				data: html.innerHTML,
			};
		} catch (err) {
			return err;
		}
	},
};

/**
 * Mechanisim for filter API
 * @type {Object}
 */
export const product = {
	recommendations: {
		get: async (section, product) => {
			try {
				const res = await fetch(
					`/recommendations/products?section_id=${section}&product_id=${product}`
				);

				if (!res.ok) {
					throw new Error(res.status);
				}

				const text = await res.text();

				const html = new DOMParser()
					.parseFromString(text, 'text/html')
					.querySelector('[data-recommendations]');

				if (!html) return { data: null };

				return {
					data: html,
				};
			} catch (err) {
				return err;
			}
		},
	},
};
