GET /predictions API

Purpose:
Retrieve all historical predictions from PostgreSQL.

Implementation:

1. Create get_predictions() in db_service.py
2. Execute SQL query:
   SELECT * FROM predictions ORDER BY id DESC
3. Convert rows to JSON
4. Return response through FastAPI

Test Result:

Successfully returned 3 prediction records.

Response Fields:

- id
- prediction
- confidence
- created_at

Benefits:

- Prediction history
- Dashboard integration
- Reporting
- Maintenance analytics