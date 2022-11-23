import HttpClient from './utils/HttpClient';

class DependentService {
  constructor() {
    this.httpClient = new HttpClient('https://web-production-7847.up.railway.app/api');
  }

  listDependents(id) {
    return this.httpClient.getById(`/dependentesPorResponsavel/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  getDependent(id) {
    return this.httpClient.get(`/dependente/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  createDependent(dependents) {
    return this.httpClient.post('/dependente', {
      body: dependents,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  updateDependent(id, dependent) {
    return this.httpClient.put(`/dependente/${id}`, {
      body: dependent,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  deleteDependent(id) {
    return this.httpClient.delete(`/dependente/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}

export default new DependentService();
