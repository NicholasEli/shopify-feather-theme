const modelViewActiveUI = function (e, id) {
	if (e) e.preventDefault();
	const viewer = document.querySelector(`[data-model-viewer="${id}"]`);
	viewer.classList.add('feather-model-viewer--active');
};

export const modelViewer = function () {
	window.modelViewActiveUI = modelViewActiveUI;
};
