import { buildEventHandler } from '../core/utils';
import { buildSlackErrorTracker, ErrTrackerSlackConfig } from './slack-errtracker';
import { ConsoleLogger, DummyLogger } from '../loggers/loggers';
import { alwaysReportStrategy } from '../report-strategies/report-strategies';

describe('Slack ErrTracker Library', () => {
  it('should build listener with specific params (with dummy logger)', () => {
    // @ts-ignore
    buildEventHandler = jest.fn();

    const slackErrorTracker = buildSlackErrorTracker(alwaysReportStrategy);

    slackErrorTracker({
      webHookUrl: 'http://webhook.url',
      details: { qwe: 'qwe', asd: 'asd' }
    } as ErrTrackerSlackConfig);

    expect(buildEventHandler).toHaveBeenCalledWith({
      url: 'http://webhook.url',
      builder: expect.any(Object),
      logger: DummyLogger,
      transport: expect.any(Function),
      reportStrategy: alwaysReportStrategy
    });
  });

  it('should build listener with specific params (with console logger)', () => {
    // @ts-ignore
    buildEventHandler = jest.fn();
    const slackErrorTracker = buildSlackErrorTracker(alwaysReportStrategy);

    slackErrorTracker({
      webHookUrl: 'http://webhook.url',
      details: { qwe: 'qwe', asd: 'asd' },
      useConsoleLogger: true
    } as ErrTrackerSlackConfig);

    expect(buildEventHandler).toHaveBeenCalledWith({
      url: 'http://webhook.url',
      builder: expect.any(Object),
      logger: ConsoleLogger,
      transport: expect.any(Function),
      reportStrategy: alwaysReportStrategy
    });
  });
});
