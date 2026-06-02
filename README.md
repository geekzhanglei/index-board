# index-board

`money.feroad.com` 的 H5 大盘温度看板，功能内容对齐 `wx-index-board` 微信小程序。

## 功能

- 市场温度首页：沪深300、中证800、中证1000、创业板、港股、纳斯达克、标普500。
- PE TTM、PE 历史分位、总市值与总市值变化。
- 资金流向、拥挤度、抱团方向、数据说明。
- 优先请求自有后端 `/blogapi/market/*`，接口不可用时展示演示数据并明确标记。

## 本地

```bash
npm run check
npm run build
npm run dev
```

本地预览默认监听 `http://127.0.0.1:4173`。

## 部署

GitHub Actions 在 push 到 `main` 后构建静态产物，并发布到服务器：

- 服务器目录：`/www/frontEnd/index-board/current`
- 目标域名：`money.feroad.com`
- 需要仓库 secrets：`SERVER_HOST`、`SERVER_USER`、`SERVER_SSH_KEY`

Nginx 应把 `money.feroad.com` 的 `root` 指向 `/www/frontEnd/index-board/current`。
