import { buildEventHandler } from '../core/utils';
import { ConsoleLogger, DummyLogger } from '../loggers/loggers';
import { buildSlackErrorTracker, ErrTrackerSlackConfig } from './slack-errtracker';
import { browserBasedReportStrategy } from '../report-strategies/report-first-strategy';

describe('Unique Slack ErrTracker Library', () => {
  let uniqueSlackErrTracker: any;

  beforeEach(() => {
    // @ts-ignore
    buildEventHandler = jest.fn();

    uniqueSlackErrTracker = buildSlackErrorTracker(browserBasedReportStrategy);
  });

  it('should build listener with specific params (with dummy logger)', () => {
    uniqueSlackErrTracker({
      webHookUrl: 'http://webhook.url',
      details: { qwe: 'qwe', asd: 'asd' }
    } as ErrTrackerSlackConfig);

    expect(buildEventHandler).toHaveBeenCalledWith({
      url: 'http://webhook.url',
      builder: expect.any(Object),
      logger: DummyLogger,
      transport: expect.any(Function),
      reportStrategy: browserBasedReportStrategy
    });
  });

  it('should build listener with specific params (with console logger)', () => {
    uniqueSlackErrTracker({
      webHookUrl: 'http://webhook.url',
      details: { qwe: 'qwe', asd: 'asd' },
      useConsoleLogger: true
    } as ErrTrackerSlackConfig);

    expect(buildEventHandler).toHaveBeenCalledWith({
      url: 'http://webhook.url',
      builder: expect.any(Object),
      logger: ConsoleLogger,
      transport: expect.any(Function),
      reportStrategy: browserBasedReportStrategy
    });
  });
});
