import { ErrTrackerConfig } from './ETErrorEvent';

export type TransportContract = (url: string, data?: object) => Promise<Response>;

export const buildHeaders = ({ apiKey }: ErrTrackerConfig) => {
  return {
    'Content-Type': 'application/json; charset=utf-8',
    'x-api-key': apiKey
  };
};

export enum ET_FETCH_MODES {
  CORS = 'cors',
  NO_CORS = 'no-cors'
}

export const buildTransporterProperties = (mode: ET_FETCH_MODES): RequestInit => {
  return {
    method: 'POST',
    mode,
    cache: 'no-cache',
    credentials: 'omit',
    redirect: 'follow',
    referrer: 'no-referrer'
  };
};

export const buildCorsTransporter = (config: ErrTrackerConfig): TransportContract => {
  const headers = buildHeaders(config);
  const transporterConfig = buildTransporterProperties(ET_FETCH_MODES.CORS);

  return (url, data) => {
    if (!url) {
      return Promise.resolve({} as Response);
    }

    return fetch(url, {
      ...transporterConfig,
      headers,
      body: JSON.stringify(data)
    });
  };
};

export const buildNoCorsTransporter = (): TransportContract => {
  const transporterConfig = buildTransporterProperties(ET_FETCH_MODES.NO_CORS);

  return (url, data) => {
    if (!url) {
      return Promise.resolve({} as Response);
    }

    return fetch(url, {
      ...transporterConfig,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data)
    });
  };
};
