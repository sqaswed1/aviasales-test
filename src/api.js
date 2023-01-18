export default class Api {
	__apiBase = 'https://aviasales-test-api.kata.academy';

	async getSearchId() {
		const response = await fetch(`${this.__apiBase}/search`);
		if (!response.ok) throw new Error('Перезагрузите страницу.');
		const data = await response.json();
		return data;
	}

	async getTickets(searchId) {
		const response = await fetch(
			`${this.__apiBase}/tickets?searchId=${searchId}`
		);
		if (!response.ok) throw new Error('Перезагрузите страницу.');
		const data = await response;
		return data;
	}
}
