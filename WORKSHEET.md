# Worksheet: Load & Stress Testing with k6 and AI

Name: ____________________    Date: ____________

## Part 1: Hypotheses (write BEFORE running the load test)

1. Which endpoint will become slow first? ____________________
2. Will we see errors with 20 VUs? Yes / No
3. Estimated overall p95 latency: ____________________

## Part 2: Writing the script with AI

1. Paste the prompt you gave the AI:

   ____________________________________________________________

2. Read the AI's script. What did you check or change?

   ____________________________________________________________

3. Smoke test result (pass / fail): ____________

## Part 3: Results

| Metric        | Load (20 VUs) | Stress (200 VUs) |
|---------------|---------------|------------------|
| Overall p95   |               |                  |
| Error rate    |               |                  |
| p95 /report   |               |                  |
| p95 /search   |               |                  |
| Throughput    |               |                  |

Were your Part 1 hypotheses correct? What surprised you?

____________________________________________________________

## Part 4: Analysis with AI

1. Give the stress test output to the AI (structured prompt: ask for
   evidence for each claim and for what it cannot conclude).
2. Which AI claims had a supporting number in the output?

   ____________________________________________________________

3. Which claims were guesses, with no supporting number?

   ____________________________________________________________

4. Run the analysis again, this time adding the API context (pool size,
   CPU-heavy endpoint). What changed in the AI's answer?

   ____________________________________________________________

## Part 5: Fix and re-test

Change only ONE thing at a time.

| Change made | Error rate | Overall p95 | What did it fix? |
|-------------|------------|-------------|------------------|
|             |            |             |                  |
|             |            |             |                  |

1. After your first fix, what is the next bottleneck? ______________
2. Did your prediction match the result? ______________

## Final question

Why is one green run not enough to conclude that a system is healthy?

____________________________________________________________
