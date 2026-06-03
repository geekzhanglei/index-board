import { requestMarket } from "./data.js";

const routes = [
  { id: "overview", label: "市场温度", endpoint: "/blogapi/market/overview" },
  { id: "fund-flow", label: "资金流向", endpoint: "/blogapi/market/fund-flow" },
  { id: "crowding", label: "拥挤度", endpoint: "/blogapi/market/crowding" },
  { id: "value", label: "价值投资", endpoint: "/blogapi/market/value" }
];

const demoIndexCards = [
  {
    id: "csi300",
    name: "沪深300",
    code: "000300.SH",
    region: "A股",
    style: "大盘价值",
    status: "拥挤",
    close: 4969.81,
    changePct: 1.12,
    peTtm: 26,
    pePercentile: 100,
    marketCap: 56200000000000,
    marketCapChangePct: 29
  },
  {
    id: "csi1000",
    name: "中证1000",
    code: "000852.SH",
    region: "A股",
    style: "小盘成长",
    status: "偏热",
    close: 7348.25,
    changePct: 0.68,
    peTtm: 37.8,
    pePercentile: 82,
    marketCap: 16800000000000,
    marketCapChangePct: 18.6
  },
  {
    id: "star50",
    name: "科创50",
    code: "000688.SH",
    region: "A股",
    style: "硬科技",
    status: "偏热",
    close: 1086.43,
    changePct: 1.86,
    peTtm: 48.2,
    pePercentile: 76,
    marketCap: 6400000000000,
    marketCapChangePct: 22.4
  },
  {
    id: "nasdaq",
    name: "纳斯达克",
    code: "IXIC.US",
    region: "美股",
    style: "科技成长",
    status: "拥挤",
    close: 19328.71,
    changePct: 0.44,
    peTtm: 31.6,
    pePercentile: 88,
    marketCap: 33100000000000,
    marketCapChangePct: 25.2,
    currency: "USD"
  },
  {
    id: "sp500",
    name: "标普500",
    code: "SPX.US",
    region: "美股",
    style: "大盘核心",
    status: "偏热",
    close: 5867.92,
    changePct: 0.27,
    peTtm: 28.4,
    pePercentile: 80,
    marketCap: 67800000000000,
    marketCapChangePct: 21.9,
    currency: "USD"
  },
  {
    id: "hsi",
    name: "恒生指数",
    code: "HSI.HK",
    region: "港股",
    style: "低估值",
    status: "中性",
    close: 23142.56,
    changePct: -0.32,
    peTtm: 11.8,
    pePercentile: 48,
    marketCap: 41500000000000,
    marketCapChangePct: 13.7,
    currency: "HKD"
  },
  {
    id: "hstech",
    name: "恒生科技",
    code: "HSTECH.HK",
    region: "港股",
    style: "港股科技",
    status: "偏冷",
    close: 5128.76,
    changePct: -0.76,
    peTtm: 22.5,
    pePercentile: 34,
    marketCap: 9300000000000,
    marketCapChangePct: 8.1,
    currency: "HKD"
  }
];

const demoFundFlow = {
  source: "demo",
  updatedAt: "2026-06-03T01:00:00+08:00",
  summary: "资金仍在宽基和红利方向防守式流入，科技 ETF 有脉冲，新能源和医药继续承压。",
  etfRanking: [
    { name: "沪深300ETF", amount: 42.6, theme: "大盘核心" },
    { name: "中证A500ETF", amount: 31.2, theme: "宽基增配" },
    { name: "科创50ETF", amount: 18.7, theme: "硬科技" },
    { name: "红利低波ETF", amount: 12.4, theme: "防守票息" },
    { name: "科创100ETF", amount: -9.6, theme: "成长流出" },
    { name: "医药ETF", amount: -14.8, theme: "估值修复慢" }
  ],
  industryMatrix: [
    { name: "银行", amount: 16.8 }, { name: "通信", amount: 14.1 }, { name: "电子", amount: 11.5 }, { name: "公用事业", amount: 9.2 },
    { name: "煤炭", amount: 7.8 }, { name: "汽车", amount: 4.1 }, { name: "家电", amount: 2.6 }, { name: "食品饮料", amount: -1.4 },
    { name: "地产", amount: -4.8 }, { name: "新能源", amount: -8.9 }, { name: "医药", amount: -11.6 }, { name: "传媒", amount: -15.2 }
  ],
  northbound: {
    today: 38.6,
    week: 126.4,
    month: 318.2,
    focus: ["贵州茅台", "宁德时代", "招商银行", "中际旭创"]
  },
  styleFlows: [
    { name: "大盘价值", amount: 28.4, strength: 78 },
    { name: "红利低波", amount: 15.9, strength: 66 },
    { name: "硬科技", amount: 10.8, strength: 59 },
    { name: "小盘成长", amount: -12.5, strength: 38 }
  ]
};

const demoCrowding = {
  source: "demo",
  updatedAt: "2026-06-03T01:00:00+08:00",
  ranks: [
    { name: "通信设备", score: 88, reason: "成交占比和估值分位同时高位" },
    { name: "半导体", score: 82, reason: "资金连续流入，波动放大" },
    { name: "银行", score: 76, reason: "红利交易集中度提升" },
    { name: "电力", score: 67, reason: "防守资金稳定配置" },
    { name: "新能源", score: 34, reason: "估值低位但资金未回流" },
    { name: "医药", score: 28, reason: "低位冷清，修复弹性待确认" }
  ],
  breadth: {
    up: 1026,
    down: 4218,
    flat: 116,
    indexChange: 0.72,
    note: "指数收红但全市场约 79% 个股下跌，权重抱团信号明显。"
  },
  fundCluster: {
    concentration: 64,
    topStocks: ["宁德时代", "贵州茅台", "腾讯控股", "中际旭创", "招商银行"],
    industries: [
      { name: "电子", weight: 18.6 },
      { name: "银行", weight: 15.4 },
      { name: "食品饮料", weight: 12.1 },
      { name: "通信", weight: 10.8 }
    ]
  },
  history: [
    { date: "2025-09", score: 52 },
    { date: "2025-10", score: 58 },
    { date: "2025-11", score: 63 },
    { date: "2025-12", score: 71 },
    { date: "2026-01", score: 69 },
    { date: "2026-02", score: 74 },
    { date: "2026-03", score: 79 },
    { date: "2026-04", score: 72 },
    { date: "2026-05", score: 81 },
    { date: "2026-06", score: 76 }
  ]
};

