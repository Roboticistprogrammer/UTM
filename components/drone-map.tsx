"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2 } from "lucide-react"
import SimpleDroneView from "./simple-drone-view"

// Define the interface for a drone
interface Drone {
  id: string
  latitude: number
  longitude: number
  altitude: number
  speed: number
  status: "active" | "idle" | "returning"
}

export default function DroneMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [mapboxgl, setMapboxgl] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [drones, setDrones] = useState<Drone[]>([])
  const [markers, setMarkers] = useState<{ [key: string]: any }>({})
  const [mapError, setMapError] = useState(false)
  const [mapboxLoaded, setMapboxLoaded] = useState(false)

  // Mock function to fetch drone data
  const fetchDroneData = async () => {
    // In a real application, this would be an API call
    // This is mock data for demonstration
    const mockDrones: Drone[] = [
      {
        id: "drone-1",
        latitude: 40.7128,
        longitude: -74.006,
        altitude: 120,
        speed: 35,
        status: "active",
      },
      {
        id: "drone-2",
        latitude: 40.7228,
        longitude: -74.016,
        altitude: 150,
        speed: 42,
        status: "active",
      },
      {
        id: "drone-3",
        latitude: 40.7028,
        longitude: -73.996,
        altitude: 100,
        speed: 28,
        status: "returning",
      },
      {
        id: "drone-4",
        latitude: 40.7328,
        longitude: -74.026,
        altitude: 90,
        speed: 0,
        status: "idle",
      },
    ]

    return mockDrones
  }

  // Dynamically import mapbox-gl
  useEffect(() => {
    async function loadMapbox() {
      try {
        // Dynamically import mapbox-gl
        const mapboxModule = await import("mapbox-gl")
        // Also import the CSS
        await import("mapbox-gl/dist/mapbox-gl.css")

        setMapboxgl(mapboxModule.default)
        setMapboxLoaded(true)

        // Set the access token
        mapboxModule.default.accessToken =
          "pk.eyJ1IjoiZHJvbmV4LWRlbW8iLCJhIjoiY2xnNXZ6MHFrMDh1aDNkcGZudWVzOWdvdCJ9.hzHCjMWtGnRmj7Y_emmn3A"
      } catch (error) {
        console.error("Failed to load Mapbox GL:", error)
        setMapError(true)
        setLoading(false)
      }
    }

    loadMapbox()
  }, [])

  // Initialize map once mapboxgl is loaded
  useEffect(() => {
    if (!mapboxgl || !mapContainer.current || !mapboxLoaded) return

    try {
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-74.006, 40.7128], // New York City
        zoom: 12,
      })

      newMap.on("load", () => {
        setLoading(false)
        setMap(newMap)
      })

      newMap.on("error", (e: any) => {
        console.error("Mapbox error:", e)
        setMapError(true)
        setLoading(false)
      })

      // Cleanup on unmount
      return () => {
        newMap.remove()
      }
    } catch (error) {
      console.error("Failed to initialize map:", error)
      setMapError(true)
      setLoading(false)
    }
  }, [mapboxgl, mapboxLoaded])

  // Fetch drone data
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDroneData()
      setDrones(data)
    }

    fetchData()
    const interval = setInterval(fetchData, 5000)

    return () => clearInterval(interval)
  }, [])

  // Update markers when drones or map changes
  useEffect(() => {
    if (!map || !mapboxgl || loading || mapError || !mapboxLoaded) return

    // Create a copy of the current markers
    const currentMarkers = { ...markers }

    // Update or create markers for each drone
    drones.forEach((drone) => {
      if (currentMarkers[drone.id]) {
        // Update existing marker position
        currentMarkers[drone.id].setLngLat([drone.longitude, drone.latitude])
      } else {
        // Create marker element
        const el = document.createElement("div")
        el.className = "drone-marker"
        el.style.width = "20px"
        el.style.height = "20px"
        el.style.borderRadius = "50%"

        // Color based on status
        if (drone.status === "active") {
          el.style.backgroundColor = "#10b981" // Green
        } else if (drone.status === "returning") {
          el.style.backgroundColor = "#f59e0b" // Yellow
        } else {
          el.style.backgroundColor = "#6b7280" // Gray
        }

        el.style.border = "2px solid white"
        el.style.boxShadow = "0 0 0 2px rgba(0, 0, 0, 0.1)"

        // Create new marker
        currentMarkers[drone.id] = new mapboxgl.Marker(el)
          .setLngLat([drone.longitude, drone.latitude])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<h3>Drone ${drone.id}</h3>
               <p>Altitude: ${drone.altitude}m</p>
               <p>Speed: ${drone.speed}km/h</p>
               <p>Status: ${drone.status}</p>`,
            ),
          )
          .addTo(map)
      }
    })

    // Remove markers for drones that no longer exist
    Object.keys(currentMarkers).forEach((id) => {
      if (!drones.find((drone) => drone.id === id)) {
        currentMarkers[id].remove()
        delete currentMarkers[id]
      }
    })

    // Update the markers state
    setMarkers(currentMarkers)
  }, [drones, map, mapboxgl, loading, mapError, markers, mapboxLoaded])

  // If there's an error loading the map, show the fallback UI
  if (mapError) {
    return (
      <div className="h-full overflow-auto">
        <div className="p-4 bg-gray-100 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Drone Fleet Status</h3>
              <p className="text-sm text-gray-500">
                Map view is currently unavailable. Showing drone information in list view.
              </p>
            </div>
          </div>
        </div>
        <SimpleDroneView />
      </div>
    )
  }

  return (
    <div className="relative flex-1">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
          <div className="flex flex-col items-center space-y-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm font-medium">Loading map...</p>
          </div>
        </div>
      )}

      <div ref={mapContainer} className="h-full w-full" />
    </div>
  )
}

