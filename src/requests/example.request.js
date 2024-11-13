import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

export const getContactsDuration = new Trend('get_contacts', true);

export default class Example {
  constructor() {
    this.baseUrl = 'https://test.k6.io/';
  }

  getContacts() {
    const payload = {
      client_id: '44984984649',
      grant_type: 'password',
      username: ' jmfilho@sp.gov.br',
      password: '123456'
    };

    const params = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const OK = 200;

    //const res = http.get(`${this.baseUrl}`, payload, params);
    const res = http.get(`${this.baseUrl}`, params);
    //const token = 'Bearer ' + res.json('access_token');

    getContactsDuration.add(res.timings.duration);

    check(res, {
      'get contacts - status 200': () => res.status === OK
    });
    //return token;
  }
}
