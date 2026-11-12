import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '20s', target: 10 }, // ramp up 0 -> 10 VUs
    { duration: '40s', target: 10 }, // hold at 10 VUs
    { duration: '20s', target: 20 }, // ramp up 10 -> 20 VUs
    { duration: '40s', target: 20 }, // hold at 20 VUs
    { duration: '10s', target: 0 },  // ramp down to 0
  ],
  thresholds: {
    http_req_failed: ['rate<0.05'],    // error rate below 5%
    http_req_duration: ['p(95)<1000'], // overall p95 below 1000ms

    // Per-endpoint p95 thresholds, using the endpoint tag
    'http_req_duration{endpoint:health}': ['p(95)<1000'],
    'http_req_duration{endpoint:products}': ['p(95)<1000'],
    'http_req_duration{endpoint:search}': ['p(95)<1000'],
    'http_req_duration{endpoint:report}': ['p(95)<1000'],
  },
};

const BASE_URL = 'http://localhost:8000';

const endpoints = [
  { name: 'health', path: '/health' },
  { name: 'products', path: '/products' },
  { name: 'search', path: '/search?q=hello' },
  { name: 'report', path: '/report' },
];

export default function () {
  for (const { name, path } of endpoints) {
    const res = http.get(`${BASE_URL}${path}`, { tags: { endpoint: name } });

    check(res, {
      [`${name}: status is 200`]: (r) => r.status === 200,
    });
  }

  sleep(1);
}
