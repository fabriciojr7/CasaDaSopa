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
    const headers = new Headers();

    if (options.body && !(options.body instanceof FormData)) {
      headers.append('Content-type', 'application/json');
    }

    if (options.headers) {
      Object.entries(options.headers).forEach(([name, value]) => {
        headers.append(name, value);
      });
    }

    const response = await fetch(`${this.baseURL}${path}`, {
      method: options.method,
      body: options.body instanceof FormData ? options.body : JSON.stringify(options.body),
      headers,
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
