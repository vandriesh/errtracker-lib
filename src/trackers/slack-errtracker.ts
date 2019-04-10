import { ErrTrackerBasicConfig } from '../core/ETErrorEvent';

export interface ErrTrackerSlackConfig extends ErrTrackerBasicConfig {
  details?: object;
  webHookUrl: string;
}

export enum ReportStrategies {
  ALL = 'ALL',
  FIRST_OF_ITS_KIND = 'FIRST_OF_ITS_KIND'
}
