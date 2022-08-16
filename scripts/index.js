import { navigation } from './navigation.js';
import { search } from './search.js';
import { inView } from './in-view.js';
import { productSpotlight } from './product-spotlight.js';
import { select } from './select.js';
import { toggle } from './toggle.js';
import { productFilter } from './product-filter.js';

window.onload = async function () {
	console.log('--Initializing Scripts');

	document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
	if (Shopify.designMode) document.documentElement.classList.add('shopify-design-mode');

	navigation();
	search();
	inView();
	productSpotlight();
	select();
	toggle();
	productFilter();

	console.log('--Scripts Loaded');
};
