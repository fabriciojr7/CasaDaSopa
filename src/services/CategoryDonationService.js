import HttpClient from './utils/HttpClient';

class CategoryDonationService {
  constructor() {
    this.httpClient = new HttpClient('https://web-production-7847.up.railway.app/api');
  }

  listCategories() {
    return this.httpClient.get('/categoria');
  }

  //   listFamilyDonation(idFamily) {
  //     return this.httpClient.get(`/solicitacoesPorResponsavel/${idFamily}`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     });
  //   }

  getCategory(id) {
    return this.httpClient.get(`/categoria/${id}`);
  }

  createCategory(donation) {
    return this.httpClient.post('/categoria', {
      body: donation,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  updateCategory(id, donation) {
    return this.httpClient.put(`/categoria/${id}`, {
      body: donation,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async deleteCategory(id) {
    return this.httpClient.delete(`/categoria/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}

export default new CategoryDonationService();