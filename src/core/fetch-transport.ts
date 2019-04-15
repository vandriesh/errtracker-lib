export type TransportContract = (url: string, data?: object) => Promise<Response>;

export const postData: TransportContract = (url, data = {}) => {
  if (!url) {
    return Promise.resolve({} as Response);
  }

  return fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    cache: 'no-cache',
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify(data)
  });
};

export const corsPostData: TransportContract = (url, data = {}) => {
  if (!url) {
    return Promise.resolve({} as Response);
  }

  return fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify(data)
  });
};
