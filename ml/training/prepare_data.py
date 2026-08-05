import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

# Load dataset
df = pd.read_csv("data/raw/ai4i_predictive_maintenance.csv")

print("Original Shape:", df.shape)

# Remove Product ID
df = df.drop("Product ID", axis=1)

# Convert Type (L, M, H) into numbers
encoder = LabelEncoder()
df["Type"] = encoder.fit_transform(df["Type"])

# Features
X = df[
    [
        "Type",
        "Air temperature [K]",
        "Process temperature [K]",
        "Rotational speed [rpm]",
        "Torque [Nm]",
        "Tool wear [min]"
    ]
]

# Target
y = df["Machine failure"]

# Train Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("\nX_train Shape:", X_train.shape)
print("X_test Shape:", X_test.shape)
print("y_train Shape:", y_train.shape)
print("y_test Shape:", y_test.shape)