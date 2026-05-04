"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DroneXLogo } from "@/components/dronex-logo"
import { LogOut, User } from "lucide-react"
import { logout } from "@/lib/auth"

export default function DashboardHeader() {
  const router = useRouter()
  const [user, setUser] = useState<{
    name: string
    company: string
  } | null>(null)

  useEffect(() => {
    // Try to get user from localStorage or sessionStorage
    const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      // If no user found, redirect to login
      router.push("/")
    }
  }, [router])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!user) return null

  return (
    <header className="border-b bg-white px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <DroneXLogo className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-xl font-bold">DroneX Platform</h1>
            <p className="text-sm text-gray-500">{user.company}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>{user.name}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="flex items-center space-x-2 text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

