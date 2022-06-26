import { navigation } from './navigation.js';

document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
if (Shopify.designMode) document.documentElement.classList.add('shopify-design-mode');

window.onload = async function () {
	console.log('--Initializing Scripts');

	navigation();

	console.log('--Scripts Loaded');
};
