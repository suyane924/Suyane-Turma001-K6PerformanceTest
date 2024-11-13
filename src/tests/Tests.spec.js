import Example from '../requests/Example.request.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { group } from 'k6';
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

//const example = new Example();

export const getContactsDuration = new Trend('get_contacts', true);

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['avg<10000'] // 95% of requests should be below 200ms
  }
};

export function handleSummary(data) {
  return {
    './src/output/index.html': htmlReport(data)
  };
}

/*export function setup() {
  const token = attornatus.postLogin();
  return token;
}*/

//export default function (token) {
export default function () {
  const baseUrl = 'https://test.k6.io/';
  /* group('post pdf', function () {
    //example.getContacts(token, binFile);
    example.getContacts();
  });*/
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
  const res = http.get(`${baseUrl}`, params);
  //const token = 'Bearer ' + res.json('access_token');

  getContactsDuration.add(res.timings.duration);

  check(res, {
    'get contacts - status 200': () => res.status === OK
  });
  //return token;
}
