# 管策智研 Web API

FastAPI 接收前端研究请求并调用 Agent，提供目录、证据与原文阅读接口。

从仓库根目录安装：

```powershell
.venv/Scripts/python.exe -m pip install -e './agent[dev]' -r web/backend/requirements.txt
.venv/Scripts/python.exe -m uvicorn app.main:app --app-dir web/backend --host 127.0.0.1 --port 8000
```

模型配置通过环境变量提供。真实目录及原文读取需要自己的授权知识库；公开仓库不附政策原件、元数据表或运行数据库。仅体验界面时使用前端 Demo，无需启动 API。

离线测试从 `web/backend` 执行 `../../.venv/Scripts/python.exe -m pytest -q tests`，不调用真实模型。检查政策正文质量的工具仅作为代码提供，不附原比赛输入数据。
