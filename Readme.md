# Use the following command to clone this repo:
```bash
git clone --branch platform --single-branch https://github.com/Roboticistprogrammer/UTM.git
```

# DroneX Delivery Platform

DroneX is a web-based platform for managing drone deliveries. It features a real-time map display of drone locations, a user information panel, and an order planning system.

## Features

- Interactive map showing drone locations and status
- Real-time updates of drone positions and battery levels
- User information panel 
- Order planning system *
- Login/logout *

## Prerequisites (Use UV Package manager for installation)

- Node.js (v20.x or later)
- Python (v3.9)
- npm (usually comes with Node.js)
- UV (Python package manager)

*It is advised to have a look at UV documentation for better understanding.

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd ~/../Dronex-Frontend
```

2. Start the development server:
```bash
npm run dev
```

The frontend will be available at [http://localhost:3000](http://localhost:3000)

### Start the Backend Server

1. From the backend directory:
```bash
python app.py
```

*UV will automatically create and activate a virtual environment, but make sure to check.*

The backend server will start on [http://localhost:5000](http://localhost:5000)

## Testing the API

You can test the backend API endpoints using a web browser or tools like curl:

1. Test the home endpoint:
```bash
curl http://localhost:5000/
```
Expected response:
```json
{"message": "DroneX API is running"}
```

2. Test the drones endpoint:
```bash
curl http://localhost:5000/api/drones
```
Returns a list of drones with their current status and location.

3. Test the user endpoint:
```bash
curl http://localhost:5000/api/user
```
Returns user information and recent orders.

##Features 

-While hovering mouse on a drone, servicable area should be mapped on color.