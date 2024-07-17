import 'reflect-metadata';
import { Container, ContainerModule } from 'inversify';
import { ILogger, LoggerService, ExceptionFilter, IExceptionFilter } from './common';
import { TYPES } from './types';
import { App } from './app';
import { IUserController, UserController } from './infrastructure/controllers/user';

interface IBootstrap {
	app: App;
	appContainer: Container;
}

const bindings = new ContainerModule((bind) => {
	bind<ILogger>(TYPES.Logger).to(LoggerService);
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<App>(TYPES.App).to(App);
});

(async function bootstrap(): Promise<IBootstrap> {
	const appContainer = new Container({ defaultScope: 'Singleton' });
	appContainer.load(bindings);

	const app = appContainer.get<App>(TYPES.App);
	await app.init();

	return {
		app,
		appContainer,
	};
})();
