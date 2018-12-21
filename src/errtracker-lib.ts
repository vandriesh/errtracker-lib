// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import { SlackHandler } from './slack-handler';
import { ErrTracker } from './errtracker';

(function(scope: any, { platform, userAgent }: Navigator) {
  scope['errtracker'] = {
    useSlackHandler: (slackWebhookUrl: string, slackChannel: string) => {
      if (scope['__usingSlackChannel']) {
        console.warn('slack handler is already set up');

        return;
      }

      const ErrTrackerHandler = new ErrTracker(new SlackHandler(slackWebhookUrl, slackChannel));

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
