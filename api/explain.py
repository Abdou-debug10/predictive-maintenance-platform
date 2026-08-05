from fastapi import APIRouter

from api.models.prediction_request import PredictionRequest
from api.services.explain_service import explain_prediction

router = APIRouter()


@router.post("/explain")
def explain(request: PredictionRequest):

    result = explain_prediction(

        machine_type=request.Type,

        air_temp=request.air_temp,

        process_temp=request.process_temp,

        rotational_speed=request.rotational_speed,

        torque=request.torque,

        tool_wear=request.tool_wear

    )

    return result