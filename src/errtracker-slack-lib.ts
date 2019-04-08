import { ErrTrackerSlackConfig } from './trackers/slack-errtracker';
import { SlackMessageBuilder } from './message-builders/slack-message-builder';
import { ConsoleLogger, DummyLogger } from './loggers/loggers';
import { subscribeToEventListener } from './core/utils';
import { postData } from './core/fetch-transport';

interface Window {
  [key: string]: any;
}

(function(scope: Window) {
  const ERR_TRACKER = 'slackErrTracker';

  scope[ERR_TRACKER] = (options: ErrTrackerSlackConfig) => {
    const { details, useConsoleLogger, webHookUrl } = options;
    let { logger = DummyLogger } = options;

    if (useConsoleLogger) {
      logger = ConsoleLogger;
    }

    const builder = new SlackMessageBuilder('We got an error!', details);

    subscribeToEventListener({
      scope,
      url: webHookUrl,
      builder,
      logger,
      transport: postData
    });
  };
})(window);
