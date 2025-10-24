// 代码生成时间: 2025-10-25 05:14:49
import express from 'express';
import fs from 'fs';
import https from 'https';
import path from 'path';

// 定义常量和配置
const SSL_CERT_DIR = 'ssl_certs';
const CERT_FILE = 'certificate.crt';
const KEY_FILE = 'private.key';

// 创建Express应用
const app = express();
const port = 3000;

// 确保SSL证书目录存在
if (!fs.existsSync(SSL_CERT_DIR)) {
    fs.mkdirSync(SSL_CERT_DIR);
}

// 获取SSL证书和私钥文件的路径
const certPath = path.join(__dirname, SSL_CERT_DIR, CERT_FILE);
const keyPath = path.join(__dirname, SSL_CERT_DIR, KEY_FILE);

// 检查SSL证书和私钥是否存在
if (!fs.existsSync(certPath) || !fs.existsSync(keyPath)) {
    console.error('SSL/TLS证书或私钥文件不存在。');
    process.exit(1);
}

// 创建HTTPS服务器
const server = https.createServer({
    cert: fs.readFileSync(certPath),
    key: fs.readFileSync(keyPath),
}, app);

// 定义路由：获取SSL证书
app.get('/get-certificate', (req, res) => {
    const certificate = fs.readFileSync(certPath);
    res.setHeader('Content-Type', 'application/x-x509-ca-cert');
    res.send(certificate);
});

// 定义路由：上传SSL证书
app.post('/upload-certificate', express.json(), (req, res) => {
    try {
        if (!req.body.certificate) {
            throw new Error('证书数据未提供');
        }
        fs.writeFileSync(certPath, Buffer.from(req.body.certificate, 'base64'));
        res.status(200).send('证书上传成功');
    } catch (error) {
        console.error(error);
        res.status(500).send('证书上传失败');
    }
});

// 定义路由：上传私钥
app.post('/upload-private-key', express.json(), (req, res) => {
    try {
        if (!req.body.privateKey) {
            throw new Error('私钥数据未提供');
        }
        fs.writeFileSync(keyPath, Buffer.from(req.body.privateKey, 'base64'));
        res.status(200).send('私钥上传成功');
    } catch (error) {
        console.error(error);
        res.status(500).send('私钥上传失败');
    }
});

// 启动HTTPS服务器
server.listen(port, () => {
    console.log(`SSL/TLS证书管理服务正在运行于HTTPS ${port}`);
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('服务器内部错误');
});
