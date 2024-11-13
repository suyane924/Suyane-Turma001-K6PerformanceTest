import Example from '../requests/Example.request.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { group } from 'k6';

const example = new Example();

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
  group('post pdf', function () {
    //example.getContacts(token, binFile);
    example.getContacts();
  });
}
