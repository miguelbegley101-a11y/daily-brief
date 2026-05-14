# 每日简报 Daily Brief

一个适合放到 GitHub 作品集里的中文新闻汇总网站。当前版本是可直接打开的静态前端，包含新闻列表、分类筛选、关键词搜索、主题切换、趋势标签和归档入口。

## 现在能做什么

- 展示每日新闻主线、60 秒摘要和精选新闻列表
- 按国际、科技、财经、社会、文化筛选
- 搜索标题、来源、摘要和标签
- 点击趋势标签快速过滤相关新闻
- 切换深浅色主题，并保存本地偏好
- 直接部署到 GitHub Pages、Nginx、宝塔面板或任意静态服务器

## 本地预览

直接打开 `index.html` 即可预览。如果要通过本地服务器打开，可以使用任意静态服务器指向项目根目录。

## 部署建议

### GitHub Pages

1. 新建一个 GitHub 仓库，例如 `daily-brief`。
2. 把本项目文件推送到仓库。
3. 在仓库 `Settings -> Pages` 中选择 `Deploy from a branch`。
4. 分支选择 `main`，目录选择 `/root`。
5. 绑定自定义域名时，在域名 DNS 中添加 GitHub Pages 提供的记录。

### 云服务器

1. 安装 Nginx。
2. 将本项目上传到 `/var/www/daily-brief`。
3. 配置站点根目录为该文件夹。
4. 域名解析到服务器 IP。
5. 使用 Certbot 或云厂商证书功能开启 HTTPS。

## 后续接入真实新闻源

建议把前端数据从 `app.js` 中的 `stories` 数组迁移为接口，例如：

```txt
GET /api/daily-brief?date=2026-05-14
```

推荐数据流程：

1. 定时抓取 RSS、新闻 API 或自有采编源。
2. 对相似新闻去重。
3. 使用摘要模型生成标题、摘要、标签和重要性评分。
4. 人工审核后写入数据库。
5. 前端按日期读取当天简报。

## Temporal 自动化蓝图

如果后续想把它做成更像工程项目的作品，可以用 Temporal 管理每日任务：

- `DailyNewsWorkflow`：每天固定时间启动整条新闻汇总流程
- `FetchSourcesActivity`：抓取 RSS/API 新闻
- `DeduplicateActivity`：按标题、URL、语义相似度去重
- `SummarizeActivity`：生成中文摘要、标签和分类
- `ReviewQueueActivity`：把候选新闻送到人工审核队列
- `PublishDigestActivity`：发布当天 JSON 或写入数据库

Temporal 的优势是任务失败后可以自动重试，流程历史可追踪，后续你在简历里也能讲清楚“定时任务、重试、可观测性、人工审核”这些工程经验。

## 文件结构

```txt
.
├── assets/
│   ├── concept.png
│   └── editorial-desk.png
├── app.js
├── index.html
├── styles.css
└── README.md
```
