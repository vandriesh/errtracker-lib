import { browserBasedReportStrategy } from './report-strategies/report-first-strategy';
import { buildSlackErrorTracker } from './trackers/slack-errtracker';

export const uniqueSlackErrTracker = buildSlackErrorTracker(browserBasedReportStrategy, window);
// @ts-ignore
window['uniqueSlackErrTracker'] = uniqueSlackErrTracker;
