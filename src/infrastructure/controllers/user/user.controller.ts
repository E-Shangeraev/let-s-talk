import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { BaseController, ILogger } from '../../../common';
import { TYPES } from '../../../types';
import { IUserController } from './user.controller.interface';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(@inject(TYPES.Logger) private readonly loggerService: ILogger) {
		super(loggerService);

		this.bindRoutes([
			{
				path: '/login',
				method: 'post',
				func: this.login,
			},
			{
				path: '/register',
				method: 'post',
				func: this.register,
			},
		]);
	}

	async login(req: Request, res: Response, next: NextFunction): Promise<void> {
		this.ok(res, 'login');
	}

	async register(req: Request, res: Response, next: NextFunction): Promise<void> {
		this.ok(res, 'register');
	}
}
