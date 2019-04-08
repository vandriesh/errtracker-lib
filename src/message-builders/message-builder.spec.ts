import { MessageBuilder } from './message-builder';

describe('MessageBuilder', () => {
  let instance: MessageBuilder;
  let output: object;

  beforeEach(() => {
    instance = new MessageBuilder({
      token: 'zzz',
      url: 'http://url.com',
      details: { browse: 'qqq', userAgent: 'www' }
    });
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
      ...errMsg,
      token: 'zzz',
      url: 'http://url.com',
      details: { browse: 'qqq', userAgent: 'www' }
    });
  });

  it('should catch if error is in remote script', () => {
    const errMsg: Partial<ErrorEvent> = {
      colno: 0
    };

    errMsg.toString = () => 'script error';

    output = instance.build(errMsg);
    expect(output).toEqual({
      message: 'Script Error: See Browser Console for Detail',
      token: 'zzz',
      url: 'http://url.com',
      details: { browse: 'qqq', userAgent: 'www' }
    });
  });
});
