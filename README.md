# Load & Stress Testing Workshop (k6 + AI)

A small FastAPI service with intentional bottlenecks. You will load-test it
with k6, analyze the results with an AI assistant, find the bottlenecks,
fix them, and re-test.

## Endpoints

| Endpoint    | Behavior                                   |
|-------------|--------------------------------------------|
| `/health`   | Returns immediately (baseline)             |
| `/products` | 50 ms simulated query                      |
| `/search`   | CPU-heavy computation (100k SHA-256 rounds)|
| `/report`   | DB connection pool limited to 5            |

## Requirements

- Ubuntu (tested on a VMware VM)
- Python 3.10+
- k6 ([install guide](https://grafana.com/docs/k6/latest/set-up/install-k6/))
- An AI assistant (Claude, ChatGPT, ...)

## Setup

```bash
git clone https://github.com/USERNAME/load-testing-workshop.git
cd load-testing-workshop
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
k6 version
```

## Run the API

Terminal 1:

```bash
source venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 8000
```

Quick check (Terminal 2):

```bash
curl http://localhost:8000/health
```

## Run the tests

Always run them in this order:

```bash
k6 run k6/smoke.js    # 1 VU, 10 s: does everything work?
k6 run k6/load.js     # up to 20 VUs, about 2 min: normal traffic
k6 run k6/stress.js   # up to 200 VUs, about 3 min: find the breaking point
```

## Project structure

```
main.py            API (starting version, with bottlenecks)
k6/                k6 test scripts (smoke, load, stress)
solution/          Fixed API version (do not open before the exercise)
WORKSHEET.md       Exercise sheet
```

## Fixing the bottlenecks

Change **one thing at a time** and re-run `k6/stress.js`:

1. Connection pool size in `main.py`
2. Number of uvicorn workers:
   `uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4`

## Notes

- Run the API and k6 on your own machine, not on a shared server.
- Results vary between runs. Repeat a test before drawing conclusions.
- k6 and the API share the same CPU when run on one machine, so results
  are somewhat pessimistic.
