import Utils from './utils';
import { SlackHandler } from './slack-handler';

export interface ErrorEventHandlerInterface {
  handle(event: ErrorEvent): boolean;
}

export interface ErrTrackerHandler {
  handle: (error: ErrorEvent, info?: string[]) => void;
}

export class ErrTracker implements ErrorEventHandlerInterface {
  private extraInfo = {};
  private handlers: ErrTrackerHandler[] = [];
  private handlersQuickAccess: {
    [key: string]: ErrTrackerHandler;
  } = {};
  constructor(defaultHandler: ErrTrackerHandler) {
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
    this.handlers.forEach(handler => handler.handle(errMsg, Utils.toArray(this.extraInfo)));

    return true;
  }

  public setExtraInfo(extraInfo: object) {
    this.extraInfo = Object.assign({}, this.extraInfo, extraInfo);
  }
}
