export type TransportContract = (url: string, data?: object) => Promise<Response>;

export const postData: TransportContract = (url, data = {}) => {
  if (!url) {
    return Promise.resolve({} as Response);
  }

  // Default options are marked with *
  return fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    cache: 'no-cache',
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
};
