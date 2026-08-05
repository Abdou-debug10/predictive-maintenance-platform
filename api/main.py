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

    # تبدأ الثقة من 99%
    confidence = 99.0

    # -------------------------
    # Air Temperature (295 - 305 K)
    # -------------------------
    if request.air_temp < 295:
        confidence -= (295 - request.air_temp) * 0.4
    elif request.air_temp > 305:
        confidence -= (request.air_temp - 305) * 0.4

    # -------------------------
    # Process Temperature (305 - 315 K)
    # -------------------------
    if request.process_temp < 305:
        confidence -= (305 - request.process_temp) * 0.4
    elif request.process_temp > 315:
        confidence -= (request.process_temp - 315) * 0.4

    # -------------------------
    # Rotational Speed (1400 - 1800 RPM)
    # -------------------------
    if request.rotational_speed < 1400:
        confidence -= (1400 - request.rotational_speed) / 80
    elif request.rotational_speed > 1800:
        confidence -= (request.rotational_speed - 1800) / 80

    # -------------------------
    # Torque depends on Machine Type
    # -------------------------
    if request.machine_type == "L":
        max_torque = 55
    elif request.machine_type == "M":
        max_torque = 65
    else:   # H
        max_torque = 75

    if request.torque < 40:
        confidence -= (40 - request.torque) * 0.8
    elif request.torque > max_torque:
        confidence -= (request.torque - max_torque) * 0.8

    # -------------------------
    # Tool Wear (0 - 150 min)
    # -------------------------
    if request.tool_wear > 150:
        confidence -= (request.tool_wear - 150) * 0.15

    # منع الثقة من النزول أقل من 50%
    confidence = max(50.0, min(99.5, confidence))

    # -------------------------
    # Final Prediction
    # -------------------------
    if confidence >= 90:
        prediction = "Machine Healthy"
    elif confidence >= 75:
        prediction = "Maintenance Required Soon"
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
        confidence=round(confidence, 1)
    )

    return {
        "prediction": prediction,
        "confidence": round(confidence, 1)
    }