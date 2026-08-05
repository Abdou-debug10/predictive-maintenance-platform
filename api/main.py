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