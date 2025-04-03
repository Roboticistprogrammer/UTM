"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, RefreshCw } from "lucide-react"

interface Drone {
  id: string
  status: "active" | "idle" | "returning"
  battery: number
  lastUpdated: string
  mission: string
  payload: string
}

export default function DroneStatusPanel() {
  const [drones, setDrones] = useState<Drone[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  // Mock function to fetch drone status data
  const fetchDroneStatus = async () => {
    // In a real application, this would be an API call
    // This is mock data for demonstration
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockDrones: Drone[] = [
      {
        id: "drone-1",
        status: "active",
        battery: 78,
        lastUpdated: new Date().toISOString(),
        mission: "Package delivery to Downtown",
        payload: "Package #A12345",
      },
      {
        id: "drone-2",
        status: "active",
        battery: 65,
        lastUpdated: new Date().toISOString(),
        mission: "Surveillance of Port Area",
        payload: "Camera Equipment",
      },
      {
        id: "drone-3",
        status: "returning",
        battery: 22,
        lastUpdated: new Date().toISOString(),
        mission: "Return to Base",
        payload: "Empty",
      },
      {
        id: "drone-4",
        status: "idle",
        battery: 100,
        lastUpdated: new Date().toISOString(),
        mission: "None",
        payload: "None",
      },
    ]

    return mockDrones
  }

  const refreshData = async () => {
    setRefreshing(true)
    const data = await fetchDroneStatus()
    setDrones(data)
    setRefreshing(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const data = await fetchDroneStatus()
      setDrones(data)
      setLoading(false)
    }

    fetchData()
    const interval = setInterval(fetchData, 30000) // Refresh every 30 seconds

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

  const getBatteryColor = (level: number) => {
    if (level > 50) return "text-green-500"
    if (level > 20) return "text-yellow-500"
    return "text-red-500"
  }

  const formatTime = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleTimeString()
  }

  return (
    <div className="w-80 border-l bg-white p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Drone Status</h2>
        <Button variant="outline" size="sm" onClick={refreshData} disabled={loading || refreshing}>
          {refreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-4">
          {drones.map((drone) => (
            <div key={drone.id} className="rounded-lg border p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Drone {drone.id}</h3>
                <Badge className={getStatusColor(drone.status)}>{drone.status}</Badge>
              </div>

              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Battery:</span>
                  <span className={getBatteryColor(drone.battery)}>{drone.battery}%</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Last Updated:</span>
                  <span>{formatTime(drone.lastUpdated)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Mission:</span>
                  <span className="text-right">{drone.mission}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Payload:</span>
                  <span>{drone.payload}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

