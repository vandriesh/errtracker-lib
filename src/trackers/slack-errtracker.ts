import { ErrTrackerBasicConfig } from '../core/ETErrorEvent';
import { ReportStrategy } from '../report-strategies/report-strategies';
import { getLogger } from '../loggers/loggers';
import { SlackMessageBuilder } from '../message-builders/slack-message-builder';
import { SubscribeParams, subscribeToEventListener } from '../core/utils';
import { postData } from '../core/fetch-transport';

export interface ErrTrackerSlackConfig extends ErrTrackerBasicConfig {
  details?: object;
  webHookUrl: string;
}

export const buildSlackErrorTracker = (reportStrategy: ReportStrategy, scope: any) => {
  return (options: ErrTrackerSlackConfig) => {
    const { details, webHookUrl } = options;
    const logger = getLogger(options);
    const builder = new SlackMessageBuilder('We got an error!', details);

    subscribeToEventListener({
      scope,
      url: webHookUrl,
      builder,
      logger,
      transport: postData,
      reportStrategy
    } as SubscribeParams);
  };
};
