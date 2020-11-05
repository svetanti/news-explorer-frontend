import { newsApiOptions } from './options';
const { baseUrl, from, to, pageSize, headers } = newsApiOptions;

export function sendRequest(keyword, parameters) {
  return fetch(`${baseUrl}?q=${keyword}&${from}&${to}&${pageSize}`,
    parameters)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
}

export function getNews(keyword) {
  return sendRequest(keyword, { headers });
}