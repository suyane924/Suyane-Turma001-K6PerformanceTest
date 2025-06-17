import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate } from 'k6/metrics';

export const options = {
  stages: [
    { duration: '1m', target: 10 },   
    { duration: '2m', target: 300 }, 
    { duration: '2m', target: 0 },    
  ],
  thresholds: {
    http_req_duration: ['p(95)<5700'],  
    'status_rate': ['rate>0.88'],        
  },
};


const durationTrend = new Trend('duration_trend');
const statusRate = new Rate('status_rate');

export default function () {
  const res = http.get('https://dummyjson.com/products');

  durationTrend.add(res.timings.duration);
  statusRate.add(res.status === 200);

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
