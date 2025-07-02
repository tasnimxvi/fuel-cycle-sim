from flask import Flask, request, jsonify, make_response
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)

# @app.route('/compute', methods=['POST', 'OPTIONS'])
# def compute():
#     if request.method == 'OPTIONS':
#         # CORS preflight handling
#         response = make_response()
#         response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
#         response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
#         response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
#         response.headers['Access-Control-Allow-Credentials'] = 'true'
#         return response, 200

#     # Actual POST request handling
#     data = request.json
#     node_id = data.get('id')
#     params = data.get('params', {})

#     if 'a' in params and 'b' in params:
#         try:
#             a = float(params['a'])
#             b = float(params['b'])
#             result = a + b
#         except ValueError:
#             result = 'Invalid input'
#     elif 'c' in params:
#         try:
#             c = float(params['c'])
#             result = c + 10
#         except ValueError:
#             result = 'Invalid input'
#     else:
#         result = 'No valid parameters'

#     response = jsonify({'id': node_id, 'output': result})
#     response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
#     response.headers['Access-Control-Allow-Credentials'] = 'true'
#     return response

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
