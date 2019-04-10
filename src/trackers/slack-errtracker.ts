import { ErrTrackerBasicConfig } from '../core/ETErrorEvent';

export interface ErrTrackerSlackConfig extends ErrTrackerBasicConfig {
  details?: object;
  webHookUrl: string;
}
