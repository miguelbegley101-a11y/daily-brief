import React from "react";
import { createRoot } from "react-dom/client";
import {
  Archive,
  BadgeCheck,
  BookOpenText,
  Building2,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  CircleDollarSign,
  Globe2,
  Moon,
  Newspaper,
  RefreshCcw,
  Search,
  Sparkles,
  Sun,
  Zap,
} from "lucide-react";
import "./styles.css";

const categoryIcons = {
  all: Newspaper,
  world: Globe2,
  tech: Zap,
  finance: CircleDollarSign,
  society: Building2,
  culture: BookOpenText,
};

const fallbackBrief = {
  dateLabel: "2026/05/14 周四",
  lead: {
    category: "world",
    label: "国际",
    time: "08:30",
    source: "Global Desk",
    title: "多国会议聚焦供应链韧性，能源与芯片议题继续升温",
    summary:
      "今日国际议程围绕关键矿产、港口运输和区域安全展开，市场正在观察政策文本是否会转化为新的产业补贴和贸易限制。",
  },
  summaries: [
    { label: "宏观", text: "亚洲主要股指分化，投资者等待新一轮通胀数据。" },
    { label: "科技", text: "端侧 AI、开源模型和芯片供给仍是行业主线。" },
    { label: "社会", text: "多地发布高温与强降雨提示，城市应急能力受关注。" },
    { label: "文化", text: "暑期档内容竞争提前升温，线下演出复苏延续。" },
  ],
  topics: [
    { id: "all", label: "总览", tone: "red" },
    { id: "world", label: "国际视野", tone: "blue" },
    { id: "tech", label: "科技雷达", tone: "cyan" },
    { id: "finance", label: "财经脉冲", tone: "amber" },
    { id: "society", label: "城市社会", tone: "indigo" },
    { id: "culture", label: "文化现场", tone: "violet" },
  ],
  stories: [
    {
      id: 1,
      category: "world",
      label: "国际",
      time: "08:30",
      source: "Global Desk",
      title: "多国会议聚焦供应链韧性，能源与芯片议题继续升温",
      summary: "关键矿产、港口运输和区域安全成为讨论重点，市场关注相关政策是否会继续影响制造业投资。",
      tags: ["供应链", "能源", "贸易"],
    },
    {
      id: 2,
      category: "tech",
      label: "科技",
      time: "09:10",
      source: "Tech Wire",
      title: "端侧 AI 应用加速落地，设备厂商转向更轻量模型",
      summary: "新一代手机与 PC 强调本地推理能力，开发者生态正从单纯参数规模转向延迟、功耗和隐私体验。",
      tags: ["端侧AI", "开源模型", "芯片"],
    },
    {
      id: 3,
      category: "finance",
      label: "财经",
      time: "09:45",
      source: "Market Note",
      title: "亚洲市场早盘分化，资金继续等待通胀和利率信号",
      summary: "投资者在科技股盈利预期和政策不确定性之间重新定价，避险资产和成长板块同步受到关注。",
      tags: ["市场", "利率", "通胀"],
    },
    {
      id: 4,
      category: "society",
      label: "社会",
      time: "10:20",
      source: "City Lens",
      title: "多地发布极端天气提醒，城市排涝与电力保障进入高压测试",
      summary: "强降雨和高温预警交替出现，交通、电网、社区服务的联动响应成为今日公共治理观察点。",
      tags: ["天气", "城市治理", "民生"],
    },
    {
      id: 5,
      category: "culture",
      label: "文化",
      time: "11:00",
      source: "Culture Lab",
      title: "暑期档内容竞争提前升温，线下演出和短剧市场继续扩容",
      summary: "院线、长视频和现场演出开始争夺年轻用户时长，平台更重视话题扩散与二次创作效率。",
      tags: ["电影", "演出", "短剧"],
    },
  ],
};

