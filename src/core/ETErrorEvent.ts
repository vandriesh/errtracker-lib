import { ErrTrackerLogger } from '../loggers/loggers';

export interface ETErrorEvent {
  message: string;
  filename: string;
  lineno: number;
  colno: number;
  error: Error;
  stack?: string
}

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
  apiKey: string;
  token: string;
  url: string;
  details?: object;
  apiURL?: string;
}

export const getAPIUrl = ({ apiURL }: ErrTrackerConfig) => {
  if (!apiURL) {
    return 'https://errtracker.com/api/v1/alerts';
  }

  return apiURL;
};
