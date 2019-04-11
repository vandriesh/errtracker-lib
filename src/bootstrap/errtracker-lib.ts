import { alwaysReportStrategy } from '../report-strategies/report-strategies';
import { buildErrorTracker } from '../trackers/errtracker';

// @ts-ignore
window['errtracker'] = buildErrorTracker(alwaysReportStrategy);
