/*tslint no-floating-promises:false*/
import SlackHandler from './slack-handler';
import { TransportContract } from '../../core/fetch-transport';

describe('SlackHandler', () => {
  let instance: SlackHandler;
  let mockSuccessResponse: object;
  let mockFetchSuccessPromise: Promise<object>;
  let transportMock: TransportContract;

  const errMessage: ErrorEvent = {
    message: 'error',
    lineno: 1,
    colno: 2,
    filename: 'filename.js',
    error: {}
  } as ErrorEvent;

  beforeEach(() => {
    mockSuccessResponse = { a: 1, b: 2 };
    mockFetchSuccessPromise = Promise.resolve(mockSuccessResponse);

    transportMock = jest.fn().mockImplementation(() => mockFetchSuccessPromise);
    instance = new SlackHandler('url', { channel: 'channel' }, transportMock);
  });

  it('should be defined', () => {
    expect(SlackHandler).toBeDefined();
    expect(instance.handle).toBeDefined();
  });

  it('should send request and notify of success', () => {
    // tslint:disable-next-line:no-floating-promises
    instance.handle(errMessage).then(() => {
      return '';
    });

    expect(transportMock).toHaveBeenCalledWith('url', expect.any(Object));
  });

  it('should send request and notify of success (with extra info)', () => {
    // tslint:disable-next-line:no-floating-promises
    instance.handle(errMessage, ['a', 'b']);

    expect(transportMock).toHaveBeenCalledWith('url', expect.any(Object));
  });
});
