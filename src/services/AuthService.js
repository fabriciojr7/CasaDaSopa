import HttpClient from './utils/HttpClient';

class AddressService {
  constructor() {
    this.httpClient = new HttpClient('https://web-production-7847.up.railway.app/api');
  }

  realizalogin(dados) {
    return this.httpClient.post('/login', { body: dados });
  }

  realizalogout() {
    return this.httpClient.post('/logout');
  }
}

export default new AddressService();
