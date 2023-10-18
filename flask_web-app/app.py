import joblib
from flask import Flask, render_template, request

app = Flask(__name__)

# Load your trained MLR model
mlr_model = joblib.load(r"C:\Users\abhis\OneDrive\Desktop\flask_web-app\profit.pkl")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    rd_spend = float(request.form['rd-spend'])
    admin_spend = float(request.form['admin-spend'])
    marketing_spend = float(request.form['marketing-spend'])
    state = request.form['state']

    # Perform the prediction using your MLR model
    prediction = mlr_model.predict([[rd_spend, admin_spend, marketing_spend]])

    # You can format the prediction as needed and return it as a response
    return f'Predicted Profit: ${prediction[0]:.2f}'

if __name__ == '__main':
    app.run(debug=True)
