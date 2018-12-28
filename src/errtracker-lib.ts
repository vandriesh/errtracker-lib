// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import SlackHandler from './handlers/slack/slack-handler';
import { ErrTracker } from './errtracker';
import { ChatPostMessageArguments } from './handlers/slack/slack-message-formatter';
import { postData } from './core/fetch-transport';

(function(scope: any, { platform, userAgent }: Navigator) {
  const logger = {
    success: (...args: any[]) => console.log(...args),
    error: (...args: any[]) => console.warn(...args)
  };

  scope['errtracker'] = {
    useSlackHandler: (slackWebhookUrl: string, slackChannel: string) => {
      if (scope['__usingSlackChannel']) {
        logger.error('errtracker:', 'slack handler is already in use');

        return;
      }

      const defaultSlackMessage = {
        channel: slackChannel,
        username: 'errtracker',
        text: 'We got an error!'
      } as Partial<ChatPostMessageArguments>;

      const slackHandler = new SlackHandler(slackWebhookUrl, defaultSlackMessage, postData);

      const ErrTrackerHandler = new ErrTracker(slackHandler, {
        logger
      });

      ErrTrackerHandler.setExtraInfo({
        platform,
        userAgent
      });

      scope.addEventListener('error', (event: ErrorEvent) => ErrTrackerHandler.handle(event));
      scope['__usingSlackChannel'] = true;
      scope['errtracker'].setExtraInfo = ErrTrackerHandler.setExtraInfo;
    }
  };
})(window, navigator);
