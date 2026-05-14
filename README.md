# 每日简报 Daily Brief

一个使用 **React + Spring Boot** 构建的中文每日新闻汇总项目。前端负责新闻工作台体验，后端提供每日简报 API，适合作为 GitHub 作品集项目继续扩展到域名、云服务器、数据库和自动化新闻工作流。

## 技术栈

- 前端：React 19、Vite、原生 CSS、Lucide React 图标
- 后端：Spring Boot 3、Java 21、Maven
- 数据接口：REST API
- 部署准备：可前后端分离部署，也可后续将前端构建产物交给 Spring Boot 或 Nginx 托管

## 项目结构

```txt
.
├── backend/                 # Spring Boot API
│   ├── pom.xml
│   └── src/main/java/com/dailybrief
├── frontend/                # React + Vite
│   ├── package.json
│   ├── public/assets
│   └── src
├── package.json             # 根目录快捷脚本
└── README.md
```

## 本地运行

先启动后端：

```powershell
mvn -f backend/pom.xml spring-boot:run
```

再启动前端：

```powershell
npm --prefix frontend install
npm --prefix frontend run dev
```

访问：

```txt
http://127.0.0.1:5173
```

后端接口：

```txt
GET http://127.0.0.1:8080/api/brief
GET http://127.0.0.1:8080/api/health
```

## 后续扩展

- 接入真实新闻源、RSS 或第三方新闻 API
- 使用 PostgreSQL / MySQL 保存每日简报
- 使用 Temporal 编排每日抓取、去重、摘要、人工审核和发布流程
- 将 React 构建产物部署到 Nginx、云服务器或对象存储
- 将 Spring Boot 部署为独立 API 服务
