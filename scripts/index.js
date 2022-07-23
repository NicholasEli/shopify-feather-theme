import { navigation } from './navigation.js';
import { search } from './search.js';

window.onload = async function () {
	console.log('--Initializing Scripts');

	document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
	if (Shopify.designMode) document.documentElement.classList.add('shopify-design-mode');

	navigation();
	search();

	console.log('--Scripts Loaded');
};
