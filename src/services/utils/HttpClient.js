import APIError from '../../errors/APIError';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  get(path, options) {
    return this.makeRequest(path, {
      method: 'GET',
      headers: options?.headers,
    });
  }

  post(path, options) {
    return this.makeRequest(path, {
      method: 'POST',
      body: options?.body,
      headers: options?.headers,
    });
  }

  put(path, options) {
    return this.makeRequest(path, {
      method: 'PUT',
      body: options?.body,
      headers: options?.headers,
    });
  }

  delete(path, options) {
    return this.makeRequest(path, {
      method: 'DELETE',
      headers: options?.headers,
    });
  }

  async makeRequest(path, options) {
    const headers = {};

    let body = {};
    if (options.body) {
      headers['Content-Type'] = 'application/json';
    }

    if (options.headers) {
      Object.entries(options.headers).forEach(([name, value]) => {
        headers[name] = value;
      });
    }

    if (Object.values(headers).includes('multipart/form-data;boundary=----WebKitFormBoundaryIn312MOjBWdkffIM')) {
      const formData = new FormData();
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries(formData)) {
        formData.append(key, value);
      } body = formData;
    } else {
      body = JSON.stringify(options.body);
    }

    const response = await fetch(`${this.baseURL}${path}`, {
      method: options.method,
      body,
      headers: new Headers(headers),
    });

    let responseBody = null;
    const contentType = response.headers.get('Content-Type');

    if (contentType?.includes('application/json')) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return responseBody;
    }

    throw new APIError(responseBody, response);
  }
}

export default HttpClient;
