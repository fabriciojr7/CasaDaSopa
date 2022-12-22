import HttpClient from './utils/HttpClient';

class ContributorGroupService {
  constructor() {
    this.httpClient = new HttpClient('https://casadasopa-api.herokuapp.com/api');
  }

  listContributorsGroup() {
    return this.httpClient.get('/colaboradorGrupo', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  getGroup(id) {
    return this.httpClient.get(`/colaboradorGrupo/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  createContributorGroup(contrGruop) {
    return this.httpClient.post('/colaboradorGrupo', {
      body: contrGruop,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  updateContributorGroup(id, contrGruop) {
    return this.httpClient.put(`/colaboradorGrupo/${id}`, {
      body: contrGruop,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  deleteContributorGroup(id) {
    return this.httpClient.delete(`/colaboradorGrupo/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}

export default new ContributorGroupService();
