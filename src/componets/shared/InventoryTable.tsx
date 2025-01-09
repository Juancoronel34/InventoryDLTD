import { MoreVertical } from 'lucide-react'
import { Button } from "../ui/button"

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

interface InventoryTableProps {
  inventory: InventoryItem[]
  loading: boolean
}

export default function InventoryTable({ inventory, loading }: InventoryTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Recent Inventory</h2>
      </div>
      <div className="p-6">
        {loading ? (
          <div className="text-center py-8">Loading inventory...</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="pb-4">Product Name</th>
                <th className="pb-4">Reference</th>
                <th className="pb-4">Quantity</th>
                <th className="pb-4">Stock Level</th>
                <th className="pb-4">Entry Date</th>
                <th className="pb-4">Entered By</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.ID} className="border-t border-gray-100">
                  <td className="py-4">{item.ProductName}</td>
                  <td className="py-4">{item.Reference}</td>
                  <td className="py-4">{item.Quantity}</td>
                  <td className="py-4">{item.StockLevel}</td>
                  <td className="py-4">{new Date(item.EntryDate).toLocaleDateString()}</td>
                  <td className="py-4">{item.EnteredBy}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      item.Status === 'low' 
                        ? 'bg-yellow-100 text-yellow-700'
                        : item.Status === 'critical'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {item.Status.charAt(0).toUpperCase() + item.Status.slice(1)}
                    </span>
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

