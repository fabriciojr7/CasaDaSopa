import HttpClient from './utils/HttpClient';

class MailService {
  constructor() {
    this.httpClient = new HttpClient('https://web-production-7847.up.railway.app/api');
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
