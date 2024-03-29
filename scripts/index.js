// Utils
import { loading } from './loading.js';
import { inView } from './in-view.js';

// Global Components
import { navigation } from './navigation.js';
import { search } from './search.js';
import { select } from './select.js';
import { toggle } from './toggle.js';
import { modal } from './modal.js';
import { tabbedContent } from './tabbed-content.js';
import { cart } from './cart.js';
import { modelViewer } from './model-viewer.js';
import { formErrors } from './form-errors.js';
import { formSuccess } from './form-success.js';
import { address } from './address.js';
import { swiper } from './swiper.js';

// Page Components
import { product } from './product.js';
import { productSpotlight } from './product-spotlight.js';
import { productFilter } from './product-filter.js';

window.onload = async function () {
	console.log('--Initializing Scripts');

	// Utils
	loading(); // <!-- call first to intercept http requests
	inView();

	// Global Components
	navigation();
	search();
	select();
	toggle();
	modal();
	tabbedContent();
	cart();
	modelViewer();
	formErrors();
	formSuccess();
	address();
	swiper();

	// Page Components
	product();
	//productSpotlight();
	productFilter(); // <!-- call after all filter, select and toggle methods have been called

	document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
	if (Shopify.designMode) document.documentElement.classList.add('shopify-design-mode');

	console.log('--Scripts Loaded');
};
