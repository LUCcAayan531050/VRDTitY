// 代码生成时间: 2025-10-11 23:17:32
import express from 'express';
import { createCanvas, loadImage } from 'canvas'; // 引入canvas处理图像
import sharp from 'sharp'; // 引入sharp处理图像

// 创建Express应用
const app = express();

// 设置静态文件目录
app.use(express.static('public'));

// 端口号
const PORT = process.env.PORT || 3000;

// 图像滤镜处理函数
async function applyFilter(imagePath: string, filter: string): Promise<Buffer> {
  try {
    // 使用sharp读取图像文件
    const image = await sharp(imagePath)
      // 应用滤镜效果
      .modify((input, options) => {
        switch (filter) {
          case 'grayscale':
            return input.toColorModel('b-w');
          case 'sepia':
            return input.convolve([
              0.272, 0.534, 0.131,
              0.349, 0.686, 0.168,
              0.393, 0.769, 0.189
            ]);
          // 可以根据需要添加更多的滤镜效果
          default:
            throw new Error('Filter not supported');
        }
      });
    // 返回处理后的图像Buffer
    return await image.toBuffer();
  } catch (error) {
    // 错误处理
    console.error('Error applying filter:', error);
    throw error;
  }
}

// 路由：上传图像并应用滤镜
app.post('/filter', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const file = req.files.image; // 获取上传的图像文件
  const filter = req.body.filter; // 获取滤镜参数

  try {
    // 应用滤镜
    const filteredImage = await applyFilter(file.tempFilePath, filter);
    // 返回处理后的图像
    res.writeHead(200, {
      'Content-Type': 'image/png'
    });
    res.end(filteredImage);
  } catch (error) {
    // 发送错误响应
    res.status(500).send('Error processing image');
  }
});

// 启动Express服务器
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});