// 代码生成时间: 2025-10-22 05:56:12
import express from 'express';
import { Request, Response } from 'express';

// 定义用户行为的数据结构
interface UserBehavior {
  userId: string;
  behavior: string;
  timestamp: Date;
}

// 创建Express应用
const app = express();

// 模拟用户行为数据存储
const userBehaviors: UserBehavior[] = [];

// 中间件来解析JSON请求体
app.use(express.json());

// 获取所有用户行为的API
app.get('/user-behaviors', (req: Request, res: Response) => {
  try {
    // 返回所有用户行为数据
    res.status(200).json(userBehaviors);
  } catch (error) {
    // 错误处理
    res.status(500).json({ error: 'Server error' });
  }
});

// 添加用户行为的API
app.post('/user-behaviors', (req: Request, res: Response) => {
  const userBehavior: UserBehavior = req.body;
  try {
    // 验证用户行为数据
    if (!userBehavior.userId || !userBehavior.behavior || !userBehavior.timestamp) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    // 存储用户行为数据
    userBehaviors.push(userBehavior);
    // 返回成功响应
    res.status(201).json({ message: 'User behavior added' });
  } catch (error) {
    // 错误处理
    res.status(500).json({ error: 'Server error' });
  }
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// 错误处理中间件
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something failed!' });
});

// 文档说明：
// 该程序提供了两个API，一个是GET /user-behaviors，用于获取所有用户行为数据；
// 另一个是POST /user-behaviors，用于添加新的用户行为数据。
// 程序还包括了错误处理和日志记录，以确保程序的健壮性和可维护性。