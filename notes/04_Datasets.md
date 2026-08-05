AI4I dataset downloaded
Stored in data/raw/



## AI4I Dataset Exploration Results

Dataset Statistics

* Total Rows: 10,000
* Total Columns: 14
* Missing Values: 0
* Memory Usage: 1.1 MB

Observations

1. Dataset is clean.
2. No missing values present.
3. Suitable for machine learning without major cleaning.
4. Contains machine operational parameters and failure information.

Benefits

* Faster preprocessing.
* Easier model training.
* Better for learning predictive maintenance workflows.

Conclusion

The dataset is ready for feature analysis and model preparation.



## Feature Selection

Target Variable:

Machine failure

Meaning:

0 = Healthy Machine

1 = Machine Failure

---

Input Features:

* Type
* Air temperature [K]
* Process temperature [K]
* Rotational speed [rpm]
* Torque [Nm]
* Tool wear [min]

---

Dropped Column:

Product ID

Reason:

Acts only as an identifier and provides no predictive value.

---

Failure Categories Available:

* TWF (Tool Wear Failure)
* HDF (Heat Dissipation Failure)
* PWF (Power Failure)
* OSF (Overstrain Failure)
* RNF (Random Failure)

These columns describe failure causes and may be used in advanced models later.
