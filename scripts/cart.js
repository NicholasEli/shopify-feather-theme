import currency from 'currency.js';

export const setCart = function (cart) {
	if (!cart) return;

	const elements = document.querySelectorAll('[data-cart-total]');
	if (!elements || (elements && !elements.length)) return;

	elements.forEach((el) => {
		el.innerText = currency(cart.total_price, { fromCents: true }).format();
	});

	if (!window.Feather || (window.Feather && !window.Feather.cart)) return;
	window.Feather.cart = cart;
};
