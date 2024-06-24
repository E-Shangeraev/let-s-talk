import { Response, Router } from 'express';
import { ILogger } from '../logger';
import { ExpressReturnType, IControllerRoute } from './route.interface';

export abstract class BaseController {
	private readonly router: Router;

	constructor(private readonly logger: ILogger) {
		this.router = Router();
	}

	private send<T>(res: Response, code: number, message: T): ExpressReturnType {
		res.type('application/json');
		return res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T): ExpressReturnType {
		return this.send(res, 200, message);
	}

	protected bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			this.logger.info(`[${route.method}]: ${route.path}`);

			const handler = route.func.bind(this);
			this.router[route.method](route.path, handler);
		}
	}
}
