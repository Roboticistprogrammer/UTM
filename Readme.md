# DroneX Delivery Platform

DroneX is a web-based platform for managing drone deliveries. It features a real-time map display of drone locations, a user information panel, an order planning system, and a login/authentication flow.

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

## Repository Structure

- `DroneX-Frontend/` — Main platform frontend (Next.js)
- `backend/` — Python backend (Flask)
- `dronex-platform/` — Landing page / login frontend (Next.js)
- `components/` — Shared login & map UI components
- `app/` — Login app pages
- `lib/` — Auth utilities
- `middleware.ts` — Route protection middleware

## Frontend Setup (Platform)

1. Navigate to the frontend directory:
```bash
cd DroneX-Frontend
```

2. Start the development server:
```bash
npm run dev
```

The frontend will be available at [http://localhost:3000](http://localhost:3000)

## Frontend Setup (Login / Landing Page)

1. Navigate to the dronex-platform directory:
```bash
cd dronex-platform
```

2. Install dependencies:
```bash
npm install mapbox-gl framer-motion lucide-react
npm install --save-dev @types/next
```

3. Start the development server:
```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000`. You should see the login page.

## Start the Backend Server

1. From the backend directory:
```bash
python app.py
```

*UV will automatically create and activate a virtual environment, but make sure to check.*

The backend server will start on [http://localhost:5000](http://localhost:5000)

## Testing the API

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

## Troubleshooting — Mapbox

1. **Get a Mapbox Access Token**:
   - Sign up for a free account at [mapbox.com](https://www.mapbox.com/)
   - Create a new access token in your account dashboard
   - Replace the placeholder token in `components/drone-map.tsx` with your token:
     ```
     mapboxModule.default.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
     ```

2. **Environment Variables (Alternative Approach)**:
   - Create a `.env.local` file in the project root:
     ```
     NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
     ```
   - Update the code to use the environment variable:
     ```
     mapboxModule.default.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';
     ```

## Notes

- While hovering mouse on a drone, serviceable area should be mapped on color.
