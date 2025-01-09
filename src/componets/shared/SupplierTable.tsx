import { MoreVertical } from 'lucide-react'
import { Button } from "../ui/button"

interface Supplier {
  ID: string
  SupplierName: string
  Email: string
  BusinessPhone: string
  Company: string
  OrderCount: number
}

interface SuppliersTableProps {
  suppliers: Supplier[]
  loading: boolean
}

export default function SuppliersTable({ suppliers, loading }: SuppliersTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Supplier Directory</h2>
      </div>
      <div className="p-6">
        {loading ? (
          <div className="text-center py-8">Loading suppliers...</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="pb-4">Supplier Name</th>
                <th className="pb-4">Email</th>
                <th className="pb-4">Business Phone</th>
                <th className="pb-4">Company</th>
                <th className="pb-4">Orders</th>
                <th className="pb-4"></th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.ID} className="border-t border-gray-100">
                  <td className="py-4">{supplier.SupplierName}</td>
                  <td className="py-4">{supplier.Email}</td>
                  <td className="py-4">{supplier.BusinessPhone}</td>
                  <td className="py-4">{supplier.Company}</td>
                  <td className="py-4">
                    <span className="px-2 py-1 rounded-full text-sm bg-red-100 text-[#DC0032]">
                      {supplier.OrderCount} orders
                    </span>
                  </td>
                  <td className="py-4">
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

