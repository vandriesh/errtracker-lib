import { postData } from './transport';
import { ErrTrackerHandler } from './errtracker';

interface ChatPostMessageArguments {
  channel: string;
  text: string;
  as_user?: boolean;
  attachments?: MessageAttachment[];
  icon_emoji?: string; // if specified, as_user must be false
  icon_url?: string;
  link_names?: boolean;
  mrkdwn?: boolean;
  parse?: 'full' | 'none';
  reply_broadcast?: boolean; // if specified, thread_ts must be set
  thread_ts?: string;
  unfurl_links?: boolean;
  unfurl_media?: boolean;
  username?: string; // if specified, as_user must be false
}

interface MessageAttachment {
  fallback?: string; // either this or text must be defined
  color?: 'good' | 'warning' | 'danger' | string;
  pretext?: string;
  author_name?: string;
  author_link?: string; // author_name must be present
  author_icon?: string; // author_name must be present
  title?: string;
  title_link?: string; // title must be present
  text?: string; // either this or fallback must be defined
  fields?: {
    title: string;
    value: string;
    short?: boolean;
  }[];
  image_url?: string;
  thumb_url?: string;
  footer?: string;
  footer_icon?: string; // footer must be present
  ts?: string;
  // actions?: AttachmentAction[];
  callback_id?: string;
  mrkdwn_in?: ('pretext' | 'text' | 'fields')[];
}

export class SlackHandler implements ErrTrackerHandler {
  constructor(private slackUrl: string, private slackChannel: string) {}
  public handle(errMsg: ErrorEvent, info: string[] = []) {
    const message = this.format(errMsg, info);

    postData(this.slackUrl, message)
      .then(resp => console.info(this.constructor.name, 'service provider has been notified'))
      .catch(resp =>
        console.error(this.constructor.name, 'ErrTracker: could notify, due to error')
      );
  }

  private formatTextAttach(text: string): object {
    return { text };
  }

  private format(errorMessage: ErrorEvent, extraInfo: string[]): ChatPostMessageArguments {
    const attachments = [];
    const details = [
      `message: ${errorMessage.message}`,
      `source: ${errorMessage.filename}`,
      `line: ${errorMessage.lineno}`,
      `col: ${errorMessage.colno}`,
      `error: ${errorMessage.error}`
    ];
    attachments.push(this.formatTextAttach(details.join('\n')));
    if (extraInfo) {
      attachments.push(this.formatTextAttach(extraInfo.join('\n')));
    }
    const outputMessage: ChatPostMessageArguments = {
      channel: this.slackChannel,
      username: 'errtracker',
      text: 'We got an error!',
      attachments
    };

    return outputMessage;
  }
}
