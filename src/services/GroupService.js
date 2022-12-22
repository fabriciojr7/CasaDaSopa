import HttpClient from './utils/HttpClient';

class GroupService {
  constructor() {
    this.httpClient = new HttpClient('https://casadasopa-api.herokuapp.com/api');
  }

  listGroups() {
    return this.httpClient.get('/grupo');
  }

  getGroup(id) {
    return this.httpClient.get(`/grupo/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  createGroup(group) {
    return this.httpClient.post('/grupo', {
      body: group,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  updateGroup(id, group) {
    return this.httpClient.put(`/grupo/${id}`, {
      body: group,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  deleteGroup(id) {
    return this.httpClient.delete(`/grupo/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}

export default new GroupService();
