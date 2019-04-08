import { objToArray, extractBasicDataFromErrorEvent, subscribeToEventListener } from './utils';
import { MessageBuilder } from '../message-builders/message-builder';
import { ConsoleLogger } from '../loggers/loggers';
import { postData } from './fetch-transport';

describe('ErrTracker', () => {
  it('should be defined', () => {
    expect(objToArray).toBeDefined();
    expect(extractBasicDataFromErrorEvent).toBeDefined();
  });

  it('should convert to array', () => {
    expect(objToArray({ a: 1, b: 2 })).toEqual(['a: 1', 'b: 2']);
  });

  it('should extract default error data', () => {
    const ev = new ErrorEvent('ke');
    const out = extractBasicDataFromErrorEvent(ev);

    expect(out.lineno).toBeDefined();
    expect(out.colno).toBeDefined();
    expect(out.filename).toBeDefined();
    expect(out.message).toBeDefined();
    expect(out.error).toBeDefined();
  });

  it('should 1. subscribe to scope', () => {
    const scope = {
      addEventListener: jest.fn().mockImplementation()
    };
    const builder = new MessageBuilder({ token: 'qwe', url: 'https://1.com' });

    subscribeToEventListener({
      scope: scope,
      url: 'https://url.com',
      builder: builder,
      logger: ConsoleLogger,
      transport: postData
    });

    expect(scope.addEventListener).toHaveBeenCalledWith('error', expect.any(Function));
  });

  it('should 2. subscribe, build, post and log about sending data', () => {
    let handler = jest.fn();
    const scope = {
      addEventListener: (event: any, fn: any) => (handler = fn)
    };

    expect(handler).not.toBeUndefined();

    const builder = new MessageBuilder({ token: 'qwe', url: 'https://1.com' });
    const mockFetchPromise = Promise.resolve('ok');
    const thenMock = jest.fn().mockImplementation(() => mockFetchPromise);

    const transport = jest.fn().mockImplementation(() => {
      return {
        then: thenMock
      };
    });

    builder.build = jest.fn().mockImplementation((data) => {
      expect(data).toEqual({
        lineno: 1,
        colno: 1,
        message: 'my error',
        error: 'my error',
        filename: 'filename.js'
      });

      return {
        ...data,
        token: 'qwe',
        url: 'https://1.com'
      };
    });

    subscribeToEventListener({
      scope,
      url: 'https://url.com',
      builder: builder,
      logger: ConsoleLogger,
      transport
    });

    expect(handler).toBeDefined();

    expect(transport).not.toHaveBeenCalled();

    if (typeof handler === 'function') {
      handler({
        lineno: 1,
        colno: 1,
        message: 'my error',
        error: 'my error',
        filename: 'filename.js'
      });
    }

    expect(transport).toHaveBeenCalledWith('https://url.com', {
      colno: 1,
      error: 'my error',
      filename: 'filename.js',
      lineno: 1,
      message: 'my error',
      token: 'qwe',
      url: 'https://1.com'
    });
  });
});
