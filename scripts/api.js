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
 * Mechanisim for cart API
 * @type {Object}
 */
export const cart = {
	/**
	 * Adds product variant to cart
	 * @param  {object} variant  - variant of product
	 * @param  {number} quantity - quantity of variant to place in cart
	 * @return {object}  returns success|error as data|error
	 */
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
	/**
	 * Adds product variant to cart
	 * @param  {object} updates  - variant values with object and quantity
	 * @param  {object} updates.id  - id of variant
	 * @param  {object} updates.quantity  - quantity of variant
	 * @return {object} returns success|error as data|error
	 */
	update: async (updates) => {
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
	/**
	 * Adds product variant to cart
	 * @param  {object} lineitems  - lineitem values with lineitem id as key
	 * @return {object} returns success|error as data|error
	 */
	update: async (lineitems) => {
		try {
			const res = await fetch(`/cart/change.js`, {
				method: 'POST',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
					'X-Requested-With': 'xmlhttprequest',
				},
				body: JSON.stringify(changes),
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