const demoValueInvesting = {
  source: "demo",
  updatedAt: "2026-06-03T01:00:00+08:00",
  summary: "初版固定观察 12 只 A 股大蓝筹股息票，重点看股息率、分红稳定性、增发风险和重大利空。",
  stocks: [
    { code: "601398.SH", name: "工商银行", dividendYield: 5.8, payout: 31, pe: 5.1, issueRisk: "低", badNews: "无重大未消化利空", trend: [4.4, 4.8, 5.1, 5.5, 5.8] },
    { code: "601288.SH", name: "农业银行", dividendYield: 5.4, payout: 32, pe: 5.4, issueRisk: "低", badNews: "息差压力", trend: [4.1, 4.6, 4.9, 5.2, 5.4] },
    { code: "600028.SH", name: "中国石化", dividendYield: 6.1, payout: 58, pe: 8.8, issueRisk: "中", badNews: "油价波动", trend: [5.0, 5.4, 5.9, 5.7, 6.1] },
    { code: "601088.SH", name: "中国神华", dividendYield: 6.7, payout: 71, pe: 9.2, issueRisk: "低", badNews: "煤价下行", trend: [6.2, 7.1, 7.4, 6.9, 6.7] },
    { code: "600900.SH", name: "长江电力", dividendYield: 3.4, payout: 69, pe: 21.4, issueRisk: "低", badNews: "估值偏贵", trend: [3.8, 3.6, 3.5, 3.4, 3.4] },
    { code: "600519.SH", name: "贵州茅台", dividendYield: 2.9, payout: 52, pe: 22.6, issueRisk: "低", badNews: "批价压力", trend: [1.6, 1.9, 2.2, 2.5, 2.9] },
    { code: "000651.SZ", name: "格力电器", dividendYield: 7.2, payout: 68, pe: 7.5, issueRisk: "低", badNews: "增长放缓", trend: [5.8, 6.1, 6.7, 7.0, 7.2] },
    { code: "600887.SH", name: "伊利股份", dividendYield: 4.6, payout: 63, pe: 13.2, issueRisk: "低", badNews: "需求偏弱", trend: [2.9, 3.4, 4.0, 4.3, 4.6] },
    { code: "601318.SH", name: "中国平安", dividendYield: 5.2, payout: 39, pe: 7.9, issueRisk: "中", badNews: "地产资产质量", trend: [3.1, 4.0, 4.7, 5.0, 5.2] },
    { code: "600036.SH", name: "招商银行", dividendYield: 5.0, payout: 35, pe: 6.2, issueRisk: "低", badNews: "净息差承压", trend: [3.3, 3.8, 4.4, 4.8, 5.0] },
    { code: "601668.SH", name: "中国建筑", dividendYield: 4.8, payout: 22, pe: 4.6, issueRisk: "中", badNews: "地产链拖累", trend: [4.1, 4.3, 4.6, 4.9, 4.8] },
    { code: "601857.SH", name: "中国石油", dividendYield: 4.9, payout: 48, pe: 9.7, issueRisk: "中", badNews: "油气价格波动", trend: [4.2, 4.7, 5.1, 5.0, 4.9] }
  ]
};

const state = {
  route: getRoute(),
  status: "loading",
  error: "",
  data: null,
  histories: {}
};

const app = document.querySelector("#app");

window.addEventListener("hashchange", () => {
  state.route = getRoute();
  load();
});

load();

