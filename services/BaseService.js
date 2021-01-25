export class BaseService {
  constructor() {}

  post = (url) => {
    const promise = axios({
      url: url,
      method: "POST",
    });
    return promise;
  };
  put = (url, data) => {
    const promise = axios({
      url: url,
      method: "PUT",
      data: data,
    });
    return promise;
  };

  delete = (url, data) => {
    const promise = axios({
      url: url,
      method: "DELETE",
      data: data,
    });
    return promise;
  };

  get = (url) => {
    const promise = axios({
      url: url,
      method: "GET",
    });
    return promise;
  };
}
