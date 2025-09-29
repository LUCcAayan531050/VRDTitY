// 代码生成时间: 2025-09-30 02:32:26
import express, { Request, Response } from 'express';
import { Container } from './models/Container';
import { containerService } from './services/ContainerService';

// 创建一个Express应用
const app = express();
const port = 3000;

// 解析JSON格式的请求体
app.use(express.json());

// 获取容器列表
app.get('/containers', async (req: Request, res: Response) => {
  try {
    const containers = await containerService.listContainers();
    res.status(200).json(containers);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 创建新的容器
app.post('/containers', async (req: Request, res: Response) => {
  const { image, name } = req.body;
  if (!image || !name) {
    res.status(400).json({ error: 'Image and name are required' });
    return;
  }
  try {
    const newContainer = await containerService.createContainer({ image, name });
    res.status(201).json(newContainer);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 启动容器
app.put('/containers/:id/start', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const startedContainer = await containerService.startContainer(id);
    res.status(200).json(startedContainer);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 停止容器
app.put('/containers/:id/stop', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const stoppedContainer = await containerService.stopContainer(id);
    res.status(200).json(stoppedContainer);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 健康检查
app.get('/containers/:id/health', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const healthStatus = await containerService.checkHealth(id);
    res.status(200).json(healthStatus);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 启动Express服务器
app.listen(port, () => {
  console.log(`Container Orchestration Service running on port ${port}`);
});