function getRoute() {
  const id = window.location.hash.replace(/^#\/?/, "");
  if (id.startsWith("history/")) {
    return id;
  }
  return routes.some(route => route.id === id) ? id : "overview";
}

async function load() {
  if (state.route.startsWith("history/")) {
    const id = state.route.split("/")[1] || "csi300";
    state.status = "loading";
    state.error = "";
    render();
    try {
      state.data = await requestMarket("/blogapi/market/history", { id, years: 10 });
      state.status = "ready";
    } catch (error) {
      state.status = "error";
      state.error = error.message || "历史数据加载失败";
    }
    render();
    return;
  }

  const route = currentRoute();
  if (!route.endpoint) {
    state.status = "ready";
    state.error = "";
    state.data = null;
    state.histories = {};
    render();
    return;
  }

  if (route.endpoint) {
    state.status = "ready";
    state.error = "";
    state.histories = {};
    state.data = buildDemoPage(route.id);
    render();
    return;
  }

  state.status = "loading";
  state.error = "";
  render();

  try {
    state.data = await requestMarket(route.endpoint, route.id === "overview" ? { range: "1y" } : {});
    state.histories = route.id === "overview" ? await loadOverviewHistories(state.data) : {};
    state.status = "ready";
  } catch (error) {
    state.status = "error";
    state.error = error.message || "数据加载失败";
  }
  render();
}

function currentRoute() {
  return routes.find(route => route.id === state.route) || routes[0];
}

function render() {
  app.innerHTML = `
    <header class="topbar">
      <a class="brand" href="#/overview" aria-label="市场温度看板">
        <span class="brand-mark">M</span>
        <span>
          <strong>市场温度看板</strong>
          <small>money.feroad.com</small>
        </span>
      </a>
      <nav class="tabs" aria-label="页面导航">
        ${routes.map(route => `
          <a class="${route.id === state.route ? "active" : ""}" href="#/${route.id}">${route.label}</a>
        `).join("")}
      </nav>
    </header>
    <main class="page-shell">
      ${renderBody()}
    </main>
  `;
}

function renderBody() {
  if (state.status === "loading") {
    return `<section class="state-panel">加载中...</section>`;
  }

  if (state.status === "error") {
    return `
      <section class="state-panel error-panel">
        <p>${escapeHtml(state.error)}</p>
        <button type="button" data-action="retry">重试</button>
      </section>
    `;
  }

  const route = currentRoute();
  if (state.route.startsWith("history/")) return renderHistory(normalizeHistory(state.data));
  if (route.id === "overview") return renderOverview(normalizeOverview(state.data), state.histories);
  if (route.id === "fund-flow") return renderFundFlow(normalizeFundFlow(state.data));
  if (route.id === "crowding") return renderCrowding(normalizeCrowding(state.data));
  if (route.id === "value") return renderValueInvesting(normalizeValueInvesting(state.data));
  return renderOverview(normalizeOverview(buildDemoOverview()), state.histories);
}

app.addEventListener("click", event => {
  if (event.target.matches("[data-action='retry']")) {
    load();
  }
});

function renderPageHead({ eyebrow, title, subtitle, updatedAtText, usingDemo, demoReason }) {
  return `
    <section class="page-head">
      <p class="eyebrow">${eyebrow}</p>
      <h1>${title}</h1>
      <p class="subtitle">${subtitle}</p>
      ${updatedAtText ? `
        <div class="source-row">
          <span class="source-pill">更新 ${updatedAtText}</span>
          ${usingDemo ? `<span class="source-pill demo" title="${escapeAttr(demoReason)}">演示数据</span>` : ""}
        </div>
      ` : ""}
    </section>
  `;
}

async function loadOverviewHistories(payload) {
  const markets = Array.isArray(payload?.markets) ? payload.markets : [];
  const entries = await Promise.all(markets.map(async market => {
    try {
      const history = await requestMarket("/blogapi/market/history", { id: market.id, years: 10 });
      return [market.id, normalizeHistory(history)];
    } catch (error) {
      return [market.id, {
        error: error.message || "历史数据暂未接入",
        market,
        points: []
      }];
    }
  }));

  return Object.fromEntries(entries);
}

function renderOverview(data, histories) {
  return `
    ${renderPageHead({
      eyebrow: "Market Heat",
      title: "市场温度看板",
      subtitle: "先用演示数据展示主要指数温度卡片。点击任一指数进入 10 年详细趋势图。",
      ...data
    })}

    <section class="market-style-strip">
      ${data.markets.map(item => `
        <a href="#/history/${safeText(item.id)}">
          <strong>${safeText(item.name)}</strong>
          <span>${safeText(item.style)}</span>
          <em class="${item.changeClass}">${safeText(item.changePctText)}</em>
        </a>
      `).join("")}
    </section>

    <section class="temperature-card-grid">
      ${data.markets.map(renderTemperatureCard).join("")}
    </section>
  `;
}

function buildDemoOverview() {
  return {
    source: "demo",
    usingDemo: true,
    updatedAtText: dateText("2026-06-03T01:00:00+08:00"),
    heat: {
      score: 76,
      label: "偏热",
      summary: "A股大盘价值和美股科技处在高温区，港股大盘仍相对温和，科创方向弹性更高。"
    },
    signals: [
      { id: "a-share", label: "A股", value: "大盘偏热" },
      { id: "us", label: "美股", value: "科技拥挤" },
      { id: "hk", label: "港股", value: "修复观察" }
    ],
    markets: demoIndexCards.map(item => normalizeDemoMarket(item))
  };
}

function buildDemoPage(id) {
  if (id === "fund-flow") return demoFundFlow;
  if (id === "crowding") return demoCrowding;
  if (id === "value") return demoValueInvesting;
  return buildDemoOverview();
}

function normalizeDemoMarket(item) {
  const currency = item.currency || "CNY";
  return {
    id: item.id,
    name: item.name,
    code: item.code,
    region: item.region,
    style: item.style,
    status: item.status,
    currency,
    close: item.close,
    changePct: item.changePct,
    peTtm: item.peTtm,
    pePercentile: item.pePercentile,
    marketCap: item.marketCap,
    marketCapChangePct: item.marketCapChangePct,
    closeText: fixed(item.close, 2),
    changePctText: pct(item.changePct, 2),
    changeClass: changeClass(item.changePct),
    peTtmText: fixed(item.peTtm, 2),
    pePercentileText: ratioLabel(item.pePercentile),
    marketCapText: money(item.marketCap, currency),
    marketCapChangeText: pct(item.marketCapChangePct, 1),
    capChangeClass: changeClass(item.marketCapChangePct),
    levelText: levelText(item.pePercentile),
    levelClass: levelClass(item.pePercentile)
  };
}

function renderTemperatureCard(item) {
  return `
    <a class="temperature-card" href="#/history/${safeText(item.id)}" aria-label="查看${safeText(item.name)}十年详细图">
      <header>
        <div>
          <h2>${safeText(item.name)}</h2>
          <p>${safeText(item.code)}</p>
        </div>
        <span class="heat-badge ${item.levelClass}">${safeText(item.status)}</span>
      </header>
      <div class="card-price-row">
        <strong>${safeText(item.closeText)}</strong>
        <em class="${item.changeClass}">${safeText(item.changePctText)}</em>
      </div>
      <div class="card-metric-grid">
        <div>
          <span>PE</span>
          <strong>${safeText(item.peTtmText)}</strong>
        </div>
        <div>
          <span>分位</span>
          <strong>${safeText(item.pePercentileText)}</strong>
        </div>
      </div>
      <footer>
        <span>${safeText(item.marketCapText)}</span>
        <strong class="${item.capChangeClass}">${safeText(item.marketCapChangeText)}</strong>
      </footer>
      <p class="card-style">${safeText(item.region)} · ${safeText(item.style)}</p>
    </a>
  `;
}

function renderIndexChartCard(market, history, index) {
  const points = Array.isArray(history?.points) ? history.points : [];
  const hasHistory = points.length > 0;
  const latest = points[points.length - 1] || {};
  const currentPe = latest.peTtm ?? market.peTtm;
  const currentCap = latest.marketCap ?? market.marketCap;
  const chartTitle = index === 0 ? "首图" : market.region;
  const currency = history?.market?.currency || market.currency;
  const marketCapSource = history?.market?.marketCapSource || market.marketCapSource || market.dataSource || "待接入";
  const peSource = history?.market?.peSource || market.valuationSource || "待接入";

  return `
    <article class="index-chart-card ${index === 0 ? "featured" : ""}">
      <header class="chart-card-head">
        <div>
          <span class="chart-kicker">${safeText(chartTitle)}</span>
          <h2>${safeText(market.name)}</h2>
          <p>${safeText(market.code)} · ${safeText(market.region)}</p>
        </div>
        <div class="chart-now">
          <strong>${safeText(fixed(currentPe, 2))}x</strong>
          <span>PE</span>
        </div>
      </header>
      <div class="chart-metrics">
        <span>总市值 ${safeText(money(currentCap, currency))}</span>
        <span class="${market.changeClass}">涨跌 ${safeText(market.changePctText)}</span>
        <span class="${market.capChangeClass}">市值变化 ${safeText(market.marketCapChangeText)}</span>
      </div>
      <div class="chart-stage">
        ${hasHistory ? renderPremiumMixedChart(points, { name: market.name, currency }) : renderPendingChart(market, history)}
      </div>
      <footer class="chart-foot">
        <span>月度采样</span>
        ${history?.usingDemo ? "<span>演示历史</span>" : ""}
        <span>市值：${safeText(marketCapSource)}</span>
        <span>PE：${safeText(peSource)}</span>
      </footer>
    </article>
  `;
}

function renderPendingChart(market, history) {
  return `
    <div class="pending-chart">
      <svg viewBox="0 0 900 340" aria-label="${safeText(market.name)}历史数据待接入">
        <defs>
          <linearGradient id="pending-${safeText(market.id)}" x1="0" x2="1">
            <stop offset="0%" stop-color="#d9c7a6" stop-opacity=".4" />
            <stop offset="100%" stop-color="#b7c7c2" stop-opacity=".4" />
          </linearGradient>
        </defs>
        ${[0, 1, 2, 3].map(i => `<line x1="50" y1="${64 + i * 62}" x2="850" y2="${64 + i * 62}" />`).join("")}
        <path d="M70 238 C190 122, 292 194, 414 134 S646 194, 826 92" />
        <path d="M70 282 C220 252, 330 290, 450 236 S656 196, 826 170" />
      </svg>
      <div>
        <strong>10 年历史数据待接入</strong>
        <span>${safeText(history?.error || "后端暂未返回该指数 history 数据")}</span>
      </div>
    </div>
  `;
}

function renderPremiumMixedChart(points, meta) {
  const list = points.filter(item => item.marketCap != null || item.peTtm != null);
  if (!list.length) {
    return `<div class="state-panel">暂无历史数据</div>`;
  }

  const width = 980;
  const height = 380;
  const padLeft = 74;
  const padRight = 74;
  const padTop = 30;
  const padBottom = 50;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;
  const caps = list.map(item => Number(item.marketCap)).filter(Number.isFinite);
  const pes = list.map(item => Number(item.peTtm)).filter(Number.isFinite);
  const capMax = niceMax(Math.max(...caps, 1));
  const peMax = niceMax(Math.max(...pes, 1));
  const peMin = Math.min(...pes, 0);
  const step = list.length > 1 ? plotW / (list.length - 1) : plotW;
  const barW = Math.max(plotW / list.length * 0.62, 3);
  const uid = `chart-${meta.name.replace(/[^a-zA-Z0-9]/g, "")}-${list.length}`;

  const x = index => padLeft + step * index;
  const capY = value => padTop + plotH - Number(value || 0) / capMax * plotH;
  const peY = value => padTop + plotH - (Number(value || peMin) - peMin) / Math.max(peMax - peMin, 1) * plotH;
  const peLine = list
    .map((item, index) => item.peTtm == null ? null : `${index === 0 ? "M" : "L"} ${round(x(index))} ${round(peY(item.peTtm))}`)
    .filter(Boolean)
    .join(" ");
  const capLine = list
    .map((item, index) => item.marketCap == null ? null : `${index === 0 ? "M" : "L"} ${round(x(index))} ${round(capY(item.marketCap))}`)
    .filter(Boolean)
    .join(" ");
  const capArea = `${capLine} L ${round(x(list.length - 1))} ${padTop + plotH} L ${padLeft} ${padTop + plotH} Z`;
  const tickIndexes = Array.from(new Set([0, Math.floor(list.length / 4), Math.floor(list.length / 2), Math.floor(list.length * 3 / 4), list.length - 1]));
  const yTicks = [0, .25, .5, .75, 1];

  return `
    <svg class="premium-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${safeText(meta.name)}十年市值和 PE 月度图">
      <defs>
        <linearGradient id="${uid}-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#247c8a" stop-opacity=".28" />
          <stop offset="100%" stop-color="#247c8a" stop-opacity=".03" />
        </linearGradient>
        <linearGradient id="${uid}-bar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#2f8798" stop-opacity=".92" />
          <stop offset="100%" stop-color="#9bc3bd" stop-opacity=".42" />
        </linearGradient>
      </defs>
      ${yTicks.map(tick => {
        const y = padTop + plotH - tick * plotH;
        return `<line class="grid-line" x1="${padLeft}" y1="${round(y)}" x2="${width - padRight}" y2="${round(y)}" />`;
      }).join("")}
      <path class="cap-area" d="${capArea}" fill="url(#${uid}-area)" />
      ${list.map((item, index) => {
        const y = capY(item.marketCap);
        const h = padTop + plotH - y;
        return `
          <rect class="chart-bar" x="${round(x(index) - barW / 2)}" y="${round(y)}" width="${round(barW)}" height="${round(h)}" fill="url(#${uid}-bar)">
            <title>${safeText(item.date)} 市值 ${safeText(money(item.marketCap, meta.currency))} PE ${safeText(fixed(item.peTtm, 2))}</title>
          </rect>
        `;
      }).join("")}
      ${capLine ? `<path class="cap-outline" d="${capLine}" />` : ""}
      ${peLine ? `<path class="chart-pe-line" d="${peLine}" />` : ""}
      ${list.map((item, index) => item.peTtm == null ? "" : `
        <circle class="chart-pe-dot" cx="${round(x(index))}" cy="${round(peY(item.peTtm))}" r="3.6">
          <title>${safeText(item.date)} PE ${safeText(fixed(item.peTtm, 2))}</title>
        </circle>
      `).join("")}
      <text class="axis-label left" x="18" y="${padTop + 8}">${safeText(money(capMax, meta.currency))}</text>
      <text class="axis-label right" x="${width - padRight + 14}" y="${padTop + 8}">${safeText(fixed(peMax, 1))}x</text>
      <text class="axis-label right" x="${width - padRight + 14}" y="${padTop + plotH}">${safeText(fixed(peMin, 1))}x</text>
      ${tickIndexes.map(index => `
        <text class="x-tick" x="${round(x(index))}" y="${height - 18}">${safeText(list[index].date)}</text>
      `).join("")}
    </svg>
  `;
}

function renderMarketCard(item) {
  const clickable = item.id === "csi300";
  return `
    <article class="market-card ${clickable ? "clickable" : ""}" ${clickable ? "data-history-card='csi300'" : ""}>
      <div class="market-head">
        <div>
          <h3>${safeText(item.name)}</h3>
          <span>${safeText(item.code)}</span>
        </div>
        <span class="level-tag ${item.levelClass}">${safeText(item.levelText)}</span>
      </div>
      <div class="price-row">
        <strong>${safeText(item.closeText)}</strong>
        <span class="${item.changeClass}">${safeText(item.changePctText)}</span>
      </div>
      <dl class="metric-row">
        <div><dt>PE</dt><dd>${safeText(item.peTtmText)}</dd></div>
        <div><dt>分位</dt><dd>${safeText(item.pePercentileText)}</dd></div>
      </dl>
      <div class="cap-row">
        <span>${safeText(item.marketCapText)}</span>
        <strong class="${item.capChangeClass}">${safeText(item.marketCapChangeText)}</strong>
      </div>
      ${clickable ? `<a class="history-link" href="#/history/csi300">查看 10 年市值 / PE</a>` : ""}
    </article>
  `;
}

function renderCapSeries(item) {
  return `
    <div class="cap-series">
      <div class="cap-title-row">
        <strong>${safeText(item.name)}</strong>
        <span>${safeText(item.currentText)} <em class="${item.changeClass}">${safeText(item.changeText)}</em></span>
      </div>
      ${item.points.map(point => `
        <div class="cap-point">
          <span>${safeText(point.date)}</span>
          <div class="cap-track"><i style="width:${point.width}%"></i></div>
          <strong>${safeText(point.valueText)}</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function renderFundFlow(data) {
  return `
    ${renderPageHead({
      eyebrow: "Capital Flow",
      title: "资金流向",
      subtitle: "按自有服务每日缓存展示，优先覆盖北向、南向、宽基 ETF 与行业资金。",
      ...data
    })}
    <article class="summary-card">${safeText(data.summary)}</article>
    <section class="split-grid">
      <article class="panel">
        <div class="section-head"><h2>总览</h2><span>净流入 / 占成交比</span></div>
        <div class="flow-list">
          ${data.flows.map(item => `
            <div class="flow-card">
              <div><strong>${safeText(item.name)}</strong><span>${safeText(item.description)}</span></div>
              <div class="flow-right"><strong class="${item.amountClass}">${safeText(item.amountText)}</strong><span class="${item.ratioClass}">${safeText(item.ratioText)}</span></div>
            </div>
          `).join("")}
        </div>
      </article>
      <article class="panel">
        <div class="section-head"><h2>行业资金</h2></div>
        ${data.industryFlows.map(item => `
          <div class="industry-row">
            <div><strong>${safeText(item.name)}</strong><span>${safeText(item.heat)}</span></div>
            <em class="${item.amountClass}">${safeText(item.amountText)}</em>
          </div>
        `).join("")}
      </article>
    </section>
  `;
}

function renderCrowding(data) {
  return `
    ${renderPageHead({
      eyebrow: "Crowding",
      title: "拥挤度",
      subtitle: "把估值分位、成交额、前十权重集中度和两融热度合成风险温度。",
      ...data
    })}
    <article class="score-card">
      <div>${safeText(data.score.value)}</div>
      <section>
        <h2>${safeText(data.score.label)}</h2>
        <p>${safeText(data.score.summary)}</p>
      </section>
    </article>
    <section class="section">
      <div class="section-head"><h2>指标拆解</h2><span>历史分位越高越拥挤</span></div>
      <div class="indicator-grid">
        ${data.indicators.map(item => `
          <article class="indicator-card">
            <div class="indicator-head">
              <h3>${safeText(item.name)}</h3>
              <span class="level-tag ${item.levelClass}">${safeText(item.levelText)}</span>
            </div>
            <strong>${safeText(item.valueText)}</strong>
            <span>分位 ${safeText(item.percentileText)}</span>
            <p>${safeText(item.description)}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderFundFlow(data) {
  return `
    ${renderPageHead({
      eyebrow: "Capital Flow",
      title: "资金流向",
      subtitle: "先用假数据呈现四个模块：ETF 资金排行榜、行业资金热力、北向资金、风格流向。",
      ...data
    })}
    <article class="summary-card">${safeText(data.summary)}</article>
    <section class="module-grid flow-dashboard">
      <article class="panel module-card wide">
        <div class="section-head"><h2>ETF资金流向排行榜</h2><span>单位：亿元</span></div>
        <div class="horizontal-bars">
          ${data.etfRanking.map(item => `
            <div class="flow-bar-row">
              <div>
                <strong>${safeText(item.name)}</strong>
                <span>${safeText(item.theme)}</span>
              </div>
              <div class="signed-track">
                <i class="${item.amountClass}" style="width:${item.width}%"></i>
              </div>
              <em class="${item.amountClass}">${safeText(item.amountText)}</em>
            </div>
          `).join("")}
        </div>
      </article>
      <article class="panel module-card">
        <div class="section-head"><h2>行业资金流</h2><span>热力矩阵</span></div>
        <div class="heat-matrix">
          ${data.industryMatrix.map(item => `
            <div class="${item.heatClass}" style="--heat:${item.heat}">
              <strong>${safeText(item.name)}</strong>
              <span>${safeText(item.amountText)}</span>
            </div>
          `).join("")}
        </div>
      </article>
      <article class="panel module-card northbound-card">
        <div class="section-head"><h2>北向资金</h2><span>陆股通</span></div>
        <div class="northbound-number ${data.northbound.todayClass}">${safeText(data.northbound.todayText)}</div>
        <div class="mini-metrics">
          <span>近 5 日 <strong class="${data.northbound.weekClass}">${safeText(data.northbound.weekText)}</strong></span>
          <span>近 20 日 <strong class="${data.northbound.monthClass}">${safeText(data.northbound.monthText)}</strong></span>
        </div>
        <div class="tag-row">
          ${data.northbound.focus.map(name => `<span>${safeText(name)}</span>`).join("")}
        </div>
      </article>
      <article class="panel module-card">
        <div class="section-head"><h2>风格流向</h2><span>强度 / 净流入</span></div>
        <div class="style-flow-list">
          ${data.styleFlows.map(item => `
            <div>
              <header><strong>${safeText(item.name)}</strong><em class="${item.amountClass}">${safeText(item.amountText)}</em></header>
              <div class="bar-track"><span style="width:${item.strength}%"></span></div>
            </div>
          `).join("")}
        </div>
      </article>
    </section>
  `;
}

function renderCrowding(data) {
  return `
    ${renderPageHead({
      eyebrow: "Crowding",
      title: "拥挤度",
      subtitle: "先看行业拥挤，再看市场广度、基金抱团和拥挤历史，避免只看指数涨跌。",
      ...data
    })}
    <section class="module-grid crowding-dashboard">
      <article class="panel module-card wide">
        <div class="section-head"><h2>拥挤度排行榜</h2><span>一级行业 / 热门行业</span></div>
        <div class="crowding-rank-list">
          ${data.ranks.map(item => `
            <div class="crowding-rank-row">
              <div>
                <strong>${safeText(item.name)}</strong>
                <span>${safeText(item.reason)}</span>
              </div>
              <div class="score-meter"><i class="${item.levelClass}" style="width:${item.score}%"></i></div>
              <em>${safeText(item.scoreText)}</em>
            </div>
          `).join("")}
        </div>
      </article>
      <article class="panel module-card breadth-card">
        <div class="section-head"><h2>市场广度</h2><span>上涨 / 下跌家数</span></div>
        <div class="breadth-donut" style="--up:${data.breadth.upRatio}">
          <strong>${safeText(data.breadth.downRatioText)}</strong>
          <span>下跌占比</span>
        </div>
        <div class="breadth-counts">
          <span>上涨 <strong class="positive">${safeText(data.breadth.upText)}</strong></span>
          <span>下跌 <strong class="negative">${safeText(data.breadth.downText)}</strong></span>
          <span>指数 <strong class="${data.breadth.indexClass}">${safeText(data.breadth.indexText)}</strong></span>
        </div>
        <p>${safeText(data.breadth.note)}</p>
      </article>
      <article class="panel module-card">
        <div class="section-head"><h2>基金抱团</h2><span>重仓股 / 行业集中度</span></div>
        <div class="cluster-score">
          <strong>${safeText(data.fundCluster.concentrationText)}</strong>
          <span>Top 行业集中度</span>
        </div>
        <div class="tag-row cluster-tags">
          ${data.fundCluster.topStocks.map(name => `<span>${safeText(name)}</span>`).join("")}
        </div>
        <div class="style-flow-list">
          ${data.fundCluster.industries.map(item => `
            <div>
              <header><strong>${safeText(item.name)}</strong><em>${safeText(item.weightText)}</em></header>
              <div class="bar-track"><span style="width:${item.width}%"></span></div>
            </div>
          `).join("")}
        </div>
      </article>
      <article class="panel module-card wide">
        <div class="section-head"><h2>拥挤历史</h2><span>近 10 个月</span></div>
        ${renderCrowdingHistory(data.history)}
      </article>
    </section>
  `;
}

function renderValueInvesting(data) {
  return `
    ${renderPageHead({
      eyebrow: "Dividend Watch",
      title: "价值投资",
      subtitle: "固定观察 A 股大蓝筹股息票，用股息率、派息率、估值、增发风险和利空状态做初筛。",
      ...data
    })}
    <article class="summary-card">${safeText(data.summary)}</article>
    <section class="value-stock-grid">
      ${data.stocks.map(item => `
        <article class="value-stock-card">
          <header>
            <div>
              <h2>${safeText(item.name)}</h2>
              <span>${safeText(item.code)}</span>
            </div>
            <strong>${safeText(item.dividendYieldText)}</strong>
          </header>
          ${renderDividendSpark(item.trend)}
          <dl>
            <div><dt>PE</dt><dd>${safeText(item.peText)}</dd></div>
            <div><dt>派息率</dt><dd>${safeText(item.payoutText)}</dd></div>
            <div><dt>增发风险</dt><dd>${safeText(item.issueRisk)}</dd></div>
          </dl>
          <footer>${safeText(item.badNews)}</footer>
        </article>
      `).join("")}
    </section>
  `;
}

function renderCrowdingHistory(points) {
  const width = 860;
  const height = 220;
  const pad = 28;
  const plotW = width - pad * 2;
  const plotH = height - 54;
  const step = points.length > 1 ? plotW / (points.length - 1) : plotW;
  const x = index => pad + step * index;
  const y = score => pad + plotH - Number(score) / 100 * plotH;
  const line = points.map((item, index) => `${index === 0 ? "M" : "L"} ${round(x(index))} ${round(y(item.score))}`).join(" ");

  return `
    <svg class="crowding-history-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="拥挤历史">
      ${[20, 50, 80].map(score => `
        <line x1="${pad}" x2="${width - pad}" y1="${round(y(score))}" y2="${round(y(score))}" />
        <text x="${pad}" y="${round(y(score) - 6)}">${score}</text>
      `).join("")}
      <path d="${line}" />
      ${points.map((item, index) => `
        <circle cx="${round(x(index))}" cy="${round(y(item.score))}" r="4">
          <title>${safeText(item.date)} ${safeText(item.score)}</title>
        </circle>
      `).join("")}
      ${points.map((item, index) => index % 2 ? "" : `<text class="x-tick" x="${round(x(index))}" y="${height - 12}">${safeText(item.date)}</text>`).join("")}
    </svg>
  `;
}

function renderDividendSpark(points) {
  const values = points.map(Number).filter(Number.isFinite);
  const max = Math.max(...values, 1);
  return `
    <div class="dividend-spark" aria-label="近五年股息率变化">
      ${values.map(value => `<i style="height:${Math.max(value / max * 100, 10)}%"><span>${safeText(value.toFixed(1))}%</span></i>`).join("")}
    </div>
  `;
}

function renderHistory(data) {
  return `
    ${renderPageHead({
      eyebrow: "10Y History",
      title: `${safeText(data.market.name)}十年变化`,
      subtitle: "按每日缓存的后端数据展示。柱状为估算总市值，折线为 PE 口径；横轴按月采样。",
      ...data
    })}
    <article class="history-panel">
      <div class="chart-wrap">
        ${renderMixedChart(data.points)}
      </div>
      <div class="history-note">
        <span>左轴：${safeText(data.market.currency)} 总市值</span>
        <span>右轴：${safeText(data.market.peType)} PE</span>
        <span>市值来源：${safeText(data.market.marketCapSource)}</span>
        <span>PE 来源：${safeText(data.market.peSource)}</span>
      </div>
    </article>
  `;
}

function renderMixedChart(points) {
  const list = points.filter(item => item.marketCap != null || item.peTtm != null);
  if (!list.length) {
    return `<div class="state-panel">暂无历史数据</div>`;
  }

  const width = 960;
  const height = 420;
  const padLeft = 76;
  const padRight = 64;
  const padTop = 34;
  const padBottom = 54;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;
  const caps = list.map(item => item.marketCap).filter(item => item != null);
  const pes = list.map(item => item.peTtm).filter(item => item != null);
  const capMax = Math.max(...caps, 1);
  const peMax = Math.max(...pes, 1);
  const peMin = Math.min(...pes, 0);
  const barW = Math.max(plotW / list.length * 0.58, 2);
  const step = list.length > 1 ? plotW / (list.length - 1) : plotW;

  const x = index => padLeft + step * index;
  const capY = value => padTop + plotH - (value || 0) / capMax * plotH;
  const peY = value => padTop + plotH - ((value || peMin) - peMin) / Math.max(peMax - peMin, 1) * plotH;
  const line = list
    .map((item, index) => item.peTtm == null ? null : `${x(index)},${peY(item.peTtm)}`)
    .filter(Boolean)
    .join(" ");
  const tickIndexes = Array.from(new Set([0, Math.floor(list.length / 4), Math.floor(list.length / 2), Math.floor(list.length * 3 / 4), list.length - 1]));

  return `
    <svg class="mixed-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="沪深300十年市值和 PE 混合图">
      <line x1="${padLeft}" y1="${padTop}" x2="${padLeft}" y2="${padTop + plotH}" />
      <line x1="${width - padRight}" y1="${padTop}" x2="${width - padRight}" y2="${padTop + plotH}" />
      <line x1="${padLeft}" y1="${padTop + plotH}" x2="${width - padRight}" y2="${padTop + plotH}" />
      <text x="14" y="${padTop + 8}">${safeText(money(capMax, "CNY"))}</text>
      <text x="${width - padRight + 10}" y="${padTop + 8}">${safeText(fixed(peMax, 1))}x</text>
      <text x="${width - padRight + 10}" y="${padTop + plotH}">${safeText(fixed(peMin, 1))}x</text>
      ${list.map((item, index) => `
        <rect class="cap-bar" x="${x(index) - barW / 2}" y="${capY(item.marketCap)}" width="${barW}" height="${padTop + plotH - capY(item.marketCap)}">
          <title>${safeText(item.date)} 市值 ${safeText(money(item.marketCap, "CNY"))} PE ${safeText(fixed(item.peTtm, 2))}</title>
        </rect>
      `).join("")}
      ${line ? `<polyline class="pe-line" points="${line}" />` : ""}
      ${list.map((item, index) => item.peTtm == null ? "" : `
        <circle class="pe-dot" cx="${x(index)}" cy="${peY(item.peTtm)}" r="3">
          <title>${safeText(item.date)} PE ${safeText(fixed(item.peTtm, 2))}</title>
        </circle>
      `).join("")}
      ${tickIndexes.map(index => `
        <text class="x-tick" x="${x(index)}" y="${height - 18}">${safeText(list[index].date)}</text>
      `).join("")}
    </svg>
  `;
}

function normalizeOverview(payload) {
  const data = payload || {};
  const markets = Array.isArray(data.markets) ? data.markets : [];
  return {
    source: data.source || "service",
    usingDemo: data.source === "demo",
    demoReason: data.demoReason || "",
    updatedAtText: dateText(data.updatedAt),
    heat: data.heat || {},
    signals: Array.isArray(data.signals) ? data.signals : [],
    markets: markets.map(item => ({
      id: item.id,
      code: item.code,
      name: item.name,
      region: item.region,
      currency: item.currency,
      close: item.close,
      changePct: item.changePct,
      peTtm: item.peTtm,
      pePercentile: item.pePercentile,
      marketCap: item.marketCap,
      marketCapChangePct: item.marketCapChangePct,
      peType: item.peType,
      valuationSource: item.valuationSource,
      dataSource: item.dataSource,
      closeText: fixed(item.close, 2),
      changePctText: pct(item.changePct, 2),
      changeClass: changeClass(item.changePct),
      peTtmText: fixed(item.peTtm, 2),
      pePercentileText: ratioLabel(item.pePercentile),
      marketCapText: money(item.marketCap, item.currency),
      marketCapChangeText: pct(item.marketCapChangePct, 1),
      capChangeClass: changeClass(item.marketCapChangePct),
      levelText: levelText(item.pePercentile),
      levelClass: levelClass(item.pePercentile)
    })),
    peBars: normalizePeBars(markets),
    marketCapSeries: normalizeCapSeries(data.marketCapSeries)
  };
}

function normalizeFundFlow(payload) {
  const data = payload || {};
  const etfMax = Math.max(...(data.etfRanking || []).map(item => Math.abs(Number(item.amount) || 0)), 1);
  const matrixMax = Math.max(...(data.industryMatrix || []).map(item => Math.abs(Number(item.amount) || 0)), 1);
  return {
    source: data.source || "service",
    usingDemo: data.source === "demo",
    demoReason: data.demoReason || "",
    updatedAtText: dateText(data.updatedAt),
    summary: data.summary || "",
    etfRanking: (data.etfRanking || []).map(item => ({
      ...item,
      amountText: `${Number(item.amount) > 0 ? "+" : ""}${fixed(item.amount, 1)}`,
      amountClass: changeClass(item.amount),
      width: barWidth(Math.abs(item.amount), etfMax)
    })),
    industryMatrix: (data.industryMatrix || []).map(item => ({
      ...item,
      amountText: `${Number(item.amount) > 0 ? "+" : ""}${fixed(item.amount, 1)}`,
      amountClass: changeClass(item.amount),
      heatClass: Number(item.amount) >= 0 ? "heat-in" : "heat-out",
      heat: Math.max(Math.abs(Number(item.amount) || 0) / matrixMax, .18).toFixed(2)
    })),
    northbound: {
      ...(data.northbound || {}),
      todayText: flowMoney(data.northbound?.today * 100000000, "CNY"),
      todayClass: changeClass(data.northbound?.today),
      weekText: flowMoney(data.northbound?.week * 100000000, "CNY"),
      weekClass: changeClass(data.northbound?.week),
      monthText: flowMoney(data.northbound?.month * 100000000, "CNY"),
      monthClass: changeClass(data.northbound?.month),
      focus: data.northbound?.focus || []
    },
    styleFlows: (data.styleFlows || []).map(item => ({
      ...item,
      amountText: `${Number(item.amount) > 0 ? "+" : ""}${fixed(item.amount, 1)}亿`,
      amountClass: changeClass(item.amount)
    })),
    flows: (data.flows || []).map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      amountText: flowMoney(item.amount, item.currency),
      amountClass: changeClass(item.amount),
      ratioText: pct(item.ratio, 2),
      ratioClass: changeClass(item.ratio)
    })),
    industryFlows: (data.industryFlows || []).map(item => ({
      id: item.id,
      name: item.name,
      amountText: flowMoney(item.amount, item.currency),
      amountClass: changeClass(item.amount),
      heat: item.heat || ""
    }))
  };
}

