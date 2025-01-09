'use server'

interface InventoryItem {
  id: string
  productName: string
  reference: string
  quantity: number
  stockLevel: number
  entryDate: string
  enteredBy: string
  status: 'normal' | 'low' | 'critical'
}

export async function checkLowStock(inventory: InventoryItem[]) {
  const lowStockItems = inventory.filter(item => item.quantity < item.stockLevel)
  
  if (lowStockItems.length > 0) {
    console.log('Low stock items:', lowStockItems)
    // Here you could implement another notification logic if desired
  }
}

export async function connectToAccess() {
  // Here you would implement the connection to MS Access
  // This would typically be done through a database adapter or ODBC
  // For security reasons, this should be implemented in your backend
}

