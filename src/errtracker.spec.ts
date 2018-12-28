import { ErrTracker, ErrTrackerConfig, ErrTrackerHandler } from './errtracker';
import SlackHandler from './handlers/slack/slack-handler';
import { TransportContract } from './core/fetch-transport';

/**
 * ErrTracker
 */
describe('ErrTracker', () => {
  let instance: ErrTracker;
  let successMock;
  let errorMock;
  let HandlerMock1: ErrTrackerHandler;
  let loggerMock: ErrTrackerConfig;
  let mockSuccessResponse: object;
  let mockFetchSuccessPromise: Promise<object>;
  let transportMock: TransportContract;

  beforeEach(() => {
    successMock = jest.fn();
    errorMock = jest.fn();

    mockSuccessResponse = { a: 1, b: 2 };
    mockFetchSuccessPromise = Promise.resolve(mockSuccessResponse);

    transportMock = jest.fn().mockImplementation(() => mockFetchSuccessPromise);
    HandlerMock1 = new SlackHandler('url', { channel: 'channel' }, transportMock);

    loggerMock = {
      logger: {
        success: (...args: string[]) => {
          // console.log('logger>success:', ...args);
        },
        error: (...args: string[]) => {
          // console.error('logger>error:', ...args);
        }
        // error: errorMock
      }
    } as ErrTrackerConfig;

    // TODO: doesn't work
    jest.spyOn(HandlerMock1, 'handle');
    jest.spyOn(loggerMock.logger, 'success');

    instance = new ErrTracker(HandlerMock1, loggerMock);
  });

  it('ErrTracker is instantiable', () => {
    expect(instance.handle).toBeDefined();
    expect(instance.setExtraInfo).toBeDefined();
  });

  it('should handle error event', () => {
    const errEvent: ErrorEvent = {
      message: 'my bad',
      filename: 'my_file',
      error: new Error('my bad'),
      lineno: 1,
      colno: 2
    } as ErrorEvent;

    instance.handle(errEvent);

    expect(HandlerMock1.handle).toBeCalledWith(errEvent, []);
    // todo : why falling?
    // expect(loggerMock.logger.success).toBeCalled();
    // expect(loggerMock.logger.error).not.toBeCalled();
  });
});
