# Workshop: Load & Stress Testing با k6 و AI

API پایتونی (FastAPI) با چند bottleneck عمدی. با k6 فشار می‌آوریم و نتایج را با AI تحلیل می‌کنیم.

## Endpointها
| Endpoint | رفتار |
|----------|-------|
| /health | فوری، مرجع مقایسه |
| /products | ۵۰ms تأخیر |
| /search | محاسبه‌ی سنگین CPU |
| /report | pool با ۵ اتصال همزمان |

## نصب (Ubuntu)
```bash
sudo apt update
sudo apt install -y python3 python3-venv python3-pip git curl gpg
git clone <آدرس ریپو>
cd load-testing-workshop
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```
نصب k6: https://grafana.com/docs/k6/latest/set-up/install-k6/

## اجرا
ترمینال ۱:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```
ترمینال ۲:
```bash
k6 run k6/smoke.js    # اول smoke
k6 run k6/load.js     # بعد load
k6 run k6/stress.js   # بعد stress
```

## ساختار
- `main.py`: API (نسخه‌ی شروع)
- `k6/`: اسکریپت‌های تست
- `solution/`: نسخه‌ی اصلاح‌شده (قبل از تمرین نگاه نکنید)
