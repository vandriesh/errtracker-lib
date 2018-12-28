import Utils from './core/utils';

export interface ErrorEventHandlerInterface {
  handle(event: ErrorEvent): boolean;
}

export interface ErrTrackerHandler {
  handle: (error: ErrorEvent, info?: string[]) => Promise<Response>;
}

export interface ErrTrackerConfig {
  logger: {
    success: (...args: any[]) => void;
    error: (...args: any[]) => void;
  };
}

/*
const ErrTrackerConfigGlobal: ErrTrackerConfig = {
  logger: {
    success: () => {}
    error: () => {}
  }
}
*/

export class ErrTracker implements ErrorEventHandlerInterface {
  private extraInfo = {};
  private handlers: ErrTrackerHandler[] = [];
  private handlersQuickAccess: {
    [key: string]: ErrTrackerHandler;
  } = {};

  constructor(defaultHandler: ErrTrackerHandler, private config: ErrTrackerConfig) {
    this.handlers.push(defaultHandler);
    this.handlersQuickAccess[defaultHandler.constructor.name] = defaultHandler;
  }

  public handle(event: ErrorEvent) {
    const substring = 'script error';
    const message = event.toString();
    let errMsg: ErrorEvent;

    if (message.indexOf(substring) > -1) {
      errMsg = { message: 'Script Error: See Browser Console for Detail' } as ErrorEvent;
    } else {
      errMsg = event;
    }

    this.handlers.forEach(handler =>
      handler
        .handle(errMsg, Utils.toArray(this.extraInfo))
        .then(resp => this.config.logger.success(handler.constructor.name, ':ok', resp))
        .catch(resp => this.config.logger.error(handler.constructor.name, ':fail', resp))
    );

    return true;
  }

  public setExtraInfo(extraInfo: object) {
    this.extraInfo = Object.assign({}, this.extraInfo, extraInfo);
  }
}
