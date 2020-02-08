import { ChatPostMessageArguments, SlackMessageBuilder } from './slack-message-builder';
import { version } from '../../package.json';

describe('SlackMessageBuilder', () => {
  let instance: SlackMessageBuilder;
  let inputMsg: string = 'zzz';
  let output: ChatPostMessageArguments;

  beforeEach(() => {
    instance = new SlackMessageBuilder('zzz', { browser: 'qwe', navigator: 'zzz' });
  });

  it('should format error message ', () => {
    const errMsg: Partial<ErrorEvent> = {
      colno: 1,
      lineno: 1,
      error: {},
      filename: 'filename',
      message: 'my error'
    };

    output = instance.build(errMsg);
    expect(output).toEqual({
      username: `errtracker v.${version}`,
      text: inputMsg,
      attachments: [
        {
          text: [
            `colno: ${errMsg.colno}`,
            `error: ${{}}`,
            `filename: ${errMsg.filename}`,
            `lineno: ${errMsg.lineno}`,
            `message: ${errMsg.message}`
          ].join('\n')
        },
        {
          text: ['browser: qwe', 'navigator: zzz'].join('\n')
        }
      ]
    } as ChatPostMessageArguments);
  });

  it('should format error message with basic data', () => {
    const errMsg: Partial<ErrorEvent> = {
      colno: 1,
      lineno: 1,
      error: {},
      filename: 'filename',
      message: 'my error'
    };

    instance = new SlackMessageBuilder('zzz');
    output = instance.build(errMsg);
    expect(output).toEqual({
      username: `errtracker v.${version}`,
      text: inputMsg,
      attachments: [
        {
          text: [
            `colno: ${errMsg.colno}`,
            `error: ${{}}`,
            `filename: ${errMsg.filename}`,
            `lineno: ${errMsg.lineno}`,
            `message: ${errMsg.message}`
          ].join('\n')
        }
      ]
    } as ChatPostMessageArguments);
  });
});
