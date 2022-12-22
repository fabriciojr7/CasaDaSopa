import HttpClient from './utils/HttpClient';

class ContributorService {
  constructor() {
    this.httpClient = new HttpClient('https://casadasopa-api.herokuapp.com/api');
  }

  listContributors() {
    return this.httpClient.get('/colaborador', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  getContributor(id) {
    return this.httpClient.get(`/colaborador/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  createContributor(contributors) {
    return this.httpClient.post('/colaborador', {
      body: contributors,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  updateContributor(id, contributor) {
    return this.httpClient.put(`/colaborador/${id}`, {
      body: contributor,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  deleteContributor(id) {
    return this.httpClient.delete(`/colaborador/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}

export default new ContributorService();
