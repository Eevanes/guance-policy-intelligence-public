# 管策智研前端

React + TypeScript 研究界面，包含文献目录、Markdown 阅读、上标引用和文末参考文件。需要 Node.js 22.12+。

```powershell
npm ci
$env:VITE_RESEARCH_MODE = "demo"
npm run dev
```

Demo 使用合成文献，不调用模型或真实数据库。主题分类也仅映射到三份合成示例。Real 模式通过 `VITE_RESEARCH_MODE=real` 和 `VITE_API_BASE_URL` 配置，只请求真实后端，失败不自动转为 Demo。

```powershell
npm test
npm run build
npm run test:e2e
```

浏览器测试需要 Playwright 浏览器，或设置 `PLAYWRIGHT_BROWSER_CHANNEL=chrome` 使用已安装的 Chrome。浏览器冒烟验证当前 Demo 的研究、目录与原文交互；单元测试中的 HTTP 模拟不代表真实模型或 RAG 联调。真实数据专用及旧界面专用的浏览器用例未纳入公开版。
