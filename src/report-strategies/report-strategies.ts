import { ETErrorEvent } from '../core/ETErrorEvent';

export interface ReportStrategy {
  toReport: (event: ETErrorEvent) => boolean;
}

export const alwaysReportStrategy: ReportStrategy = {
  toReport: () => true
};
