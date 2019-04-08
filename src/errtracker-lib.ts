import { ErrTrackerConfig } from './trackers/slack-errtracker';
import { ConsoleLogger, DummyLogger } from './loggers/loggers';
import { ETData, MessageBuilder } from './message-builders/message-builder';
import { subscribeToEventListener, Window } from './core/utils';
import { postData } from './core/fetch-transport';

(function(scope: Window) {
  const ERR_TRACKER = 'errtracker';
  scope[ERR_TRACKER] = (options: ErrTrackerConfig) => {
    const { token, details, useConsoleLogger } = options;
    let { logger = DummyLogger, apiURL } = options;

    if (!apiURL) {
      apiURL = 'https://errtracker.com/prod/api/v1/alerts';
    }

    if (useConsoleLogger) {
      logger = ConsoleLogger;
    }

    const basicData: ETData = {
      details,
      token,
      url: window.document.location.href
    };

    const dataBuilder = new MessageBuilder(basicData);

    subscribeToEventListener({ scope: scope, url: apiURL, builder: dataBuilder, logger: logger, transport: postData });
  };
})(window);
