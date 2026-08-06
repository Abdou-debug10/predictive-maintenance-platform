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
        "http://localhost:5173",
        "https://predictive-maintenance-platform-ten.vercel.app"
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
    try:
        rows = get_predictions()
        
        if not rows:
            return []  # ← إرجاع مصفوفة فارغة
        
        data = []
        for row in rows:
            data.append({
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
            })
        
        return data
    
    except Exception as e:
        print(f"ERROR in /predictions: {str(e)}")  # ← للتشخيص
        return {"error": str(e), "detail": "Database connection failed"}
@app.post("/predict")
def predict(request: PredictionRequest):

    confidence = 100.0

    # -------------------------
    # Air Temperature (Ideal = 300 K)
    # -------------------------
    confidence -= abs(request.air_temp - 300) * 0.8

    # -------------------------
    # Process Temperature (Ideal = 310 K)
    # -------------------------
    confidence -= abs(request.process_temp - 310) * 0.8

    # -------------------------
    # Rotational Speed (Ideal = 1600 RPM)
    # -------------------------
    confidence -= abs(request.rotational_speed - 1600) / 20

    # -------------------------
    # Torque
    # -------------------------
    ideal_torque = {
        "L": 45,
        "M": 55,
        "H": 65
    }

    confidence -= abs(
        request.torque - ideal_torque[request.machine_type]
    ) * 0.7

    # -------------------------
    # Tool Wear
    # -------------------------
    confidence -= request.tool_wear * 0.12

    # -------------------------
    # Extra penalties
    # -------------------------
    if request.air_temp > 320:
        confidence -= 5

    if request.process_temp > 320:
        confidence -= 5

    if request.rotational_speed > 2000:
        confidence -= 8

    if request.tool_wear > 180:
        confidence -= 8

    # -------------------------
    # Clamp
    # -------------------------
    confidence = max(0, min(100, confidence))

    # -------------------------
    # Prediction
    # -------------------------
    if confidence >= 90:
        prediction = "Machine Healthy"
    elif confidence >= 70:
        prediction = "Maintenance Required Soon"
    elif confidence >= 50:
        prediction = "High Risk"
    else:
        prediction = "Machine Failure Predicted"

    save_prediction(
        machine_type=request.machine_type,
        air_temp=request.air_temp,
        process_temp=request.process_temp,
        rotational_speed=request.rotational_speed,
        torque=request.torque,
        tool_wear=request.tool_wear,
        prediction=prediction,
        confidence=round(confidence, 2)
    )

    return {
        "prediction": prediction,
        "confidence": round(confidence, 2)
    }