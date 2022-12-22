import HttpClient from './utils/HttpClient';

class AddressService {
  constructor() {
    this.httpClient = new HttpClient('https://casadasopa-api.herokuapp.com/api');
  }

  createAddress(address) {
    return this.httpClient.post('/endereco', {
      body: address,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  updateAddress(id, address) {
    return this.httpClient.put(`/endereco/${id}`, {
      body: address,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}

export default new AddressService();
