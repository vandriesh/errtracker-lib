import { ConsoleLogger, ErrTrackerLogger } from './loggers';

describe('Loggers', () => {
  let logger: ErrTrackerLogger;

  beforeEach(() => {
    logger = ConsoleLogger;
  });

  it('should be defined', () => {
    expect(logger.success).toBeDefined();
    expect(logger.error).toBeDefined();

    console.log = jest.fn().mockImplementation();
    console.warn = jest.fn().mockImplementation();

    logger.success('ErrTracker:ok', 'zzz');
    logger.error('ErrTracker:fail', 'qqq');

    expect(console.log).toHaveBeenCalledWith('ErrTracker:ok', 'zzz');
    expect(console.warn).toHaveBeenCalledWith('ErrTracker:fail', 'qqq');
    // logger.success('zzz');
  });
});
