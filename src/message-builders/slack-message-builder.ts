import { objToArray } from '../core/utils';

export interface ChatPostMessageArguments {
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

export interface MessageAttachment {
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

const formatAttachment = (obj: object): MessageAttachment => formatTextAttachment(objToArray(obj).join('\n'));

const formatTextAttachment = (text: string): MessageAttachment => ({ text });

export interface ETMessageBuilder<T> {
  build: (errorEvent: Partial<ErrorEvent>) => T;
}

export class SlackMessageBuilder implements ETMessageBuilder<ChatPostMessageArguments> {
  constructor(private slackMessage: string, private basicData?: object) {}

  public build(errorEvent: Partial<ErrorEvent>): ChatPostMessageArguments {
    const attachments: MessageAttachment[] = [formatAttachment(errorEvent)];

    if (this.basicData) {
      attachments.push(formatAttachment(this.basicData));
    }

    return {
      username: 'errtracker',
      text: this.slackMessage,
      attachments
    } as ChatPostMessageArguments;
  }
}
