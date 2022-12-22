import HttpClient from './utils/HttpClient';

class MailService {
  constructor() {
    this.httpClient = new HttpClient('https://casadasopa-api.herokuapp.com/api');
  }

  mailContact(mail) {
    return this.httpClient.post('/mail', {
      body: mail,
    });
  }

  mailSolicitacao(mail) {
    return this.httpClient.post('/mailSolicitacao', {
      body: mail,
    });
  }
}

export default new MailService();
