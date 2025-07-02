from flask import Flask, request, jsonify, make_response
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.route('/compute', methods=['POST'])
def compute():
    data = request.json
    node_id = data.get('id')
    params = data.get('params', {})
    incoming_outputs = data.get('incomingOutputs', [])

    # Convert parameters to floats
    values = []
    for val in params.values():
        try:
            values.append(float(val))
        except ValueError:
            return jsonify({'id': node_id, 'output': 'Invalid input'})

    # Add outputs from incoming nodes
    for val in incoming_outputs:
        try:
            values.append(float(val))
        except ValueError:
            continue  

    total = sum(values)

    return jsonify({'id': node_id, 'output': total})

if __name__ == '__main__':
    app.run(port=8000, debug=True)
