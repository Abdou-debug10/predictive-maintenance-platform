import joblib
import pandas as pd

# Load saved model
model = joblib.load(
    "ml/saved_models/failure_prediction_model.pkl"
)

# Sample machine data
new_machine = pd.DataFrame(
    [[
        2,      # Type (H)
        300.0,  # air_temp
        310.0,  # process_temp
        1500,   # rotational_speed
        50,     # torque
        120     # tool_wear
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

# Predict
prediction = model.predict(new_machine)

# Display result
if prediction[0] == 1:
    print("\n⚠️ Machine Failure Predicted")
else:
    print("\n✅ Machine Healthy")