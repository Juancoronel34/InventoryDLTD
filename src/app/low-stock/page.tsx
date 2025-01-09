'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, AlertTriangle, Package, Phone, Building2, ArrowUpRight, Search } from 'lucide-react'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import Header from '../../components/shared/Header'
import Sidebar from '../../components/shared/Sidebar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../components/ui/alert"
import { useToast } from "../../components/ui/use-toast"

interface LowStockItem {
  id: string
  name: string
  reference: string
  currentStock: number
  minStock: number
  supplier: {
    name: string
    email: string
    phone: string
    company: string
  }
}

const lowStockItems: LowStockItem[] = [
  {
    id: '1',
    name: 'Board NodeMcu WiFi Wemos LOLIN32-4MB Basado',
    reference: 'SKU: VD2085',
    currentStock: 2,
    minStock: 5,
    supplier: {
      name: 'Juan Pérez',
      email: 'juan.perez@electrocomponents.com',
      phone: '+57 300 123 4567',
      company: 'ElectroComponents S.A.S'
    }
  },
  {
    id: '2',
    name: 'SOPORTE FIJO PARA EJE LINEAL SH20',
    reference: 'SKU: VD2071',
    currentStock: 1,
    minStock: 3,
    supplier: {
      name: 'María González',
      email: 'maria.gonzalez@tecnopartes.com',
      phone: '+57 310 987 6543',
      company: 'TecnoPartes Ltda.'
    }
  },
  {
    id: '3',
    name: 'Motor Mabuchi 500TB-12560',
    reference: 'SKU: VD2085',
    currentStock: 2,
    minStock: 4,
    supplier: {
      name: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@motortech.com',
      phone: '+57 320 456 7890',
      company: 'MotorTech Colombia'
    }
  }
]

export default function LowStock() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState('')

  const handleContactSupplier = (supplier: LowStockItem['supplier']) => {
    // Here you would typically integrate with your email system
    toast({
      title: "Contact email prepared",
      description: `Email draft created for ${supplier.name} at ${supplier.company}`,
    })
  }

  const filteredItems = lowStockItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.supplier.company.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
          searchQuery=""
          setSearchQuery={() => {}}
          notificationCount={lowStockItems.length}
        />

        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Low Stock Alert</h1>
          
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Attention Required</AlertTitle>
            <AlertDescription>
              {lowStockItems.length} products are currently below minimum stock levels and require immediate attention.
            </AlertDescription>
          </Alert>

          <div className="flex justify-between items-center mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search by product name, reference, or supplier..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 max-w-md"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Details</TableHead>
                  <TableHead>Stock Status</TableHead>
                  <TableHead>Supplier Information</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.reference}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-[#DC0032]" />
                          <span className="font-medium">{item.currentStock} in stock</span>
                        </div>
                        <p className="text-sm text-gray-500">Minimum required: {item.minStock}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">{item.supplier.company}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Mail className="h-4 w-4" />
                          {item.supplier.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Phone className="h-4 w-4" />
                          {item.supplier.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        className="bg-[#DC0032] hover:bg-[#DC0032]/90"
                        onClick={() => handleContactSupplier(item.supplier)}
                      >
                        Contact Supplier
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  )
}

