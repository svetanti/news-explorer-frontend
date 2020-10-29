export class Api {
  constructor(request, options) {
    this._request = request;
    this._url = options.baseUrl;
    this._from = options.from;
    this._to = options.to;
    this._pageSize = options.pageSize;
    this._apiKey = options.apiKey
    this._headers = options.headers;
  }

  _sendRequest(request, parameters) {
    return fetch(`${this._url}?q=${this._request}&${this._from}&${this._to}&${this._pageSize}&${this._apiKey}`,
      parameters)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      });
  }

  getNews() {
    return this._sendRequest(this._request, { headers: this._headers });
  }
}