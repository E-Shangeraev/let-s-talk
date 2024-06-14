import 'reflect-metadata';
import { Container, ContainerModule } from 'inversify';
import { ILogger, LoggerService } from './logger';
import { TYPES } from './types';
import { App } from './app';

interface IBootstrap {
	app: App;
	appContainer: Container;
}

const bindings = new ContainerModule((bind) => {
	bind<ILogger>(TYPES.Logger).to(LoggerService);
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
