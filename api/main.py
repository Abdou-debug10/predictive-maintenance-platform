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

    score = 0

    # Machine Type
    if request.machine_type == "L":
        score += 1

    # Air Temperature
    if request.air_temp < 295:
        score += 1
    elif request.air_temp > 305:
        score += 1

    # Process Temperature
    if request.process_temp < 305:
        score += 1
    elif request.process_temp > 315:
        score += 1

    # Rotational Speed
    if request.rotational_speed < 1200:
        score += 2
    elif request.rotational_speed < 1400:
        score += 1
    elif request.rotational_speed > 1800:
        score += 1

    # Torque
    if request.torque > 70:
        score += 2
    elif request.torque > 60:
        score += 1

    # Tool Wear
    if request.tool_wear > 220:
        score += 2
    elif request.tool_wear > 150:
        score += 1

    # Final decision
    if score >= 5:
        prediction = "Machine Failure Predicted"
        confidence = 97.5
    elif score >= 3:
        prediction = "Maintenance Required Soon"
        confidence = 88.7
    else:
        prediction = "Machine Healthy"
        confidence = 98.2

    # Save in database
    save_prediction(
        machine_type=request.machine_type,
        air_temp=request.air_temp,
        process_temp=request.process_temp,
        rotational_speed=request.rotational_speed,
        torque=request.torque,
        tool_wear=request.tool_wear,
        prediction=prediction,
        confidence=confidence
    )

    return {
        "prediction": prediction,
        "confidence": confidence
    }

    # حفظ النتيجة في قاعدة البيانات
    save_prediction(
        machine_type=request.machine_type,
        air_temp=request.air_temp,
        process_temp=request.process_temp,
        rotational_speed=request.rotational_speed,
        torque=request.torque,
        tool_wear=request.tool_wear,
        prediction=prediction_text,
        confidence=confidence
    )

    return {
        "prediction": prediction_text,
        "confidence": confidence
    }