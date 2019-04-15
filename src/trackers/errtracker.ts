import { ErrTrackerConfig, getAPIUrl } from '../core/ETErrorEvent';
import { ReportStrategy } from '../report-strategies/report-strategies';
import { getLogger } from '../loggers/loggers';
import { ETData, MessageBuilder } from '../message-builders/message-builder';
import { addWindowEventListener, buildEventHandler } from '../core/utils';
import { corsPostData } from '../core/fetch-transport';

export const buildErrorTracker = (reportStrategy: ReportStrategy) => {
  return (options: ErrTrackerConfig) => {
    const { token, details } = options;
    const logger = getLogger(options);
    const url = getAPIUrl(options);
    const basicData: ETData = {
      details,
      token,
      url: window.document.location.href
    };
    const builder = new MessageBuilder(basicData);

    const eventHandler = buildEventHandler({
      url,
      builder,
      logger,
      transport: corsPostData,
      reportStrategy
    });

    addWindowEventListener(eventHandler);
  };
};
