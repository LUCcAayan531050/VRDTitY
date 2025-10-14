// 代码生成时间: 2025-10-15 01:33:23
import express, { Request, Response } from 'express';
import { SupplyChainService } from './services/supplyChainService';
import { IProduct } from './interfaces/IProduct';

// 定义Express应用
const app = express();
const port = 3000;

// 中间件，用于解析请求体
app.use(express.json());

// 实例化供应链服务
const supplyChainService = new SupplyChainService();

// 获取所有产品
app.get('/products', async (req: Request, res: Response) => {
    try {
        // 调用服务层获取所有产品
        const products: IProduct[] = await supplyChainService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        // 错误处理
        res.status(500).json({ message: 'Failed to fetch products' });
    }
});

// 添加新产品
app.post('/products', async (req: Request, res: Response) => {
    const productData: IProduct = req.body;
    try {
        // 调用服务层添加产品
        const newProduct: IProduct = await supplyChainService.addProduct(productData);
        res.status(201).json(newProduct);
    } catch (error) {
        // 错误处理
        res.status(400).json({ message: 'Failed to add product' });
    }
});

// 更新产品信息
app.put('/products/:id', async (req: Request, res: Response) => {
    const productId = req.params.id;
    const productData: IProduct = req.body;
    try {
        // 调用服务层更新产品
        const updatedProduct: IProduct = await supplyChainService.updateProduct(productId, productData);
        res.status(200).json(updatedProduct);
    } catch (error) {
        // 错误处理
        res.status(500).json({ message: 'Failed to update product' });
    }
});

// 删除产品
app.delete('/products/:id', async (req: Request, res: Response) => {
    const productId = req.params.id;
    try {
        // 调用服务层删除产品
        await supplyChainService.deleteProduct(productId);
        res.status(204).send();
    } catch (error) {
        // 错误处理
        res.status(500).json({ message: 'Failed to delete product' });
    }
});

// 启动服务器
app.listen(port, () => {
    console.log(`Supply Chain Management System running on http://localhost:${port}`);
});
