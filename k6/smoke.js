import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,
  duration: '10s',
  thresholds: {
    http_req_failed: ['rate<0.01'],   // error rate below 1%
    http_req_duration: ['p(95)<500'], // p95 latency below 500ms
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
