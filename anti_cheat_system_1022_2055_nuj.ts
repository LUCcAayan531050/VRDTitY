// 代码生成时间: 2025-10-22 20:55:35
import express from 'express';
import { Request, Response } from 'express';

// Define a type for the request body to ensure type safety
type RequestBody = {
  userId: string;
  activity: string;
  timestamp: number;
  signature: string;
};

// AntiCheatService class to handle anti-cheat logic
class AntiCheatService {
  private secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  // Method to verify the signature and detect cheating
  public verifySignature(data: RequestBody): boolean {
    const { userId, activity, timestamp, signature } = data;
    // Simulate signature verification logic
    const expectedSignature = this.generateSignature(userId, activity, timestamp);
    return signature === expectedSignature;
  }

  // Method to generate a signature for comparison
  private generateSignature(userId: string, activity: string, timestamp: number): string {
    // Use a simple hash for demonstration purposes; in production, use a secure method
    return `userId:${userId},activity:${activity},timestamp:${timestamp},secretKey:${this.secretKey}`;
  }
}

// Create an instance of AntiCheatService
const antiCheatService = new AntiCheatService(process.env.SECRET_KEY || 'defaultSecretKey');

// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// POST endpoint to receive user activity and check for cheating
app.post('/report-activity', (req: Request, res: Response) => {
  try {
    const requestBody: RequestBody = req.body;

    // Check if the request body is valid
    if (!requestBody || !requestBody.userId || !requestBody.activity || !requestBody.timestamp || !requestBody.signature) {
      return res.status(400).json({
        error: 'Invalid request body',
      });
    }

    // Verify the signature and detect cheating
    const isCheating = !antiCheatService.verifySignature(requestBody);
    if (isCheating) {
      return res.status(403).json({
        error: 'Cheating detected',
      });
    }

    // Activity is valid, process as needed
    return res.status(200).json({
      message: 'Activity reported successfully',
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error processing request:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});