# Fuel Cycle Simulator
An interactive visual tool built with React Flow and a python (Flask) backend to simulate fuel cycle components.

# Required Installations
Make sure the following are installed on your system:
- Node.js + npm
- Python 3.8+
- pip for Python package management

# Project Structure
fuel-cycle-sim/

├── package.json          # Frontend (React) dependencies

├── src/

│   ├── backend.py        # Python backend API

│   └── requirements.txt  # Backend dependencies

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
Start the React frontend at http://localhost:5173

Start the Flask backend at http://localhost:8000

If you are working on one side, you can also run the following commands for front end and back end respectively:
```
npm run dev
```
```
npm run start:backend
```

<!-- # React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Installation

Install Javascript is you don't have node.js
```bash
sudo apt install npm
```

Install [vite](https://vite.dev/) 
```bash
npm install -D vite
```

Install [xyflow react](https://github.com/xyflow/xyflow) 
```bash
npm install @xyflow/react
```

Install [Flask](https://flask.palletsprojects.com/en/stable/installation/) 
```bash
pip install flask
```

Install [Flask CORS](https://pypi.org/project/flask-cors/) 
```bash
pip install flask-cors
```

Install [concurrently](https://pypi.org/project/concurrently/) 
```bash
pip install concurrently
```

## Run application

Once in the  directory, 
```
npm run start:both
``` -->
