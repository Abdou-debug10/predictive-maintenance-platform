## Target Balance Analysis Results

Machine Failure Distribution

No Failure (0): 9661 samples (96.61%)

Failure (1): 339 samples (3.39%)

Observation

The dataset is highly imbalanced.

Most machines are healthy while only a small percentage experience failures.

Risk

A machine learning model may learn to predict only the majority class (No Failure).

Example:

Predicting "No Failure" for every record would achieve 96.61% accuracy while failing to identify actual failures.

Implication

Accuracy alone is not a reliable metric for this project.

Important evaluation metrics:

* Precision
* Recall
* F1 Score

Future Solution

Class balancing techniques such as:

* Class weights
* SMOTE
* Oversampling

may be applied if required.


Data Preprocessing

Purpose:
Convert raw dataset into a format suitable for machine learning.

Steps:

1. Remove unnecessary columns.
2. Convert categorical values into numbers.
3. Create Features (X).
4. Create Target (y).
5. Split dataset into training and testing sets.

Why?

Machine learning models cannot directly understand text values and require properly prepared numerical input data.


Preprocessing Results

Original Dataset:
10000 rows × 14 columns

After Feature Selection:
6 input features selected

Training Set:
8000 records

Testing Set:
2000 records

Selected Features:

1. Type
2. Air temperature [K]
3. Process temperature [K]
4. Rotational speed [rpm]
5. Torque [Nm]
6. Tool wear [min]

Target Variable:

Machine failure

Benefits:

- Product ID removed
- Categorical values encoded
- Dataset split into train and test sets
- Ready for model training



## Why XGBoost?

XGBoost was selected because the predictive maintenance dataset is structured tabular data containing sensor measurements such as temperature, torque, rotational speed, and tool wear.

Reasons:

1. Excellent performance on tabular datasets.
2. Captures complex non-linear relationships between machine parameters and failures.
3. Handles imbalanced datasets effectively using class weighting.
4. Provides fast training and inference.
5. Widely used in industrial predictive maintenance applications.
6. Generally outperforms Logistic Regression, Decision Trees, and Random Forests on structured industrial datasets.

Alternatives Considered:

* Logistic Regression: Too simplistic for complex relationships.
* Decision Tree: Prone to overfitting.
* Random Forest: Good performance but often slightly weaker than XGBoost.
* SVM: Less suitable for larger datasets and real-time deployment.

Conclusion:

XGBoost provides the best balance of accuracy, speed, scalability, and industry relevance for this project.




## XGBoost Failure Prediction Results

Model:
XGBoost Classifier

Dataset:
AI4I 2020 Predictive Maintenance Dataset

Results:

Accuracy: 98.75%

Precision: 89.09%

Recall: 72.06%

F1 Score: 79.67%

Interpretation:

The model achieved high predictive performance on machine failure detection.

Precision indicates that most predicted failures are genuine failures.

Recall indicates that approximately 72% of actual machine failures were detected.

Because the dataset is highly imbalanced, F1 Score provides a more reliable evaluation than accuracy.

Conclusion:

The baseline XGBoost model successfully predicts machine failures and serves as the foundation for the predictive maintenance platform.


Model Persistence

Purpose:
Store trained machine learning models for future use.

Tool:
joblib

File Generated:
failure_prediction_model.pkl

Benefits:

1. Train once, use many times.
2. Faster predictions.
3. Required for deployment.
4. Used by FastAPI APIs.
5. Used by React Dashboard.
6. Used by Kafka streaming predictions.

Workflow:

Dataset
   ↓
Train Model
   ↓
Save Model (.pkl)
   ↓
Load Model
   ↓
Predict



## Complete ML Workflow Implemented

### Step 1: Dataset Loading

File:
ml/training/explore_dataset.py

Actions:

* Loaded AI4I dataset using pandas.
* Checked first 5 rows.
* Checked dataset shape.
* Checked column names.
* Checked missing values.
* Reviewed data types.

Result:

Dataset contained 10,000 records and 14 columns with no missing values.

---

### Step 2: Target Balance Analysis

File:
ml/training/check_target_balance.py

Actions:

* Analyzed Machine failure distribution.
* Calculated percentage of healthy and failed machines.

Result:

Healthy Machines: 96.61%

Failed Machines: 3.39%

Conclusion:

Dataset is highly imbalanced.

---

### Step 3: Data Preprocessing

File:
ml/training/prepare_data.py

Actions:

* Removed Product ID column.
* Encoded Type column using LabelEncoder.
* Selected 6 predictive features.
* Created feature matrix (X).
* Created target vector (y).
* Performed train-test split (80-20).

Result:

Training Set: 8000 samples

Testing Set: 2000 samples

---

### Step 4: Feature Engineering

Type Encoding:

L → 0

M → 1

H → 2

Selected Features:

* Type
* Air Temperature
* Process Temperature
* Rotational Speed
* Torque
* Tool Wear

Target:

Machine Failure

---

### Step 5: Model Training

File:
ml/training/train_failure_model.py

Algorithm:

XGBoost Classifier

Hyperparameters:

* n_estimators = 100
* max_depth = 5
* learning_rate = 0.1
* random_state = 42

---

### Step 6: Model Evaluation

Metrics Used:

* Accuracy
* Precision
* Recall
* F1 Score

Results:

Accuracy: 98.75%

Precision: 89.09%

Recall: 72.06%

F1 Score: 79.67%

---

### Step 7: Model Persistence

Tool:

joblib

Generated File:

ml/saved_models/failure_prediction_model.pkl

Purpose:

Store trained model for future prediction without retraining.



Prediction Pipeline

File:
ml/predict.py

Purpose:

Load the saved XGBoost model and predict machine health using new sensor readings.

Workflow:

Saved Model
      ↓
New Sensor Data
      ↓
Prediction
      ↓
Healthy / Failure

Benefits:

1. No retraining required.
2. Fast inference.
3. Can be used by FastAPI APIs.
4. Can be integrated with Kafka streams.
5. Can power dashboard predictions.



Inference Pipeline

File:
ml/predict.py

Purpose:

Perform predictions using the saved XGBoost model.

Process:

1. Load trained model.
2. Create new machine sensor record.
3. Pass record to model.
4. Receive prediction.
5. Display machine health status.

Output:

0 = Healthy Machine

1 = Machine Failure Predicted

Result:

Successfully performed real-time prediction using a saved model without retraining.