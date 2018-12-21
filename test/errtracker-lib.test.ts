import { ErrTracker, ErrTrackerHandler } from '../src/errtracker';

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
        return;
      }
    };

    expect(new ErrTracker(HandlerMock)).toBeInstanceOf(ErrTracker);
  });
});
