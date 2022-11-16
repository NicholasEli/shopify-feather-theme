export const button = async function (selector, callback) {
	const btns = document.querySelectorAll(`[data-btn="${selector}"]`);
	if (!btns || !callback) return null;

	const _btns = Array.from(btns).map((btn) => {
		const target = document.querySelectorAll(`[${selector}]`);

		if (!target || (target && !target.length)) return null;

		const obj = {
			selector,
			btn,
			target,
		};

		if (target.length === 1) obj.target = target[0];

		return obj;
	});

	for (let _btn of _btns) {
		const { btn, target } = _btn;
		btn.addEventListener('click', async (e) => {
			e.preventDefault();
			await callback(e, { ..._btn });
		});
	}
};
