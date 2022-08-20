export const newsletter = function () {
	const container = document.querySelector('[data-newsletter]');
	const storage = window.localStorage.getItem('feather-newsletter');

	if (!storage && container) {
		//container.classList.add('animate__fadeInDown');
	}
};
