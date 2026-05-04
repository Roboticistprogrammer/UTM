import DashboardHeader from "@/components/dashboard-header"
import DroneStatusPanel from "@/components/drone-status-panel"
import NoSSR from "@/components/no-ssr"
import dynamic from "next/dynamic"

// Dynamically import the DroneMap component with no SSR
const DroneMap = dynamic(() => import("@/components/drone-map"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
})

export default function Dashboard() {
  // Note: In a real Next.js app, you'd use middleware for auth protection
  // This is a simplified example

  return (
    <div className="flex h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col">
          <div className="p-4 bg-white border-b">
            <h1 className="text-2xl font-bold">Drone Operations Dashboard</h1>
            <p className="text-gray-500">Real-time monitoring of your drone fleet</p>
          </div>
          <NoSSR>
            <DroneMap />
          </NoSSR>
        </div>
        <DroneStatusPanel />
      </div>
    </div>
  )
}

