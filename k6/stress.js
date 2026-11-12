import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },  // ramp to 20 VUs
    { duration: '30s', target: 50 },  // ramp to 50 VUs
    { duration: '30s', target: 100 }, // ramp to 100 VUs
    { duration: '30s', target: 150 }, // ramp to 150 VUs
    { duration: '30s', target: 200 }, // ramp to 200 VUs
    { duration: '20s', target: 0 },   // ramp down to 0
  ],
  thresholds: {
    http_req_failed: [
      'rate<0.05', // error rate below 5% (evaluated, does not abort)
      {
        threshold: 'rate<0.20', // abort the test if errors reach 20%
        abortOnFail: true,
        delayAbortEval: '10s',
      },
    ],
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
