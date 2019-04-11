import { alwaysReportStrategy } from '../report-strategies/report-strategies';
import { ConsoleLogger, DummyLogger } from '../loggers/loggers';
import { buildEventHandler } from '../core/utils';
import { ErrTrackerConfig } from '../core/ETErrorEvent';
import { buildErrorTracker } from './errtracker';

describe('buildErrorTracker', () => {
  it('should build listener with specific params', () => {
    const errorTracker = buildErrorTracker(alwaysReportStrategy);

    // @ts-ignore
    buildEventHandler = jest.fn();

    errorTracker({ token: '123', details: {} } as ErrTrackerConfig);

    expect(buildEventHandler).toHaveBeenCalledWith({
      url: 'https://errtracker.com/api/v1/alerts',
      builder: expect.any(Object),
      logger: DummyLogger,
      transport: expect.any(Function),
      reportStrategy: alwaysReportStrategy
    });

    errorTracker({ token: '123', details: {}, apiURL: 'http://1.com/zzz', useConsoleLogger: true } as ErrTrackerConfig);

    expect(buildEventHandler).toHaveBeenCalledWith({
      url: 'http://1.com/zzz',
      builder: expect.any(Object),
      logger: ConsoleLogger,
      transport: expect.any(Function),
      reportStrategy: alwaysReportStrategy
    });
  });
});
