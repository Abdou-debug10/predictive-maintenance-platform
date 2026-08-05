import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from xgboost import XGBClassifier

# Load dataset
df = pd.read_csv("data/raw/ai4i_predictive_maintenance.csv")

print("Original Shape:", df.shape)

# Remove Product ID
df = df.drop("Product ID", axis=1)

# Encode Type column
encoder = LabelEncoder()
df["Type"] = encoder.fit_transform(df["Type"])

# Rename columns for XGBoost
df = df.rename(columns={
    "Air temperature [K]": "air_temp",
    "Process temperature [K]": "process_temp",
    "Rotational speed [rpm]": "rotational_speed",
    "Torque [Nm]": "torque",
    "Tool wear [min]": "tool_wear",
    "Machine failure": "machine_failure"
})

# Features
X = df[
    [
        "Type",
        "air_temp",
        "process_temp",
        "rotational_speed",
        "torque",
        "tool_wear"
    ]
]

# Target
y = df["machine_failure"]

# Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("\nTraining Shape:", X_train.shape)
print("Testing Shape:", X_test.shape)

# Create XGBoost Model
model = XGBClassifier(
    n_estimators=100,
    max_depth=5,
    learning_rate=0.1,
    random_state=42,
    eval_metric="logloss"
)

# Train Model
model.fit(X_train, y_train)

# Save model
joblib.dump(model, "ml/saved_models/failure_prediction_model.pkl")

joblib.dump(
    encoder,
    "ml/saved_models/type_encoder.pkl"
)

print("\nModel saved successfully!")

# Predictions
y_pred = model.predict(X_test)

# Metrics
accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)

print("\n===== MODEL PERFORMANCE =====")
print(f"Accuracy  : {accuracy:.4f}")
print(f"Precision : {precision:.4f}")
print(f"Recall    : {recall:.4f}")
print(f"F1 Score  : {f1:.4f}")