# DroneX Delivery Platform

DroneX is a web-based platform for managing drone deliveries. It features a real-time map display of drone locations, a user information panel, and an order planning system.

## Features

- Interactive map showing drone locations and status
- Real-time updates of drone positions and battery levels
- User information panel
- Order planning system

## Prerequisites (Use UV Package manager for installation)

- Node.js (v20.x or later)
- Python (v3.9)
- npm (usually comes with Node.js)
- UV (Python package manager)

### Frontend Setup

1. Navigate to the frontend directory:

npm run dev

The frontend will be available at http://localhost:3000

### Start the Backend Server

1. From the backend directory:
python app.py 
*UV will automatically create and activate virtual environment but make sure to check.

The backend server will start on http://localhost:5000

## Testing the API

You can test the backend API endpoints using a web browser or tools like curl:

1. Test the home endpoint: http://localhost:5000/
Expected response: `{"message": "DroneX API is running"}`

2. Test the drones endpoint: http://localhost:5000/api/drones

Returns a list of drones with their current status and location

3. Test the user endpoint:http://localhost:5000/api/user
Returns user information and recent orders

