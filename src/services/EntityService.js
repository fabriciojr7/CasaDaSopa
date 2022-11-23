import HttpClient from './utils/HttpClient';

class EntityService {
  constructor() {
    this.httpClient = new HttpClient('https://web-production-7847.up.railway.app/api');
  }

  listEntities() {
    return this.httpClient.get('/entidade', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  getEntity(id) {
    return this.httpClient.get(`/entidade/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  createEntity(entitites) {
    return this.httpClient.post('/entidade', {
      body: entitites,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  updateEntity(id, entity) {
    return this.httpClient.put(`/entidade/${id}`, {
      body: entity,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  deleteEntity(id) {
    return this.httpClient.delete(`/entidade/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}

export default new EntityService();
