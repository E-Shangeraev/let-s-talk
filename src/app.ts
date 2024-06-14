import express, { Application } from 'express';
import { inject, injectable } from 'inversify';
import { Server } from 'http';
import { ILogger } from './logger';
import { TYPES } from './types';

@injectable()
export class App {
	private app: Application;
	private server: Server;
	private port: number;

	constructor(@inject<ILogger>(TYPES.Logger) private logger: ILogger) {
		this.app = express();
		this.port = 8080;
	}

	public async init(): Promise<void> {
		this.server = this.app.listen(this.port);
		this.logger.info(`The server has been started at http://localhost:${this.port}`);
	}

	public close(): void {
		this.server.close();
	}
}
