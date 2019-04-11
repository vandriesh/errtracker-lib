import { browserBasedReportStrategy } from '../report-strategies/report-first-strategy';
import { buildSlackErrorTracker } from '../trackers/slack-errtracker';

// @ts-ignore
window['uniqueSlackErrTracker'] = buildSlackErrorTracker(browserBasedReportStrategy);
