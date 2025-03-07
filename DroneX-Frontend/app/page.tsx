'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Sidebar } from './components/Sidebar'
import { Button } from "./components/ui/button"
import { Menu } from 'lucide-react'

// Dynamically import the Map component with no SSR
const Map = dynamic(() => import('./components/Map'), { ssr: false })

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground px-4 py-3 flex items-center">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="mr-4 text-primary-foreground hover:bg-primary/90"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">DroneX Delivery Platform</h1>
      </header>
      <main className="flex-grow flex relative">
        {isSidebarOpen && <Sidebar />}
        <div className="flex-grow">
          <Map />
        </div>
      </main>
    </div>
  )
}


