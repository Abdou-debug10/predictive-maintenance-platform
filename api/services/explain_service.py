import joblib
import shap
import pandas as pd
from pathlib import Path

# =====================================================
# Load Model
# =====================================================

BASE_DIR = Path(__file__).resolve().parents[2]

MODEL_PATH = BASE_DIR / "ml" / "saved_models" / "failure_prediction_model.pkl"

model = joblib.load(MODEL_PATH)

print("Model Loaded Successfully")

# =====================================================
# SHAP Background Data
# =====================================================

background = pd.DataFrame(
    [[0, 300, 310, 1500, 40, 100]],
    columns=[
        "Type",
        "air_temp",
        "process_temp",
        "rotational_speed",
        "torque",
        "tool_wear"
    ]
)

explainer = shap.Explainer(
    model.predict_proba,
    background
)

print("SHAP Loaded Successfully")


# =====================================================
# Explain Prediction
# =====================================================

def explain_prediction(
    machine_type,
    air_temp,
    process_temp,
    rotational_speed,
    torque,
    tool_wear
):

    # ----------------------------------------
    # Prepare Input
    # ----------------------------------------

    features = pd.DataFrame(
        [[
            machine_type,
            air_temp,
            process_temp,
            rotational_speed,
            torque,
            tool_wear
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

    # ----------------------------------------
    # Prediction
    # ----------------------------------------

    prediction = model.predict(features)[0]

    probability = model.predict_proba(features)[0]

    confidence = round(max(probability) * 100, 2)

    # ----------------------------------------
    # SHAP Explainability
    # ----------------------------------------

    shap_values = explainer(features)

    print("\n========== SHAP DEBUG ==========")
    print("Prediction:", prediction)
    print("Probability:", probability)
    print("Values:")
    print(shap_values.values)
    print("Shape:", shap_values.values.shape)
    print("================================\n")

    values = shap_values.values[0, :, 1]

    # ----------------------------------------
    # Convert SHAP values to Percentages
    # ----------------------------------------

    feature_importance = []

    total_importance = sum(abs(float(v)) for v in values)

    for feature, value in zip(features.columns, values):

        importance = abs(float(value))

        percentage = (
            round((importance / total_importance) * 100, 1)
            if total_importance > 0
            else 0
        )

        feature_importance.append(
            {
                "feature": feature,
                "impact": round(float(value), 4),
                "importance": percentage,
                "direction": (
                    "Increases Failure Risk"
                    if value > 0
                    else "Decreases Failure Risk"
                )
            }
        )

    feature_importance = sorted(
        feature_importance,
        key=lambda x: x["importance"],
        reverse=True
    )

    # ----------------------------------------
    # Prediction Text
    # ----------------------------------------

    prediction_text = (
        "Machine Healthy"
        if prediction == 0
        else "Machine Failure Predicted"
    )

    # ----------------------------------------
    # AI Summary
    # ----------------------------------------

    top_features = feature_importance[:3]

    summary = (
        f"The prediction is '{prediction_text}' with "
        f"{confidence}% confidence. "
        f"The most influential factors are "
        f"{top_features[0]['feature']}, "
        f"{top_features[1]['feature']}, and "
        f"{top_features[2]['feature']}."
    )

    # ----------------------------------------
    # Return Response
    # ----------------------------------------

    return {

        "prediction": prediction_text,

        "confidence": confidence,

        "summary": summary,

        "feature_importance": feature_importance

    }