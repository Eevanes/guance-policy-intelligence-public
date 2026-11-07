# 管策智研 · Guance Policy Intelligence

基于原文证据的政策研究工作区。通过自然语言提出问题，检索文献、阅读原文，并从回答中的引用回到对应证据。

此仓库发布工程代码与合成演示数据，不包含比赛数据库、政策原件、训练集或真实 RAG 运行库。

## 功能

- 政策问答与多轮研究准备。
- 文献目录、筛选、Markdown 原文与图片阅读。
- 文中上标、文末参考文件及关联证据查看。
- 文献梳理、要素提取、政策比较与多方案分析入口。

界面沿用项目此前提交的研究入口和引用文献布局。前端使用 React + TypeScript，Web API 使用 FastAPI；Agent 与 RAG 按独立模块组织。

## 快速体验

安装 Node.js 22.12 或更新版本，在 PowerShell 中运行：

```powershell
git clone https://github.com/Eevanes/guance-policy-intelligence-public.git
cd guance-policy-intelligence-public/web/frontend
npm ci
$env:VITE_RESEARCH_MODE = "demo"
npm run dev
```

Demo 不需要模型密钥、后端或政策数据库。回答、文献和主题分类均为合成示例，不可作为真实政策依据。切换 Real 模式后只调用实际后端，失败不会自动降级为演示数据。

## 模块

| 目录 | 内容 |
| --- | --- |
| [web/frontend](web/frontend/README.md) | 研究界面、文献目录、证据与原文交互 |
| [web/backend](web/backend/README.md) | FastAPI 接口、研究请求与阅读服务 |
| [agent](agent/README.md) | 工具调用、证据校验、研究编排与合成知识库 |
| [rag库](rag库/README.md) | 切块、向量存储与检索代码；不附运行数据 |

真实研究需要自行取得数据使用授权、建设运行库并配置模型服务。模型地址及 API key 仅通过本地环境变量提供。公开源码本身不提供模型额度、数据访问权限或已部署服务。

## 本地检查

```powershell
cd web/frontend
npm test
npm run build
```

后端与 Agent 的安装和离线测试见各模块说明。仓库附带的测试不调用真实模型；它们不代表真实政策回答准确率或生产部署验收。

## 数据边界与来源

公开版从审查后的文件白名单建立全新 Git 历史，不复制原仓库分支、标签、Release 或数据历史。政策原件、清理语料、训练题、真实检索返回、真实验收报告以及 506 篇文献分类映射均留在私人版本。详见[公开版范围](docs/PUBLIC_RELEASE.md)。

工程基于 [SKD-Agent-Frontier/guance-policy-intelligence](https://github.com/SKD-Agent-Frontier/guance-policy-intelligence)，保留代码中原有贡献者信息，并采用个人研究界面版本。来源归属见 [NOTICE](NOTICE.md)。本仓库未新增统一开源许可证，数据授权也不随代码公开而改变。
