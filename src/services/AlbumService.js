import HttpClient from './utils/HttpClient';

class AlbumService {
  constructor() {
    this.httpClient = new HttpClient('https://web-production-7847.up.railway.app/api');
  }

  listAlbunsAll() {
    return this.httpClient.get('/album', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  listAlbunsVisible() {
    return this.httpClient.get('/albumsVisiveis');
  }

  getAlbum(id) {
    return this.httpClient.get(`/album/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  createAlbum(album) {
    return this.httpClient.post('/album', {
      body: album,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  updateAlbum(id, album) {
    return this.httpClient.put(`/album/${id}`, {
      body: album,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async deleteAlbum(id) {
    return this.httpClient.delete(`/album/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async addPhotoAlbum(foto) {
    return this.httpClient.post('/foto', {
      body: foto,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async removePhotoAlbum(id) {
    return this.httpClient.delete(`/foto/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}

export default new AlbumService();
