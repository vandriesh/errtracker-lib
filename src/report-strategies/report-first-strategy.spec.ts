import { buildReportStrategy, getErrorEventId } from './report-first-strategy';

describe('Reporting Strategy: ReportFirst', () => {
  let instance: any;
  const filename = 'https://1.com/1.js';
  const lineno = 1;
  const colno = 13;

  beforeEach(() => {
    instance = buildReportStrategy(window.localStorage);
  });

  it('should provide a function to return error event id', () => {
    const filename = 'https://1.com/1.js';
    const lineno = 1;
    const colno = 13;
    const errorEvent = { filename, lineno, colno, error: new Error('zzz'), message: 'qqq' };
    const outId = getErrorEventId(errorEvent);

    expect(outId).toEqual(`${filename}:${lineno}:${colno}`);
  });

  it('should return if event should be reported', () => {
    let error = new Error('zzz');
    const errorEvent = { filename, lineno, colno, error, message: 'qqq' };
    const firstOfItsKindReportStrategy = buildReportStrategy(window.localStorage);

    const report1 = firstOfItsKindReportStrategy.toReport(errorEvent);

    expect(report1).toBeTruthy();
    const report2 = firstOfItsKindReportStrategy.toReport(errorEvent);

    expect(report2).toBeFalsy();
  });
});
