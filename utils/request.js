const axios = require("axios");

class BaseApi {
  constructor(host = "") {
    this.host = host;
  }

  request({
    method = "get",
    api,
    data = {},
    params = {},
    headers = {},
  }) {
    // params = ["put", "post", "patch"].includes(method) ? params : data;
    //data只适用于'PUT', 'POST', 和 'PATCH'
    return axios({
      baseURL: this.host,
      method,
      url: api,
      data,
      params,
      headers,
    })
      .then((response = {}) => {
        if (response.data && response.data.code === 200)
          return Promise.resolve(data);
        return Promise.reject(response.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  get({ api, data, cache = false, ttl, headers }) {
    return this.request({ api, params: data, cache, ttl, headers });
  }

  post({ api, data, headers }) {
    return this.request({ method: "post", api, data, headers });
  }

  put({ api, data = {}, params, headers }) {
    return this.request({ method: "put", api, data, params, headers });
  }

  delete({ api, data = {}, params, headers }) {
    return this.request({ method: "delete", api, data, params, headers });
  }
}

module.exports = BaseApi;
