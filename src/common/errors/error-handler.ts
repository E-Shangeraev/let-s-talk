import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { IErrorHandler } from './error-handler.interface';
import { TYPES } from '../../types';
import { ILogger } from '../logger';
import { HTTPError } from './http-error';

@injectable()
export class ErrorHandler implements IErrorHandler {
	constructor(@inject(TYPES.Logger) private readonly loggerService: ILogger) {}

	catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
		if (err instanceof HTTPError) {
			this.loggerService.error(
				`${err?.context && `[${err.context}]`} ${err.name} ${err.statusCode}: ${err.message}`,
			);
			res.status(err.statusCode).json({ error: err.message });
		} else {
			this.loggerService.error(`${err.name} 500: ${err.message}`);
			res.status(500).json({ error: err.message });
		}
	}
}
