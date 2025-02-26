"use client"

import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Delete default icon prototype
delete L.Icon.Default.prototype._getIconUrl

// SVG string for a location marker icon
const markerSvgString = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin">
  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
  <circle cx="12" cy="10" r="3"></circle>
</svg>
`

const createSvgIcon = (svgString: string, color: string) => {
  return L.divIcon({
    html: svgString.replace("currentColor", color),
    className: "svg-icon",
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  })
}

const droneIcon = new L.Icon({
  iconUrl:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dji-m3m-web-9-tr-AzpRTzLoK6ljJsB5hNd6kX4NDX3IG8.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
})

const redMarkerIcon = createSvgIcon(markerSvgString, "#ef4444") // Red color

const simulatedDrones = [
  { id: 1, lat: 41.0082, lon: 28.9784, status: "In Transit", battery: 85 },
  { id: 2, lat: 41.02, lon: 28.99, status: "Delivering", battery: 72 },
  { id: 3, lat: 40.99, lon: 29.01, status: "Returning", battery: 45 },
  { id: 4, lat: 41.03, lon: 28.97, status: "Idle", battery: 98 },
  { id: 5, lat: 41.01, lon: 29.02, status: "In Transit", battery: 63 },
]

export const acmeLogisticsBranches = [
  { id: 1, name: "Taksim Branch", lat: 41.037, lon: 28.9851 },
  { id: 2, name: "Galata Branch", lat: 41.0256, lon: 28.9741 },
  { id: 3, name: "Sultanahmet Branch", lat: 41.0054, lon: 28.9768 },
  { id: 4, name: "Grand Bazaar Branch", lat: 41.0106, lon: 28.9681 },
  { id: 5, name: "Dolmabahçe Branch", lat: 41.0392, lon: 29.0007 },
  { id: 6, name: "Topkapi Branch", lat: 41.0115, lon: 28.9833 },
  { id: 7, name: "Hagia Sophia Branch", lat: 41.0086, lon: 28.9802 },
  { id: 8, name: "Cistern Branch", lat: 41.0084, lon: 28.9779 },
  { id: 9, name: "Süleymaniye Branch", lat: 41.016, lon: 28.9642 },
  { id: 10, name: "Spice Bazaar Branch", lat: 41.0165, lon: 28.9707 },
  { id: 11, name: "Beyazıt Branch", lat: 41.0126, lon: 28.965 },
  { id: 12, name: "Maiden's Tower Branch", lat: 41.0211, lon: 29.0041 },
  { id: 13, name: "Ortaköy Branch", lat: 41.0472, lon: 29.0264 },
  { id: 14, name: "Çamlıca Branch", lat: 41.0142, lon: 29.0661 },
  { id: 15, name: "Yıldız Branch", lat: 41.0518, lon: 29.0134 },
]

export default function Map() {
  const [drones, setDrones] = useState(simulatedDrones)

  useEffect(() => {
    const interval = setInterval(() => {
      setDrones((prevDrones) =>
        prevDrones.map((drone) => ({
          ...drone,
          lat: drone.lat + (Math.random() - 0.5) * 0.001,
          lon: drone.lon + (Math.random() - 0.5) * 0.001,
          battery: Math.max(drone.battery - Math.random() * 0.1, 20),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-full">
      <MapContainer
        center={[41.0082, 28.9784]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        maxZoom={18}
        minZoom={10}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={18}
          subdomains={["a", "b", "c"]}
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
                        drone.battery > 70 ? "bg-green-600" : drone.battery > 30 ? "bg-yellow-400" : "bg-red-600"
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
        {acmeLogisticsBranches.map((branch) => (
          <Marker key={branch.id} position={[branch.lat, branch.lon]} icon={redMarkerIcon}>
            <Popup>
              <div className="text-sm">
                <div className="font-bold mb-1">Acme Logistics Branch #{branch.id}</div>
                <div>{branch.name}</div>
                <div>Lat: {branch.lat.toFixed(4)}</div>
                <div>Lon: {branch.lon.toFixed(4)}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
;<style jsx global>{`
  .svg-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .svg-icon svg {
    width: 100%;
    height: 100%;
  }
`}</style>

