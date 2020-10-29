export class Api {
  constructor(keyword, options) {
    this._keyword = keyword;
    this._url = options.baseUrl;
    this._from = options.from;
    this._to = options.to;
    this._pageSize = options.pageSize;
    this._headers = options.headers;
  }

  _sendRequest(keyword, parameters) {
    return fetch(`${this._url}?q=${this._keyword}&${this._from}&${this._to}&${this._pageSize}`,
      parameters)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      });
  }

  getNews() {
    return this._sendRequest(this._keyword, { headers: this._headers });
  }
}