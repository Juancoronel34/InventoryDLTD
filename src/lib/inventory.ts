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
  
  export function checkLowStock(inventory: InventoryItem[]) {
    const lowStockItems = inventory.filter(item => item.quantity < item.stockLevel)
    
    if (lowStockItems.length > 0) {
      console.log('Low stock items:', lowStockItems)
      // Here you could implement another notification logic if desired
    }
  }
  
  