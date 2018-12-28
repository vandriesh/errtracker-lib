import { TransportContract } from '../../core/fetch-transport';
import { ErrTrackerHandler } from '../../errtracker';
import { ChatPostMessageArguments, SlackMessageFormatter } from './slack-message-formatter';

export interface SlackFormatter {
  format: (errorMessage: ErrorEvent, extraInfo: string[]) => ChatPostMessageArguments;
}

export default class SlackHandler implements ErrTrackerHandler {
  private messageBuilder: SlackMessageFormatter;

  constructor(
    private slackWebhookUrl: string,
    private defaultMessage: Partial<ChatPostMessageArguments>,
    private transport: TransportContract
  ) {
    this.messageBuilder = new SlackMessageFormatter(this.defaultMessage);
  }

  public handle(errMsg: ErrorEvent, info: string[] = []): Promise<Response> {
    const message = this.messageBuilder.format(errMsg, info);

    return this.transport(this.slackWebhookUrl, message);
  }
}
