import { ConsoleLogger, DummyLogger, ErrTrackerLogger, getLogger } from './loggers';
import { ErrTrackerConfig } from '../core/ETErrorEvent';

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

  it('should have success and error methods defined', function() {
    expect(DummyLogger.success).toBeDefined();
    expect(DummyLogger.error).toBeDefined();
    const trySuccess = (msg: any) => DummyLogger.success(msg);
    const tryError = (msg: any) => DummyLogger.error(msg);

    expect(() => trySuccess('test')).not.toThrow();
    expect(() => tryError('test')).not.toThrow();
  });

  it('should provide logger based in config', () => {
    const consoleLogger = getLogger({ useConsoleLogger: true });

    expect(consoleLogger).toEqual(ConsoleLogger);
    const defaultLogger = getLogger({} as ErrTrackerConfig);

    expect(defaultLogger).toEqual(DummyLogger);
  });
});
