import { ChatPostMessageArguments, SlackMessageFormatter } from './slack-message-formatter';

describe('SlackMessageFormater', function() {
  let instance: SlackMessageFormatter;
  let inputMsg: Partial<ChatPostMessageArguments>;
  let output: ChatPostMessageArguments;

  beforeEach(() => {
    inputMsg = {
      channel: 'zzz'
    };

    instance = new SlackMessageFormatter(inputMsg);
  });

  it('should exists', () => {
    expect(instance.format).toBeDefined();
  });

  it('should format error message ', function() {
    const errMsg: ErrorEvent = {
      colno: 1,
      lineno: 1,
      error: {},
      filename: 'filename',
      message: 'my error'
    } as ErrorEvent;

    output = instance.format(errMsg);

    expect(output).toEqual({
      channel: inputMsg.channel,
      attachments: [
        {
          text: [
            `message: ${errMsg.message}`,
            `source: ${errMsg.filename}`,
            `line: ${errMsg.lineno}`,
            `col: ${errMsg.colno}`,
            `error: ${{}}`
          ].join('\n')
        }
      ]
    } as ChatPostMessageArguments);
  });
  it('should format error message with extra info', function() {
    const errMsg: ErrorEvent = {
      colno: 1,
      lineno: 1,
      error: {},
      filename: 'filename',
      message: 'my error'
    } as ErrorEvent;

    output = instance.format(errMsg, ['a=1', 'b=2']);

    expect(output).toEqual({
      channel: inputMsg.channel,
      attachments: [
        {
          text: [
            `message: ${errMsg.message}`,
            `source: ${errMsg.filename}`,
            `line: ${errMsg.lineno}`,
            `col: ${errMsg.colno}`,
            `error: ${{}}`
          ].join('\n')
        },
        {
          text: ['a=1', 'b=2'].join('\n')
        }
      ]
    } as ChatPostMessageArguments);
  });
});
