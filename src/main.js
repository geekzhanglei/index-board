import { requestMarket } from "./data.js";

const routes = [
  { id: "overview", label: "市场温度", endpoint: "/blogapi/market/overview" },
  { id: "fund-flow", label: "资金流向", endpoint: "/blogapi/market/fund-flow" },
  { id: "crowding", label: "拥挤度", endpoint: "/blogapi/market/crowding" },
  { id: "consensus", label: "抱团方向", endpoint: "/blogapi/market/consensus" },
  { id: "about", label: "数据说明" }
];

const state = {
  route: getRoute(),
  status: "loading",
  error: "",
  data: null
};

const app = document.querySelector("#app");

window.addEventListener("hashchange", () => {
  state.route = getRoute();
  load();
});

load();

function getRoute() {
  const id = window.location.hash.replace(/^#\/?/, "");
  return routes.some(route => route.id === id) ? id : "overview";
}

async function load() {
  const route = currentRoute();
  if (!route.endpoint) {
    state.status = "ready";
    state.error = "";
    state.data = null;
    render();
    return;
  }

  state.status = "loading";
  state.error = "";
  render();

  try {
    state.data = await requestMarket(route.endpoint, route.id === "overview" ? { range: "1y" } : {});
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
  if (route.id === "overview") return renderOverview(normalizeOverview(state.data));
  if (route.id === "fund-flow") return renderFundFlow(normalizeFundFlow(state.data));
  if (route.id === "crowding") return renderCrowding(normalizeCrowding(state.data));
  if (route.id === "consensus") return renderConsensus(normalizeConsensus(state.data));
  return renderAbout();
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

function renderOverview(data) {
  return `
    ${renderPageHead({
      eyebrow: "Market Heat",
      title: "市场温度看板",
      subtitle: "跟踪 A 股、港股和美股主要指数的 PE、总市值、资金与拥挤度，每天更新一次。",
      ...data
    })}

    <section class="heat-layout">
      <article class="heat-card">
        <div class="heat-score">${safeText(data.heat.score)}</div>
        <div>
          <h2>${safeText(data.heat.label)}</h2>
          <p>${safeText(data.heat.summary)}</p>
        </div>
      </article>
      <div class="signal-grid">
        ${data.signals.map(item => `
          <article class="metric-card">
            <span>${safeText(item.label)}</span>
            <strong>${safeText(item.value)}</strong>
          </article>
        `).join("")}
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>主要市场</h2>
        <span>PE TTM / 总市值</span>
      </div>
      <div class="market-grid">
        ${data.markets.map(renderMarketCard).join("")}
      </div>
    </section>

    <section class="split-grid">
      <article class="panel">
        <div class="section-head">
          <h2>年化 PE 对比</h2>
          <span>统一按 TTM 展示</span>
        </div>
        ${data.peBars.map(item => `
          <div class="bar-row">
            <div class="bar-meta">
              <span>${safeText(item.name)}</span>
              <strong>${safeText(item.valueText)}</strong>
            </div>
            <div class="bar-track"><span class="${item.levelClass}" style="width:${item.width}%"></span></div>
          </div>
        `).join("")}
      </article>
      <article class="panel">
        <div class="section-head">
          <h2>总市值变化</h2>
          <span>近一年</span>
        </div>
        ${data.marketCapSeries.map(renderCapSeries).join("")}
      </article>
    </section>
  `;
}

function renderMarketCard(item) {
  return `
    <article class="market-card">
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

function renderConsensus(data) {
  return `
    ${renderPageHead({
      eyebrow: "Consensus",
      title: "抱团方向",
      subtitle: "用资金流、成交占比、指数贡献和行业强弱识别当前市场主线。",
      ...data
    })}
    <article class="summary-card">${safeText(data.summary)}</article>
    <section class="direction-list">
      ${data.directions.map(item => `
        <article class="direction-card">
          <span class="direction-rank">#${safeText(item.rank)}</span>
          <div class="direction-main">
            <h2>${safeText(item.name)}</h2>
            <p>${safeText(item.description)}</p>
            <div class="tag-row">
              ${item.topNames.map(name => `<span>${safeText(name)}</span>`).join("")}
            </div>
          </div>
          <div class="direction-score">
            <strong>${safeText(item.strengthText)}</strong>
            <span class="${item.changeClass}">${safeText(item.changeText)}</span>
          </div>
        </article>
      `).join("")}
    </section>
  `;
}

function renderAbout() {
  return `
    ${renderPageHead({
      eyebrow: "Data Source",
      title: "数据说明",
      subtitle: "网站不直接回源第三方财经站点，只调用自有后端接口。后端每日刷新公开数据并缓存，接口不可用时页面展示演示数据。"
    })}
    <section class="about-grid">
      <article class="panel">
        <h2>首版可做</h2>
        <p>沪深300、中证800、中证1000、创业板、港股、纳斯达克、标普500可以做成每日更新的指数温度看板。A 股最新价格、成交额、总市值可用公开行情接口日更；估值 PE 更适合用指数公司 factsheet 或公开估值页做低频缓存。</p>
      </article>
      <article class="panel">
        <h2>需要注意</h2>
        <ul>
          <li>不同来源的 PE 口径不同，必须在后端统一为 PE TTM 或明确标记。</li>
          <li>港股和美股总市值更适合用官方 factsheet 月度口径。</li>
          <li>资金流、拥挤度、抱团方向本质是加工指标，需要保留原始字段和计算版本。</li>
          <li>公开接口不等于授权商用数据源，上线前需要检查第三方网站使用条款。</li>
        </ul>
      </article>
      <article class="panel api-panel">
        <h2>建议接口</h2>
        <code>/blogapi/market/overview</code>
        <code>/blogapi/market/fund-flow</code>
        <code>/blogapi/market/crowding</code>
        <code>/blogapi/market/consensus</code>
      </article>
    </section>
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
  return {
    source: data.source || "service",
    usingDemo: data.source === "demo",
    demoReason: data.demoReason || "",
    updatedAtText: dateText(data.updatedAt),
    summary: data.summary || "",
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
  return {
    source: data.source || "service",
    usingDemo: data.source === "demo",
    demoReason: data.demoReason || "",
    updatedAtText: dateText(data.updatedAt),
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

function normalizeConsensus(payload) {
  const data = payload || {};
  return {
    source: data.source || "service",
    usingDemo: data.source === "demo",
    demoReason: data.demoReason || "",
    updatedAtText: dateText(data.updatedAt),
    summary: data.summary || "",
    directions: (data.directions || []).map(item => ({
      id: item.id,
      rank: item.rank,
      name: item.name,
      strengthText: ratioLabel(item.strength),
      changeText: pct(item.change, 1),
      changeClass: changeClass(item.change),
      description: item.description,
      topNames: item.topNames || []
    }))
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
