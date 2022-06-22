import { MobileMenu } from './MobileMenu.js';

document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
if (Shopify.designMode) document.documentElement.classList.add('shopify-design-mode');

window.onload = function () {
	console.log('--Initializing Scripts');
	//MobileMenu();
	console.log('--Scripts Loaded');
};
