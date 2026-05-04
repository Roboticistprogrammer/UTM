import { AlertTriangle } from "lucide-react"

export default function MapErrorFallback() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-gray-50">
      <div className="flex flex-col items-center max-w-md text-center">
        <AlertTriangle className="h-12 w-12 text-yellow-500 mb-4" />
        <h3 className="text-lg font-medium mb-2">Map Unavailable</h3>
        <p className="text-gray-600 mb-4">
          We're unable to load the drone map at this time. This could be due to network connectivity issues or missing
          dependencies.
        </p>
        <p className="text-sm text-gray-500">Please check your internet connection or try again later.</p>
      </div>
    </div>
  )
}

