from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.models.prediction_request import PredictionRequest
from api.services.db_service import save_prediction, get_predictions
#Sfrom api.copilot import router as copilot_router

#import joblib
import pandas as pd

# Kafka Producer
#from event_stream.producer import send_prediction
#from api.explain import router as explain_router

app = FastAPI()

#app.include_router(copilot_router)
#app.include_router(explain_router)

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
model = None


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

    # Demo Mode (بدون نموذج AI)

    if request.torque > 60:
        prediction_text = "Machine Failure Predicted"
        confidence = 96.8
    else:
        prediction_text = "Machine Healthy"
        confidence = 98.2

    return {
        "prediction": prediction_text,
        "confidence": confidence
    }