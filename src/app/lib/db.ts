import { open } from 'node-adodb'

let connection: any = null

export async function connectToDatabase() {
  if (!connection) {
    try {
      connection = open(
        'Provider=Microsoft.ACE.OLEDB.12.0;Data Source=./inventory.accdb;'
      )
    } catch (error) {
      console.error('Failed to connect to the database:', error)
      throw new Error('Database connection failed')
    }
  }
  return connection
}

export async function getInventory() {
  try {
    const connection = await connectToDatabase()
    
    const inventory = await connection.query(`
      SELECT 
        Products.ID,
        Products.ProductName,
        Products.Reference,
        Products.Quantity,
        Products.StockLevel,
        Products.EntryDate,
        Users.Name as EnteredBy,
        CASE 
          WHEN Products.Quantity = 0 THEN 'critical'
          WHEN Products.Quantity < Products.StockLevel THEN 'low'
          ELSE 'normal'
        END as Status
      FROM Products
      LEFT JOIN Users ON Products.EnteredBy = Users.ID
      ORDER BY Products.EntryDate DESC
    `)
    
    return inventory
  } catch (error) {
    console.error('Database error:', error)
    throw new Error('Failed to fetch inventory from database')
  }
}

export async function addProduct(product: {
  ProductName: string
  Reference: string
  Quantity: number
  StockLevel: number
  EnteredBy: string
}) {
  try {
    const connection = await connectToDatabase()
    
    await connection.execute(`
      INSERT INTO Products (ProductName, Reference, Quantity, StockLevel, EntryDate, EnteredBy)
      VALUES ('${product.ProductName}', '${product.Reference}', ${product.Quantity}, ${product.StockLevel}, NOW(), '${product.EnteredBy}')
    `)
    
    // Fetch the newly added product
    const newProduct = await connection.query(`
      SELECT TOP 1
        Products.ID,
        Products.ProductName,
        Products.Reference,
        Products.Quantity,
        Products.StockLevel,
        Products.EntryDate,
        Users.Name as EnteredBy,
        CASE 
          WHEN Products.Quantity = 0 THEN 'critical'
          WHEN Products.Quantity < Products.StockLevel THEN 'low'
          ELSE 'normal'
        END as Status
      FROM Products
      LEFT JOIN Users ON Products.EnteredBy = Users.ID
      ORDER BY Products.ID DESC
    `)
    
    return newProduct[0]
  } catch (error) {
    console.error('Database error:', error)
    throw new Error('Failed to add product to database')
  }
}

export async function getSuppliers() {
  try {
    const connection = await connectToDatabase()
    
    const suppliers = await connection.query(`
      SELECT 
        Suppliers.ID,
        Suppliers.SupplierName,
        Suppliers.Email,
        Suppliers.BusinessPhone,
        Suppliers.Company,
        (SELECT COUNT(*) FROM Orders WHERE Orders.SupplierID = Suppliers.ID) as OrderCount
      FROM Suppliers
      ORDER BY Suppliers.SupplierName
    `)
    
    return suppliers
  } catch (error) {
    console.error('Database error:', error)
    throw new Error('Failed to fetch suppliers from database')
  }
}

