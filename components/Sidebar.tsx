"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { Package, User, Truck, BarChart, Settings, HelpCircle } from "lucide-react"
import UserInfo from "./UserInfo"
import { acmeLogisticsBranches } from "./Map"

export function Sidebar() {
  const [orderDetails, setOrderDetails] = useState({
    pickupLocation: "",
    dropoffLocation: "",
    packageWeight: "",
  })
  const [filteredPickupPoints, setFilteredPickupPoints] = useState(acmeLogisticsBranches)
  const [filteredDropoffPoints, setFilteredDropoffPoints] = useState(acmeLogisticsBranches)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setOrderDetails((prev) => ({ ...prev, [name]: value }))

    if (name === "pickupLocation") {
      setFilteredPickupPoints(
        acmeLogisticsBranches.filter((branch) => branch.name.toLowerCase().includes(value.toLowerCase())),
      )
    } else if (name === "dropoffLocation") {
      setFilteredDropoffPoints(
        acmeLogisticsBranches.filter((branch) => branch.name.toLowerCase().includes(value.toLowerCase())),
      )
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Order submitted:", orderDetails)
  }

  const handleBranchSelect = (branchName: string, fieldName: "pickupLocation" | "dropoffLocation") => {
    setOrderDetails((prev) => ({ ...prev, [fieldName]: branchName }))
    if (fieldName === "pickupLocation") {
      setFilteredPickupPoints(acmeLogisticsBranches)
    } else {
      setFilteredDropoffPoints(acmeLogisticsBranches)
    }
  }

  return (
    <div className="w-64 bg-background border-r h-full overflow-y-auto">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">DroneX Dashboard</h2>
      </div>
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="plan-order">
          <AccordionTrigger className="px-4 py-2 hover:bg-muted/50">
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
                  <ul className="mt-2 max-h-32 overflow-y-auto bg-muted rounded-md">
                    {filteredPickupPoints.map((branch) => (
                      <li
                        key={branch.id}
                        className="px-2 py-1 hover:bg-muted/50 cursor-pointer"
                        onClick={() => handleBranchSelect(branch.name, "pickupLocation")}
                      >
                        {branch.id}. {branch.name}
                      </li>
                    ))}
                  </ul>
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
                  <ul className="mt-2 max-h-32 overflow-y-auto bg-muted rounded-md">
                    {filteredDropoffPoints.map((branch) => (
                      <li
                        key={branch.id}
                        className="px-2 py-1 hover:bg-muted/50 cursor-pointer"
                        onClick={() => handleBranchSelect(branch.name, "dropoffLocation")}
                      >
                        {branch.id}. {branch.name}
                      </li>
                    ))}
                  </ul>
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
                <Button type="submit" className="w-full">
                  Submit Order
                </Button>
              </form>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="user-info">
          <AccordionTrigger className="px-4 py-2 hover:bg-muted/50">
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

        <AccordionItem value="fleet-management">
          <AccordionTrigger className="px-4 py-2 hover:bg-muted/50">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              <span>Fleet Management</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-4 py-2">
              <p>Fleet management content goes here.</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="analytics">
          <AccordionTrigger className="px-4 py-2 hover:bg-muted/50">
            <div className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              <span>Analytics</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-4 py-2">
              <p>Analytics content goes here.</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="settings">
          <AccordionTrigger className="px-4 py-2 hover:bg-muted/50">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-4 py-2">
              <p>Settings content goes here.</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="help">
          <AccordionTrigger className="px-4 py-2 hover:bg-muted/50">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              <span>Help & Support</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-4 py-2">
              <p>Help and support content goes here.</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default Sidebar

