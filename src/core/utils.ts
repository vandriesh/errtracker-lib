import { TransportContract } from './fetch-transport';
import { ErrTrackerLogger } from '../loggers/loggers';
import { ETBuilder } from '../message-builders/message-builder';

export const objToArray = (obj: any): string[] =>
  Object.keys(obj)
    .sort()
    .map((key) => `${key}: ${obj[key]}`);

export const extractBasicDataFromErrorEvent = (err: ErrorEvent): Partial<ErrorEvent> => {
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
}

export const subscribeToEventListener = ({ scope, url, builder, logger, transport }: SubscribeParams) => {
  scope.addEventListener('error', (event: ErrorEvent) =>
    transport(url, builder.build(extractBasicDataFromErrorEvent(event)))
      .then((resp) => logger.success('ErrTracker:ok', resp))
      .catch((resp) => logger.error('ErrTracker:fail', resp))
  );
};
