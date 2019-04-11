import { ErrTrackerConfig, getAPIUrl } from './ETErrorEvent';

describe('ErrTracker', () => {
  it('should return url', function() {
    expect(getAPIUrl({} as ErrTrackerConfig)).toEqual('https://errtracker.com/api/v1/alerts');
    expect(getAPIUrl({ apiURL: 'https://1.com' } as ErrTrackerConfig)).toEqual('https://1.com');
  });
});
