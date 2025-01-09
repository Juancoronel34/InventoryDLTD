'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import Header from '../../components/shared/Header'
import Sidebar from '../../components/shared/Sidebar'
import SuppliersTable from '../../components/shared/SuppliersTable'
import { useToast } from "../../components/ui/use-toast"

interface Supplier {
  ID: string
  SupplierName: string
  Email: string
  BusinessPhone: string
  Company: string
  OrderCount: number
}

export default function Directory() {
  const [searchQuery, setSearchQuery] = useState('')
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchSuppliers() {
      try {
        const response = await fetch('/api/suppliers')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        
        if (data.suppliers) {
          setSuppliers(data.suppliers)
        } else {
          throw new Error('Suppliers data is missing in the response')
        }
      } catch (error) {
        console.error('Error fetching suppliers:', error)
        toast({
          title: 'Error',
          description: 'Failed to fetch suppliers. Please try again.',
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchSuppliers()
  }, [toast])

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.SupplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.Company.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-64 p-8">
        <Header 
          user={{
            name: 'Diego Delgado',
            role: 'Drone Pilot',
            avatar: '/placeholder.svg'
          }}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          notificationCount={0}
        />

        <div className="mb-8">
          <div className="flex items-center gap-4 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search suppliers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-[#DC0032] hover:bg-[#DC0032]/90">
              Add Supplier
            </Button>
          </div>
        </div>

        <SuppliersTable suppliers={filteredSuppliers} loading={loading} />
      </main>
    </div>
  )
}

