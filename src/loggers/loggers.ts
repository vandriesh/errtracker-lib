export interface ErrTrackerLogger {
  success: (...args: any[]) => void;
  error: (...args: any[]) => void;
}

export const ConsoleLogger: ErrTrackerLogger = {
  success: (...args: any[]) => console.log(...args),
  error: (...args: any[]) => console.warn(...args)
};

// tslint:disable:no-empty
export const DummyLogger: ErrTrackerLogger = {
  success: () => {},
  error: () => {}
};
