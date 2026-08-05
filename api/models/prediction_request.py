from pydantic import BaseModel

class PredictionRequest(BaseModel):
    machine_type: str      # L / M / H
    air_temp: float
    process_temp: float
    rotational_speed: int
    torque: float
    tool_wear: int