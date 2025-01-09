'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { useToast } from "../../components/ui/use-toast"
import Header from '../../components/shared/Header'
import Sidebar from '../../components/shared/Sidebar'

export default function AddProduct() {
  const router = useRouter()
  const { toast } = useToast()
  const [product, setProduct] = useState({
    ProductName: '',
    Reference: '',
    Quantity: 0,
    StockLevel: 0,
    EnteredBy: 'Current User', // This should be replaced with the actual logged-in user
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/add-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })

      if (response.ok) {
        const data = await response.json()
        toast({
          title: 'Product added successfully',
          description: 'The new product has been added to the inventory.',
        })
        router.push('/dashboard')
      } else {
        throw new Error('Failed to add product')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add product. Please try again.',
        variant: 'destructive',
      })
    }
  }

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
          notificationCount={0}
        />

        <div className="max-w-2xl mx-auto mt-8">
          <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-sm">
            <div>
              <label htmlFor="ProductName" className="block text-sm font-medium text-gray-700">Product Name</label>
              <Input
                id="ProductName"
                value={product.ProductName}
                onChange={(e) => setProduct({...product, ProductName: e.target.value})}
                required
              />
            </div>
            <div>
              <label htmlFor="Reference" className="block text-sm font-medium text-gray-700">Reference</label>
              <Input
                id="Reference"
                value={product.Reference}
                onChange={(e) => setProduct({...product, Reference: e.target.value})}
                required
              />
            </div>
            <div>
              <label htmlFor="Quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
              <Input
                id="Quantity"
                type="number"
                value={product.Quantity}
                onChange={(e) => setProduct({...product, Quantity: parseInt(e.target.value)})}
                required
              />
            </div>
            <div>
              <label htmlFor="StockLevel" className="block text-sm font-medium text-gray-700">Minimum Stock Level</label>
              <Input
                id="StockLevel"
                type="number"
                value={product.StockLevel}
                onChange={(e) => setProduct({...product, StockLevel: parseInt(e.target.value)})}
                required
              />
            </div>
            <Button type="submit" className="w-full">Add Product</Button>
          </form>
        </div>
      </main>
    </div>
  )
}

