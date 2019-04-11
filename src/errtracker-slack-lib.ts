import { buildSlackErrorTracker } from './trackers/slack-errtracker';
import { alwaysReportStrategy } from './report-strategies/report-strategies';

export const slackErrTracker = buildSlackErrorTracker(alwaysReportStrategy, window);

// @ts-ignore
window['slackErrTracker'] = slackErrTracker;
