'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { fetchDrones } from '../services/api';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
});

// Your existing drone icon setup...
const droneIcon = new L.Icon({
  iconUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dji-m3m-web-9-tr-AzpRTzLoK6ljJsB5hNd6kX4NDX3IG8.png',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

function Map() {
  const [drones, setDrones] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDrones = async () => {
      try {
        const data = await fetchDrones();
        setDrones(data);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch drones:', err);
      }
    };

    loadDrones();
    const interval = setInterval(loadDrones, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={[41.0082, 28.9784]}
        zoom={13}
        style={{ height: '100%', width: '100%', position: 'absolute' }}
        maxZoom={18}
        minZoom={10}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {drones.map((drone) => (
          <Marker key={drone.id} position={[drone.lat, drone.lon]} icon={droneIcon}>
            <Popup>
              <div className="text-sm">
                <div className="font-bold mb-1">Drone #{drone.id}</div>
                <div>Status: {drone.status}</div>
                <div className="flex items-center gap-2">
                  Battery: 
                  <div className="w-20 bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        drone.battery > 70 ? 'bg-green-600' :
                        drone.battery > 30 ? 'bg-yellow-400' : 'bg-red-600'
                      }`}
                      style={{ width: `${drone.battery}%` }}
                    ></div>
                  </div>
                  {Math.round(drone.battery)}%
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map; 