export interface ETData {
  details?: object;
  token: string;
  url: string;
}

export type ETFormatter<T, S> = (errorEvent: ErrorEvent, basicData: S) => T;

export interface ETBuilder {
  build: (errorEvent: Partial<ErrorEvent>) => object;
}

export class MessageBuilder implements ETBuilder {
  constructor(private data: ETData) {}

  build(errorEvent: Partial<ErrorEvent>) {
    const substring = 'script error';
    const message = errorEvent.toString();
    let event: Partial<ErrorEvent> = errorEvent;

    if (message.indexOf(substring) > -1) {
      event = { message: 'Script Error: See Browser Console for Detail' };
    }

    return {
      ...event,
      ...this.data
    };
  }
}
