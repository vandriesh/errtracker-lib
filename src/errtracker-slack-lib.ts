import { ErrTrackerSlackConfig } from './trackers/slack-errtracker';
import { SlackMessageBuilder } from './message-builders/slack-message-builder';
import { getLogger } from './loggers/loggers';
import { subscribeToEventListener } from './core/utils';
import { postData } from './core/fetch-transport';
import { alwaysReportStrategy } from './report-strategies/report-strategies';

interface Window {
  [key: string]: any;
}

(function(scope: Window) {
  const ERR_TRACKER = 'slackErrTracker';

  scope[ERR_TRACKER] = (options: ErrTrackerSlackConfig) => {
    const { details, webHookUrl } = options;
    const logger = getLogger(options);
    const builder = new SlackMessageBuilder('We got an error!', details);

    subscribeToEventListener({
      scope,
      url: webHookUrl,
      builder,
      logger,
      transport: postData,
      reportStrategy: alwaysReportStrategy
    });
  };
})(window);