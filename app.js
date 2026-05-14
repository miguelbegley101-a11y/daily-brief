const stories = [
  {
    category: "world",
    label: "国际",
    time: "08:30",
    source: "Global Desk",
    title: "多国会议聚焦供应链韧性，能源与芯片议题继续升温",
    summary:
      "关键矿产、港口运输和区域安全成为讨论重点，市场关注相关政策是否会继续影响制造业投资。",
    tags: ["供应链", "能源", "贸易"],
  },
  {
    category: "tech",
    label: "科技",
    time: "09:10",
    source: "Tech Wire",
    title: "端侧 AI 应用加速落地，设备厂商转向更轻量模型",
    summary:
      "新一代手机与 PC 强调本地推理能力，开发者生态正从单纯参数规模转向延迟、功耗和隐私体验。",
    tags: ["端侧AI", "开源模型", "芯片"],
  },
  {
    category: "finance",
    label: "财经",
    time: "09:45",
    source: "Market Note",
    title: "亚洲市场早盘分化，资金继续等待通胀和利率信号",
    summary:
      "投资者在科技股盈利预期和政策不确定性之间重新定价，避险资产和成长板块同步受到关注。",
    tags: ["市场", "利率", "通胀"],
  },
  {
    category: "society",
    label: "社会",
    time: "10:20",
    source: "City Lens",
    title: "多地发布极端天气提醒，城市排涝与电力保障进入高压测试",
    summary:
      "强降雨和高温预警交替出现，交通、电网、社区服务的联动响应成为今日公共治理观察点。",
    tags: ["天气", "城市治理", "民生"],
  },
  {
    category: "culture",
    label: "文化",
    time: "11:00",
    source: "Culture Lab",
    title: "暑期档内容竞争提前升温，线下演出和短剧市场继续扩容",
    summary:
      "院线、长视频和现场演出开始争夺年轻用户时长，平台更重视话题扩散与二次创作效率。",
    tags: ["电影", "演出", "短剧"],
  },
  {
    category: "tech",
    label: "科技",
    time: "11:35",
    source: "Builder Daily",
    title: "开源工具链更新频繁，企业内部知识库成为 AI 落地入口",
    summary:
      "围绕检索、权限和审计的基础设施需求上升，团队开始把 AI 功能嵌入已有工作流，而非独立产品。",
    tags: ["知识库", "RAG", "开发者"],
  },
  {
    category: "finance",
    label: "财经",
    time: "12:05",
    source: "Industry View",
    title: "新能源产业链价格企稳，机构关注海外需求与库存周期",
    summary:
      "组件、储能和充电基础设施的订单结构出现差异，企业利润修复仍取决于去库存速度。",
    tags: ["新能源", "库存", "出海"],
  },
  {
    category: "world",
    label: "国际",
    time: "13:15",
    source: "Policy Room",
    title: "区域安全会谈重启，外交表态释放谨慎降温信号",
    summary:
      "各方仍在边界条件上保持分歧，但沟通机制恢复本身降低了短期误判风险。",
    tags: ["外交", "安全", "谈判"],
  },
];

const state = {
  category: "all",
  query: "",
};

const categoryFilters = document.querySelector("#categoryFilters");
const storyList = document.querySelector("#storyList");
const emptyState = document.querySelector("#emptyState");
const storyCount = document.querySelector("#storyCount");
const searchInput = document.querySelector("#newsSearch");
const searchFocus = document.querySelector("#searchFocus");
const resetFilters = document.querySelector("#resetFilters");
const tagCloud = document.querySelector("#tagCloud");
const themeToggle = document.querySelector("#themeToggle");
const todayDate = document.querySelector("#todayDate");

const formatDate = () => {
  const formatter = new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });
  todayDate.textContent = formatter.format(new Date());
};

const getFilteredStories = () => {
  const query = state.query.trim().toLowerCase();
  return stories.filter((story) => {
    const categoryMatch = state.category === "all" || story.category === state.category;
    const queryText = `${story.title} ${story.summary} ${story.source} ${story.tags.join(" ")}`.toLowerCase();
    return categoryMatch && (!query || queryText.includes(query));
  });
};

const renderStories = () => {
  const visibleStories = getFilteredStories();
  storyCount.textContent = String(visibleStories.length);
  emptyState.hidden = visibleStories.length > 0;

  storyList.innerHTML = visibleStories
    .map(
      (story) => `
        <article class="story-card" data-category="${story.category}">
          <div class="story-meta">
            <span class="category-dot">${story.label}</span>
            <span>${story.time}</span>
          </div>
          <div class="story-main">
            <h3>${story.title}</h3>
            <p>${story.summary}</p>
          </div>
          <a class="source-link" href="#" aria-label="查看 ${story.source} 来源">${story.source}</a>
        </article>
      `,
    )
    .join("");
};

const renderTags = () => {
  const tags = [...new Set(stories.flatMap((story) => story.tags))].slice(0, 14);
  tagCloud.innerHTML = tags
    .map((tag) => `<button type="button" data-tag="${tag}">${tag}</button>`)
    .join("");
};

categoryFilters.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-category]");
  if (!button) return;

  state.category = button.dataset.category;
  document
    .querySelectorAll(".filter-chip")
    .forEach((chip) => chip.classList.toggle("active", chip === button));
  renderStories();
});

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderStories();
});

searchFocus.addEventListener("click", () => {
  searchInput.focus();
});

resetFilters.addEventListener("click", () => {
  state.category = "all";
  state.query = "";
  searchInput.value = "";
  document
    .querySelectorAll(".filter-chip")
    .forEach((chip) => chip.classList.toggle("active", chip.dataset.category === "all"));
  renderStories();
});

tagCloud.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-tag]");
  if (!button) return;

  state.query = button.dataset.tag;
  searchInput.value = button.dataset.tag;
  renderStories();
  searchInput.focus();
});

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("daily-brief-theme", isDark ? "dark" : "light");
});

const savedTheme = localStorage.getItem("daily-brief-theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
}

formatDate();
renderTags();
renderStories();
