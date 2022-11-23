import HttpClient from './utils/HttpClient';

class FamilyService {
  constructor() {
    this.httpClient = new HttpClient('https://web-production-7847.up.railway.app/api');
  }

  listFamilies() {
    return this.httpClient.get('/responsavel', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  getFamily(id) {
    return this.httpClient.get(`/responsavel/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  createFamily(family) {
    return this.httpClient.post('/responsavel', {
      body: family,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  updateFamily(id, family) {
    return this.httpClient.put(`/responsavel/${id}`, {
      body: family,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  deleteFamily(id) {
    return this.httpClient.delete(`/responsavel/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}

export default new FamilyService();
