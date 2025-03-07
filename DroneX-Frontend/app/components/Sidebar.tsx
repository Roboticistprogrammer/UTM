'use client'

import { useState } from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"
import { Package, User } from 'lucide-react'
import UserInfo from './UserInfo'

export function Sidebar() {
  const [orderDetails, setOrderDetails] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    packageWeight: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setOrderDetails(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Order submitted:', orderDetails)
  }

  return (
    <div className="w-64 bg-background border-r h-full">
      <Accordion type="single" collapsible>
        <AccordionItem value="plan-order">
          <AccordionTrigger className="px-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              <span>Plan Order</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-4 py-2">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pickupLocation">Pickup Location</Label>
                  <Input
                    id="pickupLocation"
                    name="pickupLocation"
                    value={orderDetails.pickupLocation}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dropoffLocation">Dropoff Location</Label>
                  <Input
                    id="dropoffLocation"
                    name="dropoffLocation"
                    value={orderDetails.dropoffLocation}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="packageWeight">Package Weight (kg)</Label>
                  <Input
                    id="packageWeight"
                    name="packageWeight"
                    type="number"
                    value={orderDetails.packageWeight}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Submit Order</Button>
              </form>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="user-info">
          <AccordionTrigger className="px-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span>User Info</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-4 py-2">
              <UserInfo />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default Sidebar


