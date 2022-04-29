export const getCSSVariable = function (variable) {
	return getComputedStyle(document.body).getPropertyValue(variable);
};
