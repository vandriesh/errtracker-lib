import { ETErrorEvent } from '../core/ETErrorEvent';
import { LocalStorage } from '../storages/local-storage';

import { ReportStrategy } from './report-strategies';

export const getErrorEventId = (errorEvent: ETErrorEvent) => {
  const { filename, colno, lineno } = errorEvent;

  return `${filename}:${lineno}:${colno}`;
};

export const buildReportStrategy = (localStorage: Storage): ReportStrategy => {
  const etStorage = new LocalStorage<ETErrorEvent>(localStorage, 'ErrTrackerStorage', getErrorEventId);

  return {
    toReport: (errorEvent: ETErrorEvent) => {
      etStorage.store(errorEvent);

      return etStorage.getByItem(errorEvent).length === 1;
    }
  };
};

export const browserBasedReportStrategy = buildReportStrategy(window.localStorage);
