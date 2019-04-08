import { ErrTrackerLogger } from '../loggers/loggers';

export interface ErrorEventHandlerInterface {
  handle(event: ErrorEvent): boolean;
}

export interface ErrTrackerHandler {
  handle: (error: ErrorEvent, info?: string[]) => Promise<Response>;
}

export interface ErrTrackerBasicConfig {
  useConsoleLogger: boolean;
  logger?: ErrTrackerLogger;
}

export interface ErrTrackerConfig extends ErrTrackerBasicConfig {
  token: string;
  url: string;
  details?: object;
  apiURL?: string;
}

export interface ErrTrackerSlackConfig extends ErrTrackerBasicConfig {
  details?: object;
  webHookUrl: string;
}

export enum ReportStrategies {
  ALL = 'ALL',
  FIRST_OF_ITS_KIND = 'FIRST_OF_ITS_KIND'
}
