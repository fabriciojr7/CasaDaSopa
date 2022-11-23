import HttpClient from './utils/HttpClient';

class FamilyDonationService {
  constructor() {
    this.httpClient = new HttpClient('https://web-production-7847.up.railway.app/api');
  }

  listDonations() {
    return this.httpClient.get('/solicitacao');
  }

  listFamilyDonation(idFamily) {
    return this.httpClient.get(`/solicitacoesPorResponsavel/${idFamily}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  getDonation(id) {
    return this.httpClient.get(`/solicitacao/${id}`);
  }

  createDonation(donation) {
    return this.httpClient.post('/solicitacao', {
      body: donation,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  updateDonation(id, donation) {
    return this.httpClient.put(`/solicitacao/${id}`, {
      body: donation,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async deleteDonation(id) {
    return this.httpClient.delete(`/solicitacao/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}

export default new FamilyDonationService();
