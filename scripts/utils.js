/**
 * Gets browser agent type
 * @return { object } { device, browser }
 * */
export const getNavigatorAgent = function () {
	const userAgent = navigator.userAgent;
	let device = null;
	let browser = null;

	if (userAgent.match(/Android/i)) device = 'android';
	if (userAgent.match(/BlackBerry/i)) device = 'blackberry';
	if (userAgent.match(/iPhone|iPad|iPod/i)) device = 'ios';
	if (userAgent.match(/Opera Mini/i)) device = 'opera-mini';
	if (userAgent.match(/IEMobile/i)) device = 'ie-mobile';
	if (userAgent.match(/IEMobile/i)) device = 'ie-mobile';

	if (userAgent.indexOf('chrome') > -1 || userAgent.indexOf('Chrome') > -1) {
		browser = 'chrome';
		return { browser, device };
	}
	if (userAgent.indexOf('firefox') > -1 || userAgent.indexOf('Firefox') > -1) {
		browser = 'firefox';
		return { browser, device };
	}
	if (userAgent.indexOf('safari') > -1 || userAgent.indexOf('Safari') > -1) {
		browser = 'safari';
		return { browser, device };
	}
	if (userAgent.indexOf('opr') > -1 || userAgent.indexOf('Opr') > -1) {
		browser = 'opera';
		return { browser, device };
	}
	if (
		userAgent.indexOf('edg') > -1 ||
		userAgent.indexOf('edge') > -1 ||
		userAgent.indexOf('Edg') > -1 ||
		userAgent.indexOf('Edge') > -1
	) {
		browser = 'edge';
		return { browser, device };
	}
	if (userAgent.indexOf('trident') > -1 || userAgent.indexOf('Trident') > -1) {
		browser = 'internet-explorer';
		return { browser, device };
	}

	return { device, browser };
};

/**
 * Gets CSS variables for usage
 * @param { string } variable name
 * */
export const getCSSVariable = function (variable) {
	return getComputedStyle(document.body).getPropertyValue(variable);
};

/**
 * Creates intersection observe to detect when element comes into view
 * @params { object } el - dom element to monitor
 * @params { func } callback - returns event when dom element comes in and out of status
 * */
export const intersectionObserver = function (el, callback, options = {}) {
	if (!el || !callback) return;
	const observer = new IntersectionObserver(callback, options);
	observer.observe(el);
};

/**
 * Listens for change on element class names
 * @param { object } el - target dom element
 * @param { string } classname - class to listen for toggle on and off
 * @param { func } on - callback for active class
 * @param { func } off - callback for inactive class
 * */
export const classObserver = function (el, classname, on, off) {
	if (!el || !classname) return;

	const observer = new MutationObserver(function (event) {
		if (el.className.indexOf(classname) > -1 && on) on();
		if (el.className.indexOf(classname) === -1 && off) off();
	});

	observer.observe(el, {
		attributes: true,
		attributeFilter: ['class'],
		childList: false,
		characterData: false,
	});
};

/**
 * Creates aribtrary wait time based on miliseconds
 * @param { int } milliseconds
 * @return { promise } resolves once time has been reached
 * */
export const asyncTimeout = function (ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
