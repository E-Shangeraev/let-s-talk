export class HTTPError extends Error {
	constructor(
		readonly statusCode: number,
		readonly message: string,
		readonly context?: string,
	) {
		super(message);
	}
}
