import { errTracker } from './errtracker-lib';
import { subscribeToEventListener } from './core/utils';
import { ErrTrackerConfig } from './core/ETErrorEvent';
import { alwaysReportStrategy } from './report-strategies/report-strategies';
import { ConsoleLogger, DummyLogger } from './loggers/loggers';

describe('ErrTracker Library', () => {
  it('should be defined', function() {
    expect(errTracker).toBeDefined();
  });

  it('should build listener with specific params', () => {
    // @ts-ignore
    subscribeToEventListener = jest.fn();

    errTracker({ token: '123', details: {} } as ErrTrackerConfig);

    expect(subscribeToEventListener).toHaveBeenCalledWith({
      scope: window,
      url: 'https://errtracker.com/api/v1/alerts',
      builder: expect.any(Object),
      logger: DummyLogger,
      transport: expect.any(Function),
      reportStrategy: alwaysReportStrategy
    });

    errTracker({ token: '123', details: {}, apiURL: 'http://1.com/zzz', useConsoleLogger: true } as ErrTrackerConfig);

    expect(subscribeToEventListener).toHaveBeenCalledWith({
      scope: window,
      url: 'http://1.com/zzz',
      builder: expect.any(Object),
      logger: ConsoleLogger,
      transport: expect.any(Function),
      reportStrategy: alwaysReportStrategy
    });
  });
});
