import { navigation } from './navigation.js';
import { search } from './search.js';
import { inView } from './in-view.js';
import { product } from './product.js';
import { productSpotlight } from './product-spotlight.js';
import { productFilter } from './product-filter.js';
import { select } from './select.js';
import { toggle } from './toggle.js';
import { loading } from './loading.js';
import { modal } from './modal.js';
import { newsletter } from './newsletter.js';

window.onload = async function () {
	console.log('--Initializing Scripts');

	document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
	if (Shopify.designMode) document.documentElement.classList.add('shopify-design-mode');

	// Pre UI logic
	loading(); // <!-- call first to intercept http requests
	navigation();
	search();
	select();
	toggle();
	modal();

	// Post UI logic
	inView();
	newsletter();
	product();
	productSpotlight();
	productFilter(); // <!-- call after all filter, select and toggle methods have been called

	console.log('--Scripts Loaded');
};
