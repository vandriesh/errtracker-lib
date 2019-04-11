import {
  objToArray,
  extractBasicDataFromErrorEvent,
  buildEventHandler,
  addWindowEventListener,
  ETErrorEventHandler
} from './utils';
import { MessageBuilder } from '../message-builders/message-builder';
import { ConsoleLogger, getLogger } from '../loggers/loggers';
import { alwaysReportStrategy } from '../report-strategies/report-strategies';
import { ETErrorEvent } from './ETErrorEvent';

describe('Utils', () => {
  const reportStrategy = alwaysReportStrategy;

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

  it('should call addEventListener with provided errorEvent handler', () => {
    jest.spyOn(window, 'addEventListener');
    const mockHandler = jest.fn();
    addWindowEventListener(mockHandler);

    expect(window.addEventListener).toHaveBeenCalledWith('error', mockHandler);
  });

  describe('Build, post process', () => {
    let handler: ETErrorEventHandler;
    let builder: MessageBuilder;

    beforeEach(() => {
      builder = new MessageBuilder({ token: 'qwe', url: 'https://1.com' });
      const transport = jest.fn().mockResolvedValue('qwe');

      jest.spyOn(builder, 'build');

      console.log = jest.fn().mockImplementation((...args) => {
        expect(args[0]).toEqual('ErrTracker:ok');
        expect(args[1]).toEqual('qwe1');
      });

      handler = buildEventHandler({
        url: 'https://url.com',
        builder: builder,
        logger: ConsoleLogger,
        reportStrategy,
        transport
      });
      jest.spyOn(builder, 'build');
    });

    it('should post request and check success response is handled', () => {
      const transport = jest.fn().mockResolvedValue('success');

      console.log = jest.fn().mockImplementation((...args) => {
        expect(args[0]).toEqual('ErrTracker:ok');
        expect(args[1]).toEqual('success');
      });

      const handler = buildEventHandler({
        url: 'https://url.com',
        builder: builder,
        logger: ConsoleLogger,
        reportStrategy,
        transport
      });

      handler({
        lineno: 1,
        colno: 1,
        message: 'my error',
        error: 'my error',
        filename: 'filename.js'
      } as ErrorEvent);

      expect(builder.build).toHaveBeenCalledWith(expect.any(Object));

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

    it('should post request and check error response is handled', () => {
      const transport = jest.fn().mockRejectedValue('error');

      console.warn = jest.fn().mockImplementation((...args) => {
        expect(args[0]).toEqual('ErrTracker:fail');
        expect(args[1]).toEqual('error');
      });

      const handler = buildEventHandler({
        url: 'https://url.com',
        builder: builder,
        logger: ConsoleLogger,
        reportStrategy,
        transport
      });

      handler({
        lineno: 1,
        colno: 1,
        message: 'my error',
        error: 'my error',
        filename: 'filename.js'
      } as ErrorEvent);

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

    it('should not post request if nothing to report', () => {
      reportStrategy.toReport = jest.fn().mockReturnValue(false);
      const transport = jest.fn();
      const handler = buildEventHandler({
        url: 'https://url.com',
        builder: builder,
        logger: ConsoleLogger,
        reportStrategy,
        transport
      });

      handler({
        lineno: 1,
        colno: 1,
        message: 'my error',
        error: 'my error',
        filename: 'filename.js'
      } as ErrorEvent);

      expect(transport).not.toHaveBeenCalled();
    });
  });
});
