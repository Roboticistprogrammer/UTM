"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"

interface Drone {
  id: string
  latitude: number
  longitude: number
  altitude: number
  speed: number
  status: "active" | "idle" | "returning"
}

export default function SimpleDroneView() {
  const [drones, setDrones] = useState<Drone[]>([])

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

  useEffect(() => {
    // Fetch drone data initially and then every 5 seconds
    const fetchData = async () => {
      const data = await fetchDroneData()
      setDrones(data)
    }

    fetchData()
    const interval = setInterval(fetchData, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "returning":
        return "bg-yellow-500"
      case "idle":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {drones.map((drone) => (
        <div key={drone.id} className="border rounded-lg p-4 bg-white shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Drone {drone.id}</h3>
            <Badge className={getStatusColor(drone.status)}>{drone.status}</Badge>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm">
                <span className="text-gray-500">Latitude:</span>
                <span className="ml-2 font-mono">{drone.latitude.toFixed(4)}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Longitude:</span>
                <span className="ml-2 font-mono">{drone.longitude.toFixed(4)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm">
                <span className="text-gray-500">Altitude:</span>
                <span className="ml-2">{drone.altitude}m</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Speed:</span>
                <span className="ml-2">{drone.speed}km/h</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

