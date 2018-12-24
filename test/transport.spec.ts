import { postData } from '../src/transport';

const globalAny: any = global;
/**
 * Transport
 */
describe('Transport', () => {
  let mockSuccessResponse: object;
  let mockFetchPromise: Promise<object>;

  beforeEach(() => {
    globalAny.fetch = jest.fn().mockImplementation(() => mockFetchPromise); // 4;
    mockSuccessResponse = { a: 1, b: 2 };
    mockFetchPromise = Promise.resolve({
      // 3
      json: () => mockSuccessResponse
    });
  });

  afterEach(() => {
    globalAny.fetch.mockClear();
  });
  it('should be defined', () => {
    expect(postData).toBeDefined();
  });

  it('it should fetch with specific parameters', () => {
    const mockSuccessResponse = { a: 1, b: 2 };
    // const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
    const mockFetchPromise = Promise.resolve({
      // 3
      json: () => mockSuccessResponse
    });

    const data = { x: 1, y: 2, z: 3 };

    // assert on the response
    postData('/url', data).then((res: Response) => {
      const body: any = res.json();
      expect(body).toEqual(mockSuccessResponse);
      // done();
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
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
  });
  it('should return imediate resolve object if url is not provided', done => {
    postData().then(resp => {
      expect(resp).toEqual({});
      done();
    });

    postData('', undefined).then(resp => {
      expect(resp).toEqual({});
      done();
    });

    expect(fetch).toHaveBeenCalledTimes(0);
  });

  it('should fetch without data', done => {
    postData('/another-url').then(resp => {
      expect(resp.json()).toEqual(mockSuccessResponse);
      done();
    });

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
