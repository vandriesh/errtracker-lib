import { ErrTrackerConfig, getAPIUrl } from './core/ETErrorEvent';
import { getLogger } from './loggers/loggers';
import { ETData, MessageBuilder } from './message-builders/message-builder';
import { subscribeToEventListener } from './core/utils';
import { postData } from './core/fetch-transport';
import { alwaysReportStrategy } from './report-strategies/report-strategies';

export const errTracker = (options: ErrTrackerConfig) => {
  const { token, details } = options;
  const logger = getLogger(options);
  const url = getAPIUrl(options);
  const basicData: ETData = {
    details,
    token,
    url: window.document.location.href
  };

  const dataBuilder = new MessageBuilder(basicData);

  subscribeToEventListener({
    scope: window,
    url,
    builder: dataBuilder,
    logger: logger,
    transport: postData,
    reportStrategy: alwaysReportStrategy
  });
};

// @ts-ignore
window['errtracker'] = errTracker;
