# DroneX Delivery Platform

DroneX is a web-based platform for managing drone deliveries. It features a real-time map display of drone locations, a user information panel, and an order planning system.

## Features

- Interactive map showing drone locations and status
- Real-time updates of drone positions and battery levels
- User information panel
- Order planning system

## Prerequisites

- Node.js (v20.x or later)
- Python (v3.9 or later)
- npm (usually comes with Node.js)
- pip (Python package manager)

## Installation

### Backend Setup

1. Navigate to the backend directory: 
cd backend
source venv/bin/activate 
pip install -r requirements.txt (if encounter error, use python 3.10)


### Frontend Setup

1. Navigate to the frontend directory:
cd DroneX-Frontend
npm install


## Running the Application

### Start the Backend Server

1. From the backend directory with activated virtual environment:
python app.py

The backend server will start on http://localhost:5000

### Start the Frontend Development Server

1. From the DroneX-Frontend directory:
npm run dev

The frontend will be available at http://localhost:3000

## Testing the API

You can test the backend API endpoints using a web browser or tools like curl:

1. Test the home endpoint: http://localhost:5000/
Expected response: `{"message": "DroneX API is running"}`

2. Test the drones endpoint: http://localhost:5000/api/drones

Returns a list of drones with their current status and location

3. Test the user endpoint:http://localhost:5000/api/user
Returns user information and recent orders

## Project Structure
