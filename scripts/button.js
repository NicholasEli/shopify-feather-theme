export const button = function (selector, callback) {
	let btns = document.querySelectorAll('[data-btn]');

	if (!btns || (btns && !btns.length)) return;

	btns = Array.from(btns);

	btns = btns
		.filter((btn) => {
			const attr = btn.getAttribute('data-btn').split(':');
			const type = attr[0];

			if (type === selector) return btn;
		})
		.map((btn) => {
			const attr = btn.getAttribute('data-btn').split(':');
			const type = attr[0];
			const target = attr[1];

			return { element: btn, type, target };
		});

	for (let btn of btns) {
		if (!callback || !btn.element || !btn.type || !btn.target) return;

		btn.element.addEventListener('click', () => {
			const selector = `[data-${btn.type}="${btn.target}"]`;
			callback(selector);
		});
	}
};
