'use client'

import { useState, useEffect } from 'react'
import { Package, Bell, MoreVertical } from 'lucide-react'
import { Button } from "../../components/ui/button"
import Header from '../../components/shared/Header'
import Sidebar from '../../components/shared/Sidebar'
import InventoryTable from '../../components/shared/InventoryTable'
import { useToast } from "../../components/ui/use-toast"
import { useRouter } from 'next/navigation'

interface InventoryItem {
  ID: string
  ProductName: string
  Reference: string
  Quantity: number
  StockLevel: number
  EntryDate: string
  EnteredBy: string
  Status: 'normal' | 'low' | 'critical'
}

export default function Dashboard() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const user = {
    name: 'Diego Delgado',
    role: 'Drone Pilot',
    avatar: '/placeholder.svg'
  }

  useEffect(() => {
    async function fetchInventory() {
      try {
        const response = await fetch('/api/inventory')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        
        if (data.inventory) {
          setInventory(data.inventory)
        } else {
          throw new Error('Inventory data is missing in the response')
        }
      } catch (error) {
        console.error('Error fetching inventory:', error)
        toast({
          title: 'Error',
          description: 'Failed to fetch inventory. Please try again.',
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchInventory()
  }, [toast])

  const filteredInventory = inventory.filter(item =>
    item.ProductName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.Reference.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalProducts = inventory.length
  const lowStockAlerts = inventory.filter(item => item.Status === 'low' || item.Status === 'critical').length
  const normalStockLevel = inventory.filter(item => item.Status === 'normal').length

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-64 p-8">
        <Header 
          user={{
            name: 'Diego Delgado',
            role: 'Drone Pilot',
            avatar: '/placeholder.svg',
            email: 'diego.delgado@drummond.com'
          }}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          notificationCount={lowStockAlerts}
        />

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Package className="h-6 w-6 text-[#DC0032]" />
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => router.push('/products')}
              >
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
            <h3 className="text-3xl font-bold mb-1">
              {totalProducts}
            </h3>
            <p className="text-gray-500">Total Products</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Bell className="h-6 w-6 text-yellow-600" />
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => router.push('/low-stock')}
              >
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
            <h3 className="text-3xl font-bold mb-1">
              {lowStockAlerts}
            </h3>
            <p className="text-gray-500">Low Stock Alerts</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
            <h3 className="text-3xl font-bold mb-1">
              {normalStockLevel}
            </h3>
            <p className="text-gray-500">Normal Stock Level</p>
          </div>
        </div>

        <InventoryTable inventory={filteredInventory} loading={loading} />
      </main>
    </div>
  )
}

