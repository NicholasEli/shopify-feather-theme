const deleteAddress = function (e) {
	if (e) e.preventDefault();
};

export const address = function () {
	window.deleteAddress = deleteAddress;
};
