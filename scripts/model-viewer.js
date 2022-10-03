const setActive = function () {
	const viewers = document.querySelectorAll('[data-model-viewer]');
	if (!viewers || (viewers && !viewers.length)) return;

	viewers.forEach((viewer) => {
		viewer.addEventListener('click', () => viewer.classList.add('feather-model-viewer--active'));
	});
};

export const modelViewer = function () {
	setActive();
};
