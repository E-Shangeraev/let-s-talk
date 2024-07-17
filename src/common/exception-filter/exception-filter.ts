import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { IExceptionFilter } from './exception-filter.interface';
import { TYPES } from '../../types';
import { ILogger } from '../logger';
import { HTTPError } from './http-error';
import { HttpStatus } from '../types';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	constructor(@inject(TYPES.Logger) private readonly loggerService: ILogger) {}

	catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
		if (err instanceof HTTPError) {
			this.loggerService.error(
				`${err?.context && `[${err.context}]`} ${err.name} ${err.statusCode}: ${err.message}`,
			);
			res.status(err.statusCode).json({ error: err.message });
		} else {
			this.loggerService.error(`${err.name} ${HttpStatus.INTERNAL_SERVER_ERROR}: ${err.message}`);
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
		}
	}
}
