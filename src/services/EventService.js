import HttpClient from './utils/HttpClient';

class EventService {
  constructor() {
    this.httpClient = new HttpClient('https://web-production-7847.up.railway.app/api');
  }

  listClosedEvents() {
    return this.httpClient.get('/presencasEventoFinalizado', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  getOpenEvent() {
    return this.httpClient.get('/presencasEventoAberto/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  getEvent(id) {
    return this.httpClient.get(`/presencasPorEvento/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  createEvent(event) {
    return this.httpClient.post('/evento', {
      body: event,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  updateEvent(id, event) {
    return this.httpClient.put(`/evento/${id}`, {
      body: event,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  presenceEvent(id, presence) {
    return this.httpClient.put(`/presenca/${id}`, {
      body: presence,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

//   deleteEvent(id) {
//     return this.httpClient.delete(`/responsavel/${id}`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//     });
//   }
}

export default new EventService();
