/**
 * Mechanisim for predictive search API
 * https://shopify.dev/api/ajax/reference/predictive-search
 * @type {Object}
 */
export const search = {
	/**
	 * Searches for products based on term
	 * @param  {string} term - string for search query
	 * @return {object} returns success|error as data|error
	 */
	get: async (term) => {
		try {
			const res = await fetch(
				`/search/suggest?q=${term}&resources[type]=product&resources[limit]=4&section_id=predictive-search`
			);

			if (res && !res.ok) {
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

			if (res && !res.ok) {
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
 * https://shopify.dev/api/ajax/reference/cart
 * @type {Object}
 */
export const cart = {
	/**
	 * Gets cart and its lineitems
	 * @return {object}  returns success|error as data|error
	 */
	get: async () => {
		try {
			const res = await fetch(`/cart.js`, {
				method: 'GET',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
					'X-Requested-With': 'xmlhttprequest',
				},
			});

			if (res && !res.ok) {
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
	 * @param  {string} variant  - id of product variant
	 * @param  {number} quantity - quantity of variant to place in cart
	 * @return {object}  returns success|error as data|error
	 */
	add: async (id, quantity) => {
		try {
			const res = await fetch(`/cart/add.js`, {
				method: 'POST',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
					'X-Requested-With': 'xmlhttprequest',
				},
				body: JSON.stringify({
					id,
					quantity,
				}),
			});

			if (res && !res.ok) {
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
	 * @param  {object} updates  - variant property values
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

			if (res && !res.ok) {
				return { error: shopifyError(data) };
			}

			return { data };
		} catch (error) {
			return { error };
		}
	},
	/**
	 * Adds product variant to cart
	 * @param  {object} changes  - lineitem values with lineitem id as key
	 * @return {object} returns success|error as data|error
	 */
	change: async (changes) => {
		try {
			console.log(changes);
			const res = await fetch(`/cart/change.js`, {
				method: 'POST',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
					'X-Requested-With': 'xmlhttprequest',
				},
				body: JSON.stringify(changes),
			});

			if (!res) {
				return { error: 'No response' };
			}

			const data = await res.json();

			if (res && !res.ok) {
				return { error: shopifyError(data) };
			}

			return { data };
		} catch (error) {
			return { error };
		}
	},
};
