import { navigation } from './navigation.js';
import { search } from './search.js';

document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
if (Shopify.designMode) document.documentElement.classList.add('shopify-design-mode');

window.onload = async function () {
	console.log('--Initializing Scripts');

	navigation();
	search();

	console.log('--Scripts Loaded');
};
