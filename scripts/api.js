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

			const html = new DOMParser()
				.parseFromString(text, 'text/html')
				.querySelector('#shopify-section-predictive-search');

			if (!html) return { data: null };

			return {
				data: html.innerHTML,
			};
		} catch (error) {
			return { error };
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
		} catch (error) {
			return { error };
		}
	},
};

/**
 * Mechanisim for filter API
 * @type {Object}
 */
export const cart = {
	add: async (variant, quantity) => {
		try {
			const res = await fetch(`/cart/add.js`, {
				method: 'POST',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
					'X-Requested-With': 'xmlhttprequest',
				},
				body: JSON.stringify({
					id: variant.id,
					quantity,
				}),
			});

			if (!res.ok) {
				return { error: shopifyError(data) };
			}

			const data = await res.json();

			return { data };
		} catch (error) {
			return { error };
		}
	},
	update: async (lineitems) => {
		try {
			const res = await fetch(`/cart/update.js`, {
				method: 'POST',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
					'X-Requested-With': 'xmlhttprequest',
				},
				body: JSON.stringify({
					updates: lineitems,
				}),
			});

			const data = await res.json();

			if (!res.ok) {
				return { error: shopifyError(data) };
			}

			return { data };
		} catch (error) {
			return { error };
		}
	},
};
