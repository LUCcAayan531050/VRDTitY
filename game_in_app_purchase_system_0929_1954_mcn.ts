// 代码生成时间: 2025-09-29 19:54:08
import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// Define the types for our purchase items
interface PurchaseItem {
  id: string;
  name: string;
  price: number;
}

// Define the type for a purchase transaction
interface PurchaseTransaction {
  item: PurchaseItem;
  userId: string;
  timestamp: Date;
}

// In-memory storage for purchase items
const purchaseItems: PurchaseItem[] = [
  { id: '1', name: 'Coins', price: 99 },
  { id: '2', name: 'PowerUps', price: 199 },
  // Add more items as needed
];

// In-memory storage for purchase transactions
const purchaseTransactions: PurchaseTransaction[] = [];

// Express app setup
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Endpoint to get all purchase items
app.get('/api/purchase-items', (req: Request, res: Response) => {
  try {
    res.status(StatusCodes.OK).json(purchaseItems);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
});

// Endpoint to create a purchase transaction
app.post('/api/purchase', (req: Request, res: Response) => {
  const { userId, itemId } = req.body;
  
  try {
    const item = purchaseItems.find(item => item.id === itemId);
    if (!item) {
      throw new Error('Item not found');
    }
    
    const transaction: PurchaseTransaction = {
      item,
      userId,
      timestamp: new Date(),
    };
    purchaseTransactions.push(transaction);
    
    res.status(StatusCodes.CREATED).json(transaction);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
});

// Endpoint to get all purchase transactions for a user
app.get('/api/purchase-transactions/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;
  
  try {
    const transactions = purchaseTransactions.filter(t => t.userId === userId);
    res.status(StatusCodes.OK).json(transactions);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: Function) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});