# 管策智研 Agent

政策研究任务编排、工具调用、引用校验与结构化结果。公开版提供合成 mock 知识库，不附真实政策样例或训练题。

需要 Python 3.11 或更新版本。从仓库根目录安装并运行离线测试：

```powershell
py -3.13 -m venv .venv
.venv/Scripts/python.exe -m pip install -e './agent[dev]'
cd agent
../.venv/Scripts/python.exe -m pytest -q
```

Python 启动命令可替换成自己安装的 3.11+ 版本。真实模型配置使用环境变量 `LLM_BASE_URL`、`LLM_API_KEY`、`LLM_MODEL`；不要提交凭据。`KB_BACKEND=mock` 使用合成资料，`rag` 需要自己的授权运行库与 `RAG_STORE_PROJECT`。

命令行问答本身仍需要模型配置，离线测试通过假模型验证工程行为。`sample` 后端的真实契约样例未公开，不是开箱即用的数据后端。真实验收脚本只作为代码提供，必须在有权访问的数据环境中运行，不代表公开版附带可复现的真实验收数据。
