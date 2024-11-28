from flask import Flask, render_template, request, jsonify
from joblib import load
import xgboost as xgb
import os

app = Flask(__name__)

# Load the model
current_dir = os.getcwd()

# Define the file path where your model is saved
file_path = os.path.join(current_dir, 'PCOS_Model.joblib')

# Load the model from the specified file path
loaded_model = load("C:\\Users\\shwet\\OneDrive\\Desktop\\PCOS\\PCOS_Model.joblib")

# Render the HTML template


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/pcos.html')
def pcos():
    return render_template('pcos.html')
# Endpoint to handle prediction


@app.route('/predict', methods=['POST'])
def predict():
    data = request.form.to_dict()
    features = [float(data[feature])
                for feature in data if feature != 'submit']

    # Predict PCOS (0 for negative, 1 for positive)
    prediction = loaded_model.predict([features])[0]

    return jsonify({'prediction': 'Positive' if prediction == 1 else 'Negative'})


if __name__ == '__main__':
    app.run(debug=False,host='0.0.0.0')
