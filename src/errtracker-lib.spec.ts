import { ErrTracker, ErrTrackerConfig, ErrTrackerHandler } from './errtracker';

/**
 * ErrTracker
 */
describe('ErrTracker', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy();
  });

  it('ErrTracker is instantiable', () => {
    const HandlerMock: ErrTrackerHandler = {
      handle: () => {
        return new Promise(() => {
          return '';
        });
      }
    };

    expect(new ErrTracker(HandlerMock, {} as ErrTrackerConfig)).toBeInstanceOf(ErrTracker);
  });
});
