##Landing Page

npx create-next-app dronex-platform

When prompted, select these options:

- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- `src/` directory: No
- App Router: Yes
- Import alias: Yes (default @/*)

cd dronex-platform

npm install mapbox-gl framer-motion lucide-react

npm run dev

Open your browser and navigate to `http://localhost:3000`
You should see the login page



##Troubleshooting MAPBOX 

1**Get a Mapbox Access Token**:

- Sign up for a free account at [mapbox.com](https://www.mapbox.com/)
- Create a new access token in your account dashboard
- Replace the placeholder token in `components/drone-map.tsx` with your token:
mapboxModule.default.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

2**Environment Variables (Alternative Approach)**:

- Create a `.env.local` file in the project root:
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here

Update the code to use the environment variable:
mapboxModule.default.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';