function normalizeCrowding(payload) {
  const data = payload || {};
  const totalBreadth = Number(data.breadth?.up || 0) + Number(data.breadth?.down || 0) + Number(data.breadth?.flat || 0);
  const downRatio = totalBreadth ? Number(data.breadth?.down || 0) / totalBreadth * 100 : 0;
  const industryMax = Math.max(...(data.fundCluster?.industries || []).map(item => Number(item.weight) || 0), 1);
  return {
    source: data.source || "service",
    usingDemo: data.source === "demo",
    demoReason: data.demoReason || "",
    updatedAtText: dateText(data.updatedAt),
    ranks: (data.ranks || []).map(item => ({
      ...item,
      scoreText: ratioLabel(item.score),
      levelClass: levelClass(item.score)
    })),
    breadth: {
      ...(data.breadth || {}),
      upText: String(data.breadth?.up ?? "--"),
      downText: String(data.breadth?.down ?? "--"),
      upRatio: totalBreadth ? `${Math.round(Number(data.breadth?.up || 0) / totalBreadth * 100)}%` : "50%",
      downRatioText: ratioLabel(downRatio),
      indexText: pct(data.breadth?.indexChange, 2),
      indexClass: changeClass(data.breadth?.indexChange)
    },
    fundCluster: {
      ...(data.fundCluster || {}),
      concentrationText: ratioLabel(data.fundCluster?.concentration),
      topStocks: data.fundCluster?.topStocks || [],
      industries: (data.fundCluster?.industries || []).map(item => ({
        ...item,
        weightText: ratioLabel(item.weight),
        width: barWidth(item.weight, industryMax)
      }))
    },
    history: data.history || [],
    score: data.score || {},
    indicators: (data.indicators || []).map(item => ({
      id: item.id,
      name: item.name,
      valueText: item.valueText || fixed(item.value, 2),
      percentileText: ratioLabel(item.percentile),
      levelText: levelText(item.percentile),
      levelClass: levelClass(item.percentile),
      description: item.description
    }))
  };
}

