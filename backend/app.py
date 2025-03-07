from flask import Flask, jsonify, make_response
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Simulated drone data
drones = [
    {
        "id": i,
        "lat": 41.0082 + random.uniform(-0.1, 0.1),
        "lon": 28.9784 + random.uniform(-0.1, 0.1),
        "status": "In Transit",
        "battery": random.randint(20, 100)
    }
    for i in range(1, 6)
]

@app.route('/')
def home():
    return jsonify({"message": "DroneX API is running"})

@app.route('/api/drones')
def get_drones():
    return jsonify(drones)

@app.route('/api/user')
def get_user():
    user = {
        "name": "John Doe",
        "company": "Acme Logistics",
        "email": "john.doe@acmelogistics.com",
        "recentOrders": [
            {"id": 1001, "status": "Delivered"},
            {"id": 1002, "status": "In Transit"},
            {"id": 1003, "status": "Processing"}
        ]
    }
    return jsonify(user)

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
