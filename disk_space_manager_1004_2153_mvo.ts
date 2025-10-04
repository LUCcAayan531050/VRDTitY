// 代码生成时间: 2025-10-04 21:53:35
import express from 'express';
import * as fs from 'fs';
import * as os from 'os';
import * as util from 'util';

// 定义一个异步函数来获取磁盘空间信息
const getDiskSpaceInfo = async (path: string): Promise<{ free: number, total: number }> => {
  try {
    const stats = await util.promisify(fs.statvfs)(path);
    const free = stats.f_bfree * stats.f_frsize;
    const total = stats.f_blocks * stats.f_frsize;
    return { free, total };
  } catch (error) {
    throw new Error(`Failed to get disk space info: ${error.message}`);
  }
};

// 创建Express应用
const app = express();
const port = 3000;

// 设置JSON解析中间件
app.use(express.json());

// API端点：获取磁盘空间信息
app.get('/api/disk-space', async (req, res) => {
  const { path } = req.query;
  if (!path) {
    return res.status(400).json({ error: 'Path parameter is required' });
  }
  try {
    const diskSpaceInfo = await getDiskSpaceInfo(path);
    res.json(diskSpaceInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Disk Space Manager is running on http://localhost:${port}`);
});

// 文档注释
/**
 * 获取指定路径的磁盘空间信息
 * @param path 要检查的磁盘路径
 * @returns 一个Promise，解析为包含可用空间和总空间的对象
 */
