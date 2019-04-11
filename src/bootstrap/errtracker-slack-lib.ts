import { alwaysReportStrategy } from '../report-strategies/report-strategies';
import { buildSlackErrorTracker } from '../trackers/slack-errtracker';

// @ts-ignore
window['slackErrTracker'] = buildSlackErrorTracker(alwaysReportStrategy);
