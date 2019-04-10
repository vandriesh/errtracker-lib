import { TransportContract } from './fetch-transport';
import { ErrTrackerLogger } from '../loggers/loggers';
import { ETBuilder } from '../message-builders/message-builder';
import { ReportStrategy } from '../report-strategies/report-strategies';
import { ETErrorEvent } from './ETErrorEvent';

export const objToArray = (obj: any): string[] =>
  Object.keys(obj)
    .sort()
    .map((key) => `${key}: ${obj[key]}`);

export const extractBasicDataFromErrorEvent = (err: ErrorEvent): ETErrorEvent => {
  const { colno, error, message, lineno, filename } = err;

  return {
    colno,
    error,
    message,
    lineno,
    filename
  };
};

export interface Window {
  [key: string]: any;
}

export interface SubscribeParams {
  scope: Window;
  url: string;
  builder: ETBuilder;
  transport: TransportContract;
  logger: ErrTrackerLogger;
  reportStrategy: ReportStrategy;
}

export const subscribeToEventListener = (config: SubscribeParams) => {
  const { scope, url, builder, logger, transport, reportStrategy } = config;

  scope.addEventListener('error', (event: ErrorEvent) => {
    const errorEvent = extractBasicDataFromErrorEvent(event);

    if (!reportStrategy.toReport(event)) {
      return;
    }

    transport(url, builder.build(errorEvent))
      .then((resp) => logger.success('ErrTracker:ok', resp))
      .catch((resp) => logger.error('ErrTracker:fail', resp));
  });
};
