from pydantic import BaseModel

class PredictionRequest(BaseModel):
    Type: int
    air_temp: float
    process_temp: float
    rotational_speed: int
    torque: float
    tool_wear: int