import pandas as pd

# Load dataset
df = pd.read_csv("data/raw/ai4i_predictive_maintenance.csv")

# Count target values
print("\nMachine Failure Distribution:")
print(df["Machine failure"].value_counts())

print("\nPercentage Distribution:")
print(df["Machine failure"].value_counts(normalize=True) * 100)