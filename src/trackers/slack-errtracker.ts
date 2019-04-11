import { ErrTrackerBasicConfig } from '../core/ETErrorEvent';
import { ReportStrategy } from '../report-strategies/report-strategies';
import { getLogger } from '../loggers/loggers';
import { SlackMessageBuilder } from '../message-builders/slack-message-builder';
import { addWindowEventListener, buildEventHandler } from '../core/utils';
import { postData } from '../core/fetch-transport';

export interface ErrTrackerSlackConfig extends ErrTrackerBasicConfig {
  details?: object;
  webHookUrl: string;
}

export const buildSlackErrorTracker = (reportStrategy: ReportStrategy) => {
  return (options: ErrTrackerSlackConfig) => {
    const { details, webHookUrl } = options;
    const logger = getLogger(options);
    const builder = new SlackMessageBuilder('We got an error!', details);

    const slackEventHandler = buildEventHandler({
      url: webHookUrl,
      builder,
      logger,
      transport: postData,
      reportStrategy
    });

    addWindowEventListener(slackEventHandler);
  };
};
