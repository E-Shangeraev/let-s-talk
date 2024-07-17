import { injectable } from 'inversify';
import { Response, Router } from 'express';
import { ILogger } from './logger';
import { ExpressReturnType, IControllerRoute } from './route.interface';
import { HttpStatus } from './types';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	constructor(private readonly logger: ILogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	private send<T>(res: Response, code: number, message: T): ExpressReturnType {
		res.type('application/json');
		return res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T): ExpressReturnType {
		return this.send(res, HttpStatus.OK, message);
	}

	protected bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			this.logger.info(`[${route.method}]: ${route.path}`);

			const handler = route.func.bind(this);
			this.router[route.method](route.path, handler);
		}
	}
}
