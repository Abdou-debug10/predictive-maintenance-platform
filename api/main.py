from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models.prediction_request import PredictionRequest
from services.db_service import save_prediction, get_predictions
from copilot import router as copilot_router

import joblib
import pandas as pd

# Kafka Producer
from event_stream.producer import send_prediction
from explain import router as explain_router

app = FastAPI()

app.include_router(copilot_router)
app.include_router(explain_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load ML Model
model = joblib.load(
    "ml/saved_models/failure_prediction_model.pkl"
)


@app.get("/")
def home():

    return {
        "message": "AI Predictive Maintenance API Running"
    }


@app.get("/predictions")
def fetch_predictions():

    rows = get_predictions()

    data = []

    for row in rows:

        data.append(
    {
        "id": row[0],
        "machine_type": row[1],
        "air_temp": row[2],
        "process_temp": row[3],
        "rotational_speed": row[4],
        "torque": row[5],
        "tool_wear": row[6],
        "prediction": row[7],
        "confidence": row[8],
        "created_at": str(row[9])
    }
)

    return data


@app.post("/predict")
def predict(request: PredictionRequest):

    new_machine = pd.DataFrame(
        [[
            request.Type,
            request.air_temp,
            request.process_temp,
            request.rotational_speed,
            request.torque,
            request.tool_wear
        ]],
        columns=[
            "Type",
            "air_temp",
            "process_temp",
            "rotational_speed",
            "torque",
            "tool_wear"
        ]
    )

    prediction = model.predict(new_machine)

    probability = model.predict_proba(new_machine)

    confidence = round(
        float(max(probability[0]) * 100),
        2
    )

    if prediction[0] == 1:

        prediction_text = "Machine Failure Predicted"

    else:

        prediction_text = "Machine Healthy"

    # ------------------------
    # Save Prediction to PostgreSQL
    # ------------------------

    save_prediction(

        request.Type,

        request.air_temp,

        request.process_temp,

        request.rotational_speed,

        request.torque,

        request.tool_wear,

        prediction_text,

        confidence

    )

    # ------------------------
    # Send to Kafka
    # ------------------------

    send_prediction(
        prediction_text,
        confidence
    )

    return {

        "prediction": prediction_text,

        "confidence": confidence

    }