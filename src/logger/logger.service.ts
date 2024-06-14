import { Logger, ILogObj } from 'tslog';
import { ILogger } from './logger.interface';
import { injectable } from 'inversify';

@injectable()
export class LoggerService implements ILogger {
	public logger: Logger<ILogObj>;

	constructor() {
		this.logger = new Logger({
			type: 'pretty',
			prettyLogTemplate: '{{dd}}.{{mm}}.{{yyyy}} {{hh}}:{{MM}}:{{ss}}\t{{logLevelName}}\t',
			hideLogPositionForProduction: true,
			prettyLogTimeZone: 'local',
			stylePrettyLogs: true,
			prettyLogStyles: {
				logLevelName: {
					'*': ['bold', 'black', 'bgWhiteBright', 'dim'],
					INFO: ['bold', 'blue'],
					WARN: ['bold', 'yellow'],
					ERROR: ['bold', 'red'],
				},
			},
		});
	}

	public info(...args: unknown[]): void {
		this.logger.info(...args);
	}

	public warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}

	public error(...args: unknown[]): void {
		this.logger.error(...args);
	}
}
