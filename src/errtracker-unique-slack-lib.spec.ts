import { subscribeToEventListener } from './core/utils';
import { ConsoleLogger, DummyLogger } from './loggers/loggers';
import { ErrTrackerSlackConfig } from './trackers/slack-errtracker';
import { browserBasedReportStrategy } from './report-strategies/report-first-strategy';
import { uniqueSlackErrTracker } from './errtracker-unique-slack-lib';

describe('Unique Slack ErrTracker Library', () => {
  it('should be defined', () => {
    expect(uniqueSlackErrTracker).toBeDefined();
  });

  it('should build listener with specific params (with dummy logger)', () => {
    // @ts-ignore
    subscribeToEventListener = jest.fn();

    uniqueSlackErrTracker({
      webHookUrl: 'http://webhook.url',
      details: { qwe: 'qwe', asd: 'asd' }
    } as ErrTrackerSlackConfig);

    expect(subscribeToEventListener).toHaveBeenCalledWith({
      scope: window,
      url: 'http://webhook.url',
      builder: expect.any(Object),
      logger: DummyLogger,
      transport: expect.any(Function),
      reportStrategy: browserBasedReportStrategy
    });
  });

  it('should build listener with specific params (with console logger)', () => {
    // @ts-ignore
    subscribeToEventListener = jest.fn();

    uniqueSlackErrTracker({
      webHookUrl: 'http://webhook.url',
      details: { qwe: 'qwe', asd: 'asd' },
      useConsoleLogger: true
    } as ErrTrackerSlackConfig);

    expect(subscribeToEventListener).toHaveBeenCalledWith({
      scope: window,
      url: 'http://webhook.url',
      builder: expect.any(Object),
      logger: ConsoleLogger,
      transport: expect.any(Function),
      reportStrategy: browserBasedReportStrategy
    });
  });
});
