'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Package, Search, Filter } from 'lucide-react'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import Header from '../../components/shared/Header'
import Sidebar from '../../components/shared/Sidebar'

interface Product {
  id: string
  name: string
  reference: string
  price: number
  quantity: number
  image: string
  category: 'electronic' | 'mechanical' | 'tool'
}

const products: Product[] = [
  {
    id: '1',
    name: 'Board NodeMcu WiFi Wemos LOLIN32-4MB Basado',
    reference: 'SKU: VD2085',
    price: 31539.41,
    quantity: 7,
    image: '/placeholder.svg',
    category: 'electronic'
  },
  {
    id: '2',
    name: 'Fusible Electrico De Cristal (0.5A-250V 5x20 Mm)',
    reference: 'SKU: VD2089',
    price: 246.33,
    quantity: 52,
    image: '/placeholder.svg',
    category: 'electronic'
  },
  {
    id: '3',
    name: 'INTERRUPTOR BASCULANTE VERDE 2.5A 125V',
    reference: 'SKU: VD2088',
    price: 3531.08,
    quantity: 15,
    image: '/placeholder.svg',
    category: 'electronic'
  },
  {
    id: '4',
    name: 'Motor Mabuchi 500TB-12560',
    reference: 'SKU: VD2085',
    price: 8369.31,
    quantity: 6,
    image: '/placeholder.svg',
    category: 'mechanical'
  },
  {
    id: '5',
    name: 'Soporte O Base De Aluminio En Cruz Para',
    reference: 'SKU: VD2080',
    price: 2434.03,
    quantity: 8,
    image: '/placeholder.svg',
    category: 'mechanical'
  },
  {
    id: '6',
    name: 'Driver Motores Paso A Paso A4988',
    reference: 'SKU: VD108',
    price: 5510.03,
    quantity: 15,
    image: '/placeholder.svg',
    category: 'electronic'
  },
  {
    id: '7',
    name: 'SOPORTE FIJO PARA EJE LINEAL SH20',
    reference: 'SKU: VD2071',
    price: 14057.47,
    quantity: 2,
    image: '/placeholder.svg',
    category: 'mechanical'
  },
  {
    id: '8',
    name: 'SOPORTE FIJO PARA EJE LINEAL SK16',
    reference: 'SKU: VD2058',
    price: 10439.87,
    quantity: 15,
    image: '/placeholder.svg',
    category: 'mechanical'
  }
]

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'electronic', name: 'Electronic' },
    { id: 'mechanical', name: 'Mechanical' },
    { id: 'tool', name: 'Tools' }
  ]

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.reference.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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

        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Products</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={selectedCategory === category.id ? "bg-[#DC0032] hover:bg-[#DC0032]/90" : ""}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-square relative bg-gray-800">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-sm mb-2 h-12 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{product.reference}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#DC0032] font-semibold">
                    ${product.price.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <div className="text-sm text-gray-500">
                    Stock: {product.quantity}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button className="bg-[#DC0032] hover:bg-[#DC0032]/90">
            Ver todos los productos →
          </Button>
        </div>
      </main>
    </div>
  )
}

