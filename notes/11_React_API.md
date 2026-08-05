React API Layer

File:
frontend/src/utils/api.js

Purpose:

Connect React frontend with FastAPI backend.

Endpoints:

GET /predictions

Returns:
Prediction history stored in PostgreSQL.

POST /predict

Returns:
Prediction and confidence score.

Benefits:

- Centralized API communication
- Cleaner React components
- Easier maintenance


React Component: StatCard

Purpose:
Display dashboard summary information.

Props:

- title
- value
- color

Benefits:

- Reusable component
- Cleaner UI
- Consistent styling



PredictionTable Component

Purpose:
Display prediction history received from FastAPI.

Input:

predictions (Array)

Output:

Responsive table containing:

- ID
- Prediction
- Confidence
- Created At

Benefits:

- Dynamic rendering
- Easy to reuse
- Connected to backend data