'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Package, ClipboardList, PlusCircle, Users } from 'lucide-react'
import { Button } from "../ui/button"

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-6">
      <div className="mb-8">
        <Image
          src="/placeholder.svg"
          alt="Drummond LTD. Colombia"
          width={150}
          height={40}
          priority
        />
      </div>

      <nav className="space-y-2">
        <Link href="/dashboard">
          <Button
            variant="ghost"
            className={`w-full justify-start gap-2 ${
              isActive('/dashboard')
                ? 'text-[#DC0032] bg-red-50'
                : 'text-gray-600 hover:text-[#DC0032] hover:bg-red-50'
            }`}
          >
            <Package className="h-5 w-5" />
            Inventory
          </Button>
        </Link>
        <Link href="/add-product">
          <Button
            variant="ghost"
            className={`w-full justify-start gap-2 ${
              isActive('/add-product')
                ? 'text-[#DC0032] bg-red-50'
                : 'text-gray-600 hover:text-[#DC0032] hover:bg-red-50'
            }`}
          >
            <PlusCircle className="h-5 w-5" />
            Add Product
          </Button>
        </Link>
        <Link href="/directory">
          <Button
            variant="ghost"
            className={`w-full justify-start gap-2 ${
              isActive('/directory')
                ? 'text-[#DC0032] bg-red-50'
                : 'text-gray-600 hover:text-[#DC0032] hover:bg-red-50'
            }`}
          >
            <Users className="h-5 w-5" />
            Directory
          </Button>
        </Link>
        <Link href="/repair-tracker">
          <Button
            variant="ghost"
            className={`w-full justify-start gap-2 ${
              isActive('/repair-tracker')
                ? 'text-[#DC0032] bg-red-50'
                : 'text-gray-600 hover:text-[#DC0032] hover:bg-red-50'
            }`}
          >
            <ClipboardList className="h-5 w-5" />
            Repair tracker
          </Button>
        </Link>
      </nav>
    </aside>
  )
}

