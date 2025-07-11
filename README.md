# Fuel Cycle Simulator
An interactive visual tool built with React Flow and a python (Flask) backend to simulate fuel cycle components.

# Required Installations
Make sure the following are installed on your system:
- Node.js + npm
- Python 3.8+
- pip for Python package management

# Project Structure
```bash
fuel-cycle-sim/

├── package.json          # Frontend (React) dependencies

├── requirements.txt      # Backend dependencies

├── src/

│   ├── backend.py        # Python backend API

```

# Installation and Setup
Once in the directory, install frontend and backend dependencies:

Front end
```bash
npm install
```
Back end

Recommend setting up a virtual environment. Proceed as follows:
```bash
cd src
python -m venv venv
source venv/bin/activate        # macOS/Linux
venv\Scripts\activate           # Windows

pip install -r requirements.txt
```
# Running Application
You can run both frontend and backend at once
```
npm run start:both
```
This will:
- Start the React frontend at http://localhost:5173
- Start the Flask backend at http://localhost:8000

If you are working on one side, you can also run the following commands for front end and back end respectively:
```
npm run dev
```
```
npm run start:backend
```