function normalizeValueInvesting(payload) {
  const data = payload || {};
  return {
    source: data.source || "service",
    usingDemo: data.source === "demo",
    demoReason: data.demoReason || "",
    updatedAtText: dateText(data.updatedAt),
    summary: data.summary || "",
    stocks: (data.stocks || []).map(item => ({
      ...item,
      dividendYieldText: ratioLabel(item.dividendYield),
      payoutText: ratioLabel(item.payout),
      peText: `${fixed(item.pe, 1)}x`,
      trend: item.trend || []
    }))
  };
}

function normalizeHistory(payload) {
  const data = payload || {};
  return {
    source: data.source || "service",
    usingDemo: data.source === "demo",
    demoReason: data.demoReason || "",
    updatedAtText: dateText(data.updatedAt),
    market: data.market || {},
    points: Array.isArray(data.points) ? data.points : []
  };
}

function normalizePeBars(markets) {
  const maxPe = markets.reduce((max, item) => Math.max(max, Number(item.peTtm) || 0), 1);
  return markets.map(item => ({
    id: item.id,
    name: item.name,
    valueText: `${fixed(item.peTtm, 2)}x`,
    width: barWidth(item.peTtm, maxPe),
    levelClass: levelClass(item.pePercentile)
  }));
}

function normalizeCapSeries(series) {
  return (Array.isArray(series) ? series : []).map(item => {
    const points = Array.isArray(item.points) ? item.points : [];
    const maxValue = points.reduce((max, point) => Math.max(max, Number(point.value) || 0), 1);
    const first = points[0] || {};
    const last = points[points.length - 1] || {};
    const changePct = first.value ? ((Number(last.value) - Number(first.value)) / Number(first.value) * 100) : 0;

    return {
      id: item.id,
      name: item.name,
      currentText: money(last.value, item.currency),
      changeText: pct(changePct, 1),
      changeClass: changeClass(changePct),
      points: points.map(point => ({
        date: point.date,
        valueText: money(point.value, item.currency),
        width: barWidth(point.value, maxValue)
      }))
    };
  });
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function round(value) {
  return Math.round(value * 100) / 100;
}

function niceMax(value) {
  const num = Number(value);
  if (!Number.isFinite(num) || num <= 0) {
    return 1;
  }
  const pow = Math.pow(10, Math.floor(Math.log10(num)));
  return Math.ceil(num / pow) * pow;
}

function dateText(value) {
  if (!value) return "--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return String(value).replace("T", " ").slice(0, 16);
  }
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function fixed(value, digits) {
  const num = Number(value);
  return Number.isFinite(num) ? num.toFixed(digits) : "--";
}

function pct(value, digits = 2) {
  const num = Number(value);
  return Number.isFinite(num) ? `${num > 0 ? "+" : ""}${num.toFixed(digits)}%` : "--";
}

function money(value, currency) {
  const num = Number(value);
  if (!Number.isFinite(num)) return "--";
  if (currency === "USD") return `${(num / 1000000000000).toFixed(1)}万亿美元`;
  if (currency === "HKD") return `${(num / 1000000000000).toFixed(1)}万亿港元`;
  return `${(num / 1000000000000).toFixed(1)}万亿元`;
}

function flowMoney(value, currency) {
  const num = Number(value);
  if (!Number.isFinite(num)) return "--";
  const unit = currency === "USD" ? "亿美元" : currency === "HKD" ? "亿港元" : "亿元";
  return `${num > 0 ? "+" : ""}${(Math.abs(num) / 100000000).toFixed(1)}${unit}`;
}

function ratioLabel(value) {
  const num = Number(value);
  return Number.isFinite(num) ? `${num.toFixed(0)}%` : "--";
}

function changeClass(value) {
  const num = Number(value);
  if (num > 0) return "positive";
  if (num < 0) return "negative";
  return "neutral";
}

function levelClass(percentile) {
  const num = Number(percentile);
  if (!Number.isFinite(num)) return "level-mid";
  if (num < 30) return "level-low";
  if (num < 70) return "level-mid";
  if (num < 85) return "level-high";
  return "level-extreme";
}

function levelText(percentile) {
  const num = Number(percentile);
  if (!Number.isFinite(num)) return "口径待补";
  if (num < 30) return "偏冷";
  if (num < 70) return "中性";
  if (num < 85) return "偏热";
  return "拥挤";
}

function barWidth(value, maxValue) {
  const num = Math.max(Number(value) || 0, 0);
  const max = Math.max(Number(maxValue) || 1, 1);
  return Math.max(Math.round(num / max * 100), 4);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}

function safeText(value) {
  return escapeHtml(value ?? "--");
}