function App() {
  const [brief, setBrief] = React.useState(fallbackBrief);
  const [activeTopic, setActiveTopic] = React.useState("all");
  const [query, setQuery] = React.useState("");
  const [darkMode, setDarkMode] = React.useState(() => localStorage.getItem("daily-brief-theme") === "dark");
  const [apiState, setApiState] = React.useState("loading");

  React.useEffect(() => {
    let ignore = false;

    async function loadBrief() {
      try {
        const response = await fetch("/api/brief");
        if (!response.ok) throw new Error(`API responded ${response.status}`);
        const data = await response.json();
        if (!ignore) {
          setBrief(data);
          setApiState("connected");
        }
      } catch {
        if (!ignore) setApiState("fallback");
      }
    }

    loadBrief();
    return () => {
      ignore = true;
    };
  }, []);

  React.useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("daily-brief-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const visibleStories = React.useMemo(() => {
    const needle = query.trim().toLowerCase();
    return brief.stories.filter((story) => {
      const topicMatch = activeTopic === "all" || story.category === activeTopic;
      const haystack = `${story.title} ${story.summary} ${story.source} ${story.tags.join(" ")}`.toLowerCase();
      return topicMatch && (!needle || haystack.includes(needle));
    });
  }, [activeTopic, brief.stories, query]);

  const tags = React.useMemo(() => [...new Set(brief.stories.flatMap((story) => story.tags))].slice(0, 14), [brief.stories]);
  const activeTopicLabel = brief.topics.find((topic) => topic.id === activeTopic)?.label ?? "总览";

  return (
    <div className="app-shell">
      <header className="topic-header">
        <a className="brand" href="#top" aria-label="每日简报首页">
          <span className="brand-mark">DB</span>
          <span>
            <strong>每日简报</strong>
            <small>React + Spring Boot</small>
          </span>
        </a>

        <nav className="topic-nav" aria-label="主题频道">
          {brief.topics.map((topic) => {
            const Icon = categoryIcons[topic.id] ?? Newspaper;
            return (
              <button
                className={`topic-tab ${activeTopic === topic.id ? "active" : ""}`}
                data-tone={topic.tone}
                key={topic.id}
                onClick={() => setActiveTopic(topic.id)}
                type="button"
              >
                <Icon size={16} />
                <span>{topic.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="header-actions">
          <span className="date-chip">
            <CalendarDays size={16} />
            {brief.dateLabel}
          </span>
          <button className="icon-button" onClick={() => document.querySelector("#newsSearch")?.focus()} type="button" aria-label="聚焦搜索">
            <Search size={18} />
          </button>
          <button className="icon-button" onClick={() => setDarkMode((value) => !value)} type="button" aria-label="切换主题">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero-grid" aria-labelledby="pageTitle">
          <div className="lead-panel">
            <div className="section-label">今日主线 · {activeTopicLabel}</div>
            <h1 id="pageTitle">用十分钟读完今天值得追踪的新闻脉络</h1>
            <p>
              前端由 React 驱动主题筛选和搜索体验，后端由 Spring Boot 提供每日简报数据接口，后续可以自然接入数据库、RSS 和自动化摘要工作流。
            </p>

            <article className="lead-story">
              <img src="/assets/editorial-desk.png" alt="新闻简报工作台视觉图，包含报纸、手机图表和世界地图" />
              <div className="lead-copy">
                <span className="story-kicker">{brief.lead.label} · {brief.lead.time}</span>
                <h2>{brief.lead.title}</h2>
                <p>{brief.lead.summary}</p>
              </div>
            </article>
          </div>

          <aside className="brief-panel" aria-label="今日六十秒摘要">
            <div className="panel-heading">
              <div>
                <span className="section-label">60 秒摘要</span>
                <h2>今日速读</h2>
              </div>
              <span className={`api-pill ${apiState}`}>{apiState === "connected" ? "API 已连接" : apiState === "loading" ? "加载中" : "演示数据"}</span>
            </div>

            <ol className="pulse-list">
              {brief.summaries.map((item) => (
                <li key={item.label}>
                  <strong>{item.label}：</strong>{item.text}
                </li>
              ))}
            </ol>

            <div className="metric-strip">
              <span><strong>{visibleStories.length}</strong>条精选</span>
              <span><strong>{brief.topics.length - 1}</strong>个频道</span>
              <span><strong>10m</strong>阅读</span>
            </div>
          </aside>
        </section>

        <section className="digest-tools" aria-label="新闻搜索">
          <div className="status-band">
            <Sparkles size={18} />
            <span>{activeTopicLabel}频道正在展示 {visibleStories.length} 条相关新闻</span>
          </div>
          <label className="search-box" htmlFor="newsSearch">
            <Search size={18} />
            <input
              id="newsSearch"
              type="search"
              placeholder="搜索标题、来源或关键词"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </section>

        <section className="content-grid">
          <div className="story-board">
            <div className="board-head">
              <div>
                <span className="section-label">精选列表</span>
                <h2>今日新闻</h2>
              </div>
              <button className="text-button" onClick={() => { setActiveTopic("all"); setQuery(""); }} type="button">
                <RefreshCcw size={15} />
                重置筛选
              </button>
            </div>

            <div className="story-list" aria-live="polite">
              {visibleStories.map((story) => (
                <article className="story-card" data-category={story.category} key={story.id}>
                  <div className="story-meta">
                    <span className="category-dot">{story.label}</span>
                    <span>{story.time}</span>
                  </div>
                  <div className="story-main">
                    <h3>{story.title}</h3>
                    <p>{story.summary}</p>
                  </div>
                  <a className="source-link" href={`#source-${story.id}`} aria-label={`查看 ${story.source} 来源`}>
                    {story.source}
                  </a>
                </article>
              ))}
            </div>

            {visibleStories.length === 0 && <p className="empty-state">没有匹配的新闻，换个关键词试试。</p>}
          </div>

          <aside className="right-rail">
            <section className="rail-section">
              <div className="panel-heading compact">
                <h2>趋势标签</h2>
                <span>实时</span>
              </div>
              <div className="tag-cloud">
                {tags.map((tag) => (
                  <button key={tag} onClick={() => setQuery(tag)} type="button">{tag}</button>
                ))}
              </div>
            </section>

            <section className="rail-section">
              <div className="panel-heading compact">
                <h2>归档日历</h2>
                <span>May</span>
              </div>
              <div className="calendar-grid" aria-label="新闻归档日历">
                {[10, 11, 12, 13, 14].map((day) => (
                  <button className={day === 14 ? "active-day" : ""} key={day} type="button">{day}</button>
                ))}
              </div>
            </section>

            <section className="rail-section">
              <div className="panel-heading compact">
                <h2>工程路线</h2>
                <span>Spring Boot</span>
              </div>
              <ul className="workflow-list">
                <li><BadgeCheck size={15} />REST API 提供简报数据</li>
                <li><ChartNoAxesColumnIncreasing size={15} />React 负责筛选与搜索</li>
                <li><Archive size={15} />后续接入数据库归档</li>
              </ul>
            </section>
          </aside>
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
