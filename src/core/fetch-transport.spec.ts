import { buildCorsTransporter, buildNoCorsTransporter, TransportContract } from './fetch-transport';
import { ErrTrackerConfig } from './ETErrorEvent';

const globalAny: any = global;
/**
 * Transport
 */
describe('Transport', () => {
  let mockSuccessResponse: object;
  let mockFetchPromise: Promise<object>;
  let postData: TransportContract;
  let corsPostData: TransportContract;

  beforeEach(() => {
    mockSuccessResponse = { a: 1, b: 2 };
    mockFetchPromise = Promise.resolve({
      json: () => mockSuccessResponse
    });
    globalAny.fetch = jest.fn().mockImplementation(() => mockFetchPromise); // 4;
    postData = buildNoCorsTransporter();
    corsPostData = buildCorsTransporter({
      apiKey: 'xxxx-xxxx-xxxx'
    } as ErrTrackerConfig);
  });

  afterEach(() => {
    globalAny.fetch.mockClear();
  });

  it('should be defined', () => {
    expect(postData).toBeDefined();
  });

  it('it should fetch with specific parameters', (done) => {
    const mockSuccessResponse = { a: 1, b: 2 };

    const data = { x: 1, y: 2, z: 3 };

    // tslint:disable-next-line:no-floating-promises
    postData('/url', data).then((res: Response) => {
      const body: any = res.json();
      expect(body).toEqual(mockSuccessResponse);
      done();
    });

    expect(fetch).toHaveBeenCalledTimes(1);

    // assert on the times called and arguments given to fetch
    expect(fetch).toHaveBeenCalledWith('/url', {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
  });

  it('it should fetch with cors parameters', (done) => {
    const mockSuccessResponse = { a: 1, b: 2 };

    const data = { x: 1, y: 2, z: 3 };

    // tslint:disable-next-line:no-floating-promises
    corsPostData('/url', data).then((res: Response) => {
      const body: any = res.json();
      expect(body).toEqual(mockSuccessResponse);
      done();
    });

    expect(fetch).toHaveBeenCalledTimes(1);

    // assert on the times called and arguments given to fetch
    expect(fetch).toHaveBeenCalledWith('/url', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'x-api-key': 'xxxx-xxxx-xxxx'
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
  });

  it('should return immediate resolve object if url is not provided', (done) => {
    // tslint:disable-next-line:no-floating-promises
    postData('').then((resp) => {
      expect(resp).toEqual({});
      done();
    });

    expect(fetch).toHaveBeenCalledTimes(0);
  });

  it('should return immediate resolve object if url is not provided', (done) => {
    // tslint:disable-next-line:no-floating-promises
    postData('', undefined).then((resp) => {
      expect(resp).toEqual({});
      done();
    });

    expect(fetch).toHaveBeenCalledTimes(0);
  });

  it('should return immediate resolve object if url is not provided', (done) => {
    // tslint:disable-next-line:no-floating-promises
    corsPostData('').then((resp) => {
      expect(resp).toEqual({});
      done();
    });

    expect(fetch).toHaveBeenCalledTimes(0);
  });

  it('should return immediate resolve object if url is not provided', (done) => {
    // tslint:disable-next-line:no-floating-promises
    corsPostData('', undefined).then((resp) => {
      expect(resp).toEqual({});
      done();
    });

    expect(fetch).toHaveBeenCalledTimes(0);
  });

  it('should fetch without data', (done) => {
    // tslint:disable-next-line:no-floating-promises
    postData('/another-url').then((res) => {
      const body: any = res.json();
      expect(body).toEqual(mockSuccessResponse);

      done();
    });

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
