Prediction Storage Verification

Test Performed:

1. Initial Records: 2
2. Executed POST /predict
3. Checked PostgreSQL

Result:

Records Increased:

2 → 3

Conclusion:

FastAPI successfully stores predictions in PostgreSQL.

Verified Flow:

User
 ↓
FastAPI
 ↓
XGBoost
 ↓
save_prediction()
 ↓
PostgreSQL


Get Predictions Function

File:
api/services/db_service.py

Function:
get_predictions()

Purpose:

Retrieve prediction history from PostgreSQL.

Query:

SELECT * FROM predictions

Ordering:

Newest records first.