# import pandas as pd
# import numpy as np
# import tensorflow as tf
# from tensorflow.keras.models import load_model
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from sklearn.preprocessing import LabelEncoder, StandardScaler
# from sklearn.impute import SimpleImputer
#
# # Initialize Flask app
# app = Flask(__name__)
# CORS(app)
#
#
# model = load_model(r"D:\SEM3\NeuralNetwork\Group project\new_model")
#
# # Load the dataset to prepare encoding for categorical features
# df = pd.read_csv(r"D:\SEM3\NeuralNetwork\Group project\Student data.csv", skiprows=23, header=0)
# df.columns = ['First Term Gpa', 'Second Term Gpa', 'First Language', 'Funding', 'School', 'FastTrack', 'Coop',
#               'Residency', 'Gender', 'Previous Education', 'Age Group', 'High School Average Mark', 'Math Score',
#               'English Grade', 'First Year Persistence']
#
# # Preprocessing - Replace '?' with NaN for better handling
# df.replace('?', np.nan, inplace=True)
#
# # Handle missing values - Apply SimpleImputer to fill missing values
# imputer = SimpleImputer(strategy='mean')
# numerical_columns = ['Funding', 'School', 'FastTrack', 'Coop', 'Residency', 'Gender', 'High School Average Mark', 'Math Score', 'English Grade']
# df[numerical_columns] = imputer.fit_transform(df[numerical_columns])
#
# # Label Encoding for categorical features
# label_encoders = {
#     'First Language': LabelEncoder(),
#     'Previous Education': LabelEncoder(),
#     'Age Group': LabelEncoder()
# }
# for column, le in label_encoders.items():
#     df[column] = le.fit_transform(df[column])
#
# # StandardScaler for numerical features
# scaler = StandardScaler()
# scaler.fit(df[numerical_columns])  # Fit scaler with the numerical columns
#
# @app.route('/')
# def home():
#     return "Flask app with TensorFlow/Keras model integrated!"
#
# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         # Get JSON data from the request
#         data = request.get_json()
#         print("Received Data from Frontend:", data)
#
#         # Validate feature count
#         if 'features' not in data or len(data['features']) != 14:
#             raise ValueError("Incorrect number of features. Expected 14.")
#
#         # Extract features and preprocess
#         features = np.array(data['features']).reshape(1, -1)  # Ensure it's a 2D array
#         print("Features Shape:", features.shape)
#
#
#
#         # Make a prediction with the model
#         probabilty = model.predict(features)
#         prediction=(probabilty > 0.5).astype(int)
#         print("Prediction:", prediction)
#
#         # Return the prediction as a JSON response
#         return jsonify({"prediction": prediction.tolist()})
#
#
#     except Exception as e:
#         print("Error:", e)
#         return jsonify({"error": str(e)}), 400
#
# if __name__ == '__main__':
#     app.run(debug=True)
import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.impute import SimpleImputer

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load pre-trained Keras model
def load_trained_model(model_path):
    """
    Load a pre-trained Keras model from the given file path.

    Parameters:
        model_path (str): Path to the Keras model file (.h5).

    Returns:
        model: Loaded Keras model.
    """
    return load_model(model_path)

# Load dataset and preprocess

def load_and_preprocess_dataset(dataset_path):
    """
    Load and preprocess the dataset, handling missing values, encoding categorical features,
    and scaling numerical features.

    Parameters:
        dataset_path (str): Path to the CSV dataset file.

    Returns:
        DataFrame: Preprocessed dataset.
        dict: Fitted LabelEncoders for categorical features.
        StandardScaler: Fitted StandardScaler for numerical features.
    """
    df = pd.read_csv(dataset_path, skiprows=23, header=0)
    df.columns = [
        'First Term Gpa', 'Second Term Gpa', 'First Language', 'Funding', 'School', 'FastTrack',
        'Coop', 'Residency', 'Gender', 'Previous Education', 'Age Group', 'High School Average Mark',
        'Math Score', 'English Grade', 'First Year Persistence'
    ]

    # Replace '?' with NaN for better handling
    df.replace('?', np.nan, inplace=True)

    # Handle missing values
    imputer = SimpleImputer(strategy='mean')
    numerical_columns = ['Funding', 'School', 'FastTrack', 'Coop', 'Residency', 'Gender',
                          'High School Average Mark', 'Math Score', 'English Grade']
    df[numerical_columns] = imputer.fit_transform(df[numerical_columns])

    # Label Encoding for categorical features
    label_encoders = {
        'First Language': LabelEncoder(),
        'Previous Education': LabelEncoder(),
        'Age Group': LabelEncoder()
    }
    for column, le in label_encoders.items():
        df[column] = le.fit_transform(df[column])

    # StandardScaler for numerical features
    scaler = StandardScaler()
    scaler.fit(df[numerical_columns])

    return df, label_encoders, scaler

# Global variables
MODEL_PATH = r"D:\SEM3\NeuralNetwork\Group project\new_model"
DATASET_PATH = r"D:\SEM3\NeuralNetwork\Group project\Student data.csv"
model = load_trained_model(MODEL_PATH)
dataset, label_encoders, scaler = load_and_preprocess_dataset(DATASET_PATH)

@app.route('/')
def home():
    """
    Home route to verify Flask app is running.

    Returns:
        str: Welcome message.
    """
    return "Flask app with TensorFlow/Keras model integrated!"

@app.route('/predict', methods=['POST'])
def predict():
    """
    API endpoint to predict first-year persistence based on student data.

    Expects:
        JSON request with key 'features' containing a list of 14 feature values.

    Returns:
        JSON: Prediction result or error message.
    """
    try:
        # Get JSON data from the request
        data = request.get_json()
        print("Received Data from Frontend:", data)

        # Validate feature count
        if 'features' not in data or len(data['features']) != 14:
            raise ValueError("Incorrect number of features. Expected 14.")

        # Extract features and preprocess
        features = np.array(data['features']).reshape(1, -1)  # Ensure it's a 2D array
        print("Features Shape:", features.shape)

        # Standardize numerical features
        numerical_features = features[:, 3:12]
        numerical_features = scaler.transform(numerical_features)
        features[:, 3:12] = numerical_features
        print("Standardized Features:", features)

        # Make a prediction with the model
        probability = model.predict(features)
        prediction = (probability > 0.5).astype(int)
        print("Prediction:", prediction)

        # Return the prediction as a JSON response
        return jsonify({"prediction": prediction.tolist()})

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)

