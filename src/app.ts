import express, { Application } from 'express';
import { inject, injectable } from 'inversify';
import { Server } from 'http';
import { IUserController, UserController } from './infrastructure/controllers/user';
import { ILogger } from './common/logger';
import { TYPES } from './types';

@injectable()
export class App {
	private app: Application;
	private server: Server;
	private port: number;

	constructor(
		@inject<ILogger>(TYPES.Logger) private logger: ILogger,
		@inject<IUserController>(TYPES.UserController) private userController: UserController,
	) {
		this.app = express();
		this.port = 8080;
	}

	public useRoutes(): void {
		this.app.use('/users', this.userController.router);
	}

	public async init(): Promise<void> {
		this.useRoutes();
		this.server = this.app.listen(this.port);
		this.logger.info(`The server has been started at http://localhost:${this.port}`);
	}

	public close(): void {
		this.server.close();
	}
}
