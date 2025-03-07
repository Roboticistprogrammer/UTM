'use client'

import { useState, useEffect } from 'react'

interface Order {
  id: number
  status: string
}

interface User {
  name: string
  company: string
  email: string
  recentOrders: Order[]
}

const simulatedUser: User = {
  name: "John Doe",
  company: "Acme Logistics",
  email: "john.doe@acmelogistics.com",
  recentOrders: [
    { id: 1001, status: "Delivered" },
    { id: 1002, status: "In Transit" },
    { id: 1003, status: "Processing" },
  ]
}

function UserInfo() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    setTimeout(() => {
      setUser(simulatedUser)
    }, 500)
  }, [])

  if (!user) {
    return <div className="py-2">Loading user data...</div>
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div>
          <span className="font-medium">Name:</span> {user.name}
        </div>
        <div>
          <span className="font-medium">Company:</span> {user.company}
        </div>
        <div>
          <span className="font-medium">Email:</span> {user.email}
        </div>
      </div>
      <div>
        <div className="font-medium mb-2">Recent Orders</div>
        {user.recentOrders.length > 0 ? (
          <ul className="space-y-2">
            {user.recentOrders.map((order) => (
              <li key={order.id} className="flex justify-between text-sm">
                <span>Order #{order.id}</span>
                <span className={
                  order.status === "Delivered" ? "text-green-600" :
                  order.status === "In Transit" ? "text-blue-600" :
                  "text-yellow-600"
                }>{order.status}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No recent orders.</p>
        )}
      </div>
    </div>
  )
}

export default UserInfo


