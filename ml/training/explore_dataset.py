import pandas as pd

# Load dataset
df = pd.read_csv("data/raw/ai4i_predictive_maintenance.csv")

print("\nFirst 5 Rows:")
print(df.head())

print("\nDataset Shape:")
print(df.shape)

print("\nColumns:")
print(df.columns)

print("\nMissing Values:")
print(df.isnull().sum())

print("\nDataset Info:")
print(df.info())

print("\nColumn Names:")
for col in df.columns:
    print(col)