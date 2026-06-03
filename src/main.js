import { requestMarket } from "./data.js";
import * as echarts from "./vendor/echarts.esm.min.js";

const routes = [
  { id: "overview", label: "市场温度", endpoint: "/blogapi/market/overview" },
  { id: "market-style", label: "市场风格", endpoint: "/blogapi/market/style" },
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
    id: "csi800",
    name: "中证800",
    code: "000906.SH",
    region: "A股",
    style: "中大盘均衡",
    status: "拥挤",
    close: 5312.42,
    changePct: 0.96,
    peTtm: 24.1,
    pePercentile: 91,
    marketCap: 73800000000000,
    marketCapChangePct: 24.8
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

const demoIndustryFundFlows = [
  { name: "银行", amount: 16.8, turnover: 682.4, marketCap: 12400000000000 },
  { name: "电子", amount: 11.5, turnover: 738.6, marketCap: 10800000000000 },
  { name: "非银金融", amount: 9.6, turnover: 526.3, marketCap: 9600000000000 },
  { name: "食品饮料", amount: -1.4, turnover: 284.7, marketCap: 8200000000000 },
  { name: "医药生物", amount: -11.6, turnover: 436.5, marketCap: 7600000000000 },
  { name: "电力设备", amount: -8.9, turnover: 468.2, marketCap: 7100000000000 },
  { name: "计算机", amount: 13.2, turnover: 496.8, marketCap: 6200000000000 },
  { name: "通信", amount: 14.1, turnover: 414.8, marketCap: 5200000000000 },
  { name: "汽车", amount: 4.1, turnover: 512.2, marketCap: 4900000000000 },
  { name: "公用事业", amount: 9.2, turnover: 226.1, marketCap: 4300000000000 },
  { name: "煤炭", amount: 7.8, turnover: 196.5, marketCap: 3900000000000 },
  { name: "有色金属", amount: 6.2, turnover: 362.7, marketCap: 3700000000000 },
  { name: "国防军工", amount: 3.4, turnover: 276.5, marketCap: 3500000000000 },
  { name: "基础化工", amount: -2.7, turnover: 332.9, marketCap: 3300000000000 },
  { name: "机械设备", amount: 5.8, turnover: 318.1, marketCap: 3200000000000 },
  { name: "家用电器", amount: 2.6, turnover: 138.4, marketCap: 3000000000000 },
  { name: "交通运输", amount: 4.9, turnover: 184.2, marketCap: 2800000000000 },
  { name: "传媒", amount: -15.2, turnover: 352.9, marketCap: 2600000000000 },
  { name: "石油石化", amount: 8.7, turnover: 171.3, marketCap: 2500000000000 },
  { name: "建筑装饰", amount: -3.1, turnover: 149.7, marketCap: 2300000000000 },
  { name: "房地产", amount: -4.8, turnover: 162.8, marketCap: 2200000000000 },
  { name: "农林牧渔", amount: -1.9, turnover: 128.6, marketCap: 1900000000000 },
  { name: "商贸零售", amount: -2.2, turnover: 118.4, marketCap: 1700000000000 },
  { name: "社会服务", amount: -0.8, turnover: 92.1, marketCap: 1600000000000 },
  { name: "钢铁", amount: 1.7, turnover: 84.6, marketCap: 1500000000000 },
  { name: "轻工制造", amount: -1.1, turnover: 96.4, marketCap: 1400000000000 },
  { name: "纺织服饰", amount: -0.9, turnover: 65.8, marketCap: 980000000000 },
  { name: "美容护理", amount: -0.5, turnover: 46.7, marketCap: 820000000000 },
  { name: "环保", amount: 1.2, turnover: 58.3, marketCap: 760000000000 },
  { name: "建筑材料", amount: -2.6, turnover: 74.2, marketCap: 710000000000 },
  { name: "综合", amount: 0.4, turnover: 31.5, marketCap: 320000000000 }
];

const demoFundFlow = {
  source: "demo",
  updatedAt: "2026-06-03T01:00:00+08:00",
  summary: "今日全市场成交约 1.06 万亿元，主线净流入 386 亿，占成交额 3.6%。这个比例已经不是噪音，说明资金在主动切换到宽基、红利和硬科技。",
  turnover: {
    total: 1060000000000,
    mainBoard: 682000000000,
    growthBoard: 254000000000,
    hkConnect: 124000000000
  },
  marketNetFlow: 38600000000,
  etfRanking: [
    { name: "沪深300ETF", amount: 42.6, theme: "大盘核心" },
    { name: "中证A500ETF", amount: 31.2, theme: "宽基增配" },
    { name: "科创50ETF", amount: 18.7, theme: "硬科技" },
    { name: "红利低波ETF", amount: 12.4, theme: "防守票息" },
    { name: "科创100ETF", amount: -9.6, theme: "成长流出" },
    { name: "医药ETF", amount: -14.8, theme: "估值修复慢" }
  ],
  industryMatrix: demoIndustryFundFlows,
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
  industries: [
    { name: "银行", marketCap: 12400000000000, score: 76, turnoverShare: 8.6, fundFlow: 16.8, valuationPercentile: 62 },
    { name: "电子", marketCap: 10800000000000, score: 82, turnoverShare: 14.8, fundFlow: 11.5, valuationPercentile: 78 },
    { name: "食品饮料", marketCap: 8200000000000, score: 58, turnoverShare: 5.4, fundFlow: -1.4, valuationPercentile: 46 },
    { name: "医药", marketCap: 7600000000000, score: 28, turnoverShare: 7.8, fundFlow: -11.6, valuationPercentile: 22 },
    { name: "新能源", marketCap: 7100000000000, score: 34, turnoverShare: 8.9, fundFlow: -8.9, valuationPercentile: 18 },
    { name: "通信", marketCap: 5200000000000, score: 88, turnoverShare: 9.2, fundFlow: 14.1, valuationPercentile: 84 },
    { name: "汽车", marketCap: 4900000000000, score: 61, turnoverShare: 6.8, fundFlow: 4.1, valuationPercentile: 55 },
    { name: "公用事业", marketCap: 4300000000000, score: 67, turnoverShare: 3.6, fundFlow: 9.2, valuationPercentile: 48 },
    { name: "煤炭", marketCap: 3900000000000, score: 64, turnoverShare: 2.7, fundFlow: 7.8, valuationPercentile: 53 },
    { name: "传媒", marketCap: 2600000000000, score: 72, turnoverShare: 4.3, fundFlow: -15.2, valuationPercentile: 69 }
  ],
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

const marketStyleCatalog = [
  {
    id: "financial-dividend",
    name: "金融红利",
    industries: "银行、保险、券商、运营商、高股息央企",
    heat: 86,
    marketCap: 28600000000000,
    flow: 82,
    crowding: 74,
    valuation: 58,
    breadth: 64,
    netFlow: 68.4,
    turnoverShare: 18.6,
    risk: "拥挤但未到极端",
    note: "资金在低估值、高股息和央企方向防守式集中。"
  },
  {
    id: "consumer-bluechip",
    name: "消费白马",
    industries: "白酒、食品饮料、家电、消费服务",
    heat: 52,
    marketCap: 14200000000000,
    flow: 44,
    crowding: 48,
    valuation: 42,
    breadth: 46,
    netFlow: -3.2,
    turnoverShare: 7.8,
    risk: "修复观察",
    note: "估值压力释放，但资金连续性不足。"
  },
  {
    id: "tech-growth",
    name: "科技成长",
    industries: "AI、软件、互联网、计算机、通信",
    heat: 79,
    marketCap: 17600000000000,
    flow: 73,
    crowding: 84,
    valuation: 76,
    breadth: 57,
    netFlow: 39.6,
    turnoverShare: 16.2,
    risk: "局部拥挤",
    note: "AI 和通信链条活跃，但拥挤度已经偏高。"
  },
  {
    id: "semiconductor-hardtech",
    name: "半导体硬科技",
    industries: "芯片、设备、材料、科创50",
    heat: 71,
    marketCap: 9600000000000,
    flow: 62,
    crowding: 78,
    valuation: 81,
    breadth: 52,
    netFlow: 18.7,
    turnoverShare: 8.5,
    risk: "估值偏贵",
    note: "科创方向有弹性，但估值容错率低。"
  },
  {
    id: "new-energy",
    name: "新能源",
    industries: "光伏、锂电、储能、新能源车",
    heat: 31,
    marketCap: 9300000000000,
    flow: 26,
    crowding: 34,
    valuation: 22,
    breadth: 38,
    netFlow: -21.4,
    turnoverShare: 8.9,
    risk: "低位冷清",
    note: "估值低但资金尚未形成持续回流。"
  },
  {
    id: "healthcare",
    name: "医药医疗",
    industries: "创新药、医疗器械、CXO、医疗服务",
    heat: 28,
    marketCap: 7600000000000,
    flow: 24,
    crowding: 28,
    valuation: 25,
    breadth: 34,
    netFlow: -18.2,
    turnoverShare: 7.3,
    risk: "弱修复",
    note: "低位但缺少主线资金确认。"
  },
  {
    id: "property-chain",
    name: "地产链",
    industries: "房地产、建材、建筑、家居、物业",
    heat: 35,
    marketCap: 5200000000000,
    flow: 31,
    crowding: 39,
    valuation: 20,
    breadth: 41,
    netFlow: -7.6,
    turnoverShare: 4.6,
    risk: "政策交易",
    note: "弹性依赖政策预期，基本面验证不足。"
  },
  {
    id: "cyclical-resources",
    name: "周期资源",
    industries: "煤炭、石油、有色、钢铁、化工",
    heat: 63,
    marketCap: 9600000000000,
    flow: 58,
    crowding: 61,
    valuation: 49,
    breadth: 55,
    netFlow: 14.3,
    turnoverShare: 9.4,
    risk: "中性偏热",
    note: "资源品和红利属性共振，但弹性弱于科技。"
  },
  {
    id: "export-manufacturing",
    name: "出海制造",
    industries: "汽车、家电、机械、电网设备、船舶",
    heat: 68,
    marketCap: 11100000000000,
    flow: 64,
    crowding: 58,
    valuation: 51,
    breadth: 62,
    netFlow: 22.8,
    turnoverShare: 10.1,
    risk: "趋势延续",
    note: "外需和订单逻辑支撑，拥挤度仍可接受。"
  },
  {
    id: "smallcap-growth",
    name: "中小盘成长",
    industries: "创业板、中证1000、专精特新、小微盘",
    heat: 42,
    marketCap: 16800000000000,
    flow: 35,
    crowding: 46,
    valuation: 57,
    breadth: 39,
    netFlow: -12.5,
    turnoverShare: 12.6,
    risk: "分化明显",
    note: "指数层面弱，局部主题仍有交易。"
  }
];

const styleRotationTimeline = [
  { start: 2006, end: 2007, style: "地产链" },
  { start: 2009, end: 2010, style: "周期资源" },
  { start: 2013, end: 2015, style: "科技成长" },
  { start: 2016, end: 2017, style: "消费白马" },
  { start: 2020, end: 2021, style: "新能源" },
  { start: 2021, end: 2022, style: "周期资源" },
  { start: 2023, end: 2024, style: "科技成长(AI)" },
  { start: 2024, end: 2026, style: "金融红利" }
];

const demoMarketStyle = {
  source: "demo",
  updatedAt: "2026-06-03T01:00:00+08:00",
  mainline: {
    name: "金融红利",
    score: 86,
    netFlow: 68.4,
    turnoverShare: 18.6,
    crowding: 74,
    verdict: "当前主线是金融红利：资金流入强、成交占比高，拥挤度偏高但未到极端。",
    reasons: [
      "银行、运营商、高股息央企持续承接防守资金。",
      "净流入占成交额比例高于其他风格，说明不是日内噪音。",
      "市场广度偏弱，指数上涨更多来自权重和红利资产。"
    ]
  },
  styles: marketStyleCatalog,
  rotations: styleRotationTimeline,
  fundFlow: demoFundFlow,
  crowding: demoCrowding
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
let chartInstances = [];
let resizeBound = false;

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
  disposeCharts();
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
  queueMicrotask(mountCharts);
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
  if (route.id === "market-style") return renderMarketStyle(normalizeMarketStyle(state.data));
  if (route.id === "value") return renderValueInvesting(normalizeValueInvesting(state.data));
  return renderOverview(normalizeOverview(buildDemoOverview()), state.histories);
}

app.addEventListener("click", event => {
  if (event.target.matches("[data-action='retry']")) {
    load();
  }
});

function disposeCharts() {
  chartInstances.forEach(chart => {
    try {
      chart.dispose();
    } catch {}
  });
  chartInstances = [];
}

function mountCharts() {
  const chartNodes = [...document.querySelectorAll("[data-chart]")];
  if (!chartNodes.length || state.status !== "ready") return;

  if (state.route.startsWith("history/")) {
    const data = normalizeHistory(state.data);
    const series = buildHistorySeries(data.points);
    mountChart("history-main", historyMainOption(series, data.market));
    mountChart("pe-percentile", pePercentileOption(series));
    mountChart("growth-compare", growthCompareOption(series));
  } else {
    const route = currentRoute();
    if (route.id === "market-style") {
      const data = normalizeMarketStyle(state.data);
      mountChart("style-heatmap", styleHeatmapOption(data));
      mountChart("style-timeline", styleTimelineOption(data));
      mountChart("industry-crowding", industryCrowdingOption(data.crowding));
      mountChart("flow-scale", flowScaleOption(data));
      mountChart("etf-ranking", etfRankingOption(data));
      mountChart("industry-flow", industryFlowOption(data));
      mountChart("style-flow", styleFlowOption(data));
      mountChart("crowding-rank", crowdingRankOption(data.crowding));
      mountChart("breadth", breadthOption(data.crowding));
      mountChart("cluster", clusterOption(data.crowding));
      mountChart("crowding-history", crowdingHistoryOption(data.crowding));
    }
    if (route.id === "value") {
      const data = normalizeValueInvesting(state.data);
      document.querySelectorAll("[data-chart='dividend']").forEach(node => {
        const index = Number(node.dataset.stockIndex);
        const stock = data.stocks[index];
        if (stock) mountChartNode(node, dividendOption(stock));
      });
    }
  }

  if (!resizeBound) {
    resizeBound = true;
    window.addEventListener("resize", () => {
      chartInstances.forEach(chart => chart.resize());
    });
  }
}

function mountChart(name, option) {
  const node = document.querySelector(`[data-chart='${name}']`);
  if (node && option) mountChartNode(node, option);
}

function mountChartNode(node, option) {
  const chart = echarts.init(node, null, { renderer: "canvas" });
  chart.setOption(option);
  chartInstances.push(chart);
}

function chartBaseGrid(extra = {}) {
  return {
    top: 48,
    right: 48,
    bottom: 42,
    left: 54,
    containLabel: true,
    ...extra
  };
}

function chartNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) ? round(num) : null;
}

function historyMainOption(series, market) {
  const list = series.filter(item => Number.isFinite(item.marketCapT) || Number.isFinite(item.pe));
  const dates = list.map(item => item.date);
  const latestName = safeText(market?.name || "指数");
  return {
    color: ["#7db2f2", "#ff2f22", "#7c35e8", "#129846"],
    animationDuration: 550,
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "cross" },
      valueFormatter: value => Number.isFinite(Number(value)) ? Number(value).toFixed(2) : value
    },
    legend: {
      top: 4,
      itemGap: 28,
      data: ["总营收（TTM）", "总市值", "PE（TTM）", "巴菲特指标"]
    },
    grid: chartBaseGrid({ top: 88, right: 118, left: 118, bottom: 50 }),
    xAxis: {
      type: "category",
      boundaryGap: true,
      data: dates,
      axisLabel: { interval: 11, rotate: 0 },
      axisTick: { show: false }
    },
    yAxis: [
      {
        type: "value",
        name: "市值（万亿）",
        nameLocation: "end",
        nameGap: 22,
        nameTextStyle: { color: "#ff2f22", fontWeight: 700 },
        axisLabel: { color: "#ff2f22" },
        splitLine: { lineStyle: { color: "#e8e1d6", type: "dashed" } }
      },
      {
        type: "value",
        name: "营收（万亿）",
        position: "left",
        offset: 56,
        nameLocation: "end",
        nameGap: 22,
        nameTextStyle: { color: "#2f74d0", fontWeight: 700 },
        axisLabel: { color: "#2f74d0" },
        splitLine: { show: false }
      },
      {
        type: "value",
        name: "PE（倍）",
        position: "right",
        nameLocation: "end",
        nameGap: 22,
        nameTextStyle: { color: "#7c35e8", fontWeight: 700 },
        axisLabel: { color: "#7c35e8" },
        splitLine: { show: false }
      },
      {
        type: "value",
        name: "巴菲特（%）",
        position: "right",
        offset: 56,
        nameLocation: "end",
        nameGap: 22,
        min: 0,
        max: 120,
        nameTextStyle: { color: "#129846", fontWeight: 700 },
        axisLabel: { color: "#129846", formatter: "{value}%" },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: "总营收（TTM）",
        type: "bar",
        yAxisIndex: 1,
        data: list.map(item => chartNumber(item.revenueT)),
        barWidth: "58%",
        itemStyle: {
          borderRadius: [2, 2, 0, 0],
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#78aef0" },
              { offset: 1, color: "#d8e8ff" }
            ]
          }
        }
      },
      {
        name: "总市值",
        type: "line",
        yAxisIndex: 0,
        data: list.map(item => chartNumber(item.marketCapT)),
        smooth: .12,
        showSymbol: false,
        lineStyle: { width: 2.2, color: "#ff2f22" }
      },
      {
        name: "PE（TTM）",
        type: "line",
        yAxisIndex: 2,
        data: list.map(item => chartNumber(item.pe)),
        smooth: .16,
        showSymbol: false,
        lineStyle: { width: 2, color: "#7c35e8" }
      },
      {
        name: "巴菲特指标",
        type: "line",
        yAxisIndex: 3,
        data: list.map(item => chartNumber(item.buffett)),
        smooth: .12,
        showSymbol: false,
        lineStyle: { width: 2.1, color: "#129846" }
      }
    ],
    aria: { enabled: true, label: { description: `${latestName}十年市值营收PE趋势图` } }
  };
}

function pePercentileOption(series) {
  const list = series.filter(item => Number.isFinite(item.pePercentile));
  return {
    color: ["#1f6ff2"],
    tooltip: { trigger: "axis", valueFormatter: value => `${Number(value).toFixed(1)}%` },
    grid: chartBaseGrid({ top: 24, right: 20 }),
    xAxis: { type: "category", data: list.map(item => item.date), axisLabel: { interval: 11 } },
    yAxis: { type: "value", min: 0, max: 100, axisLabel: { formatter: "{value}%" }, splitLine: { lineStyle: { color: "#ece3d5", type: "dashed" } } },
    series: [{
      name: "PE分位",
      type: "line",
      data: list.map(item => chartNumber(item.pePercentile)),
      smooth: .18,
      showSymbol: false,
      lineStyle: { width: 2.2 },
      markLine: {
        symbol: "none",
        label: { position: "insideStartTop" },
        lineStyle: { type: "dashed", width: 1.2 },
        data: [
          { yAxis: 80, name: "极度高估区（>80%）", lineStyle: { color: "#ff4d43" } },
          { yAxis: 60, name: "高估区（50%-80%）", lineStyle: { color: "#f0a22a" } },
          { yAxis: 40, name: "合理区（20%-50%）", lineStyle: { color: "#18a567" } },
          { yAxis: 20, name: "低估区（<20%）", lineStyle: { color: "#24a9d8" } }
        ]
      }
    }]
  };
}

function growthCompareOption(series) {
  const list = series.filter(item => item.revenueGrowth != null || item.capGrowth != null);
  return {
    color: ["#1f6ff2", "#ff2f22"],
    tooltip: { trigger: "axis", valueFormatter: value => `${Number(value).toFixed(1)}%` },
    legend: { top: 4, data: ["营收同比增速（TTM）", "市值同比增速（TTM）"] },
    grid: chartBaseGrid({ top: 44, right: 22 }),
    xAxis: { type: "category", data: list.map(item => item.date), axisLabel: { interval: 11 } },
    yAxis: { type: "value", axisLabel: { formatter: "{value}%" }, splitLine: { lineStyle: { color: "#ece3d5", type: "dashed" } } },
    series: [
      { name: "营收同比增速（TTM）", type: "line", smooth: .16, showSymbol: false, data: list.map(item => chartNumber(item.revenueGrowth)) },
      { name: "市值同比增速（TTM）", type: "line", smooth: .16, showSymbol: false, data: list.map(item => chartNumber(item.capGrowth)) }
    ]
  };
}

function styleHeatmapOption(data) {
  const rows = data.styles || [];
  return {
    tooltip: {
      formatter: params => {
        const style = params.data || {};
        return [
          `<strong>${escapeHtml(style.name)}</strong>`,
          `风格市值：${escapeHtml(money(style.marketCap, "CNY"))}`,
          `资金强度：${escapeHtml(style.flowText || "--")}`,
          `拥挤度：${escapeHtml(style.crowdingText || "--")}`,
          `估值位置：${escapeHtml(style.valuationText || "--")}`,
          `市场广度：${escapeHtml(style.breadthText || "--")}`,
          `净流入：${escapeHtml(style.netFlowText || "--")}`,
          escapeHtml(style.industries || "")
        ].join("<br>");
      }
    },
    series: [{
      type: "treemap",
      roam: false,
      nodeClick: false,
      breadcrumb: { show: false },
      squareRatio: 1.2,
      data: rows.map(item => ({
        ...item,
        value: Math.max(Number(item.marketCap) || 1, 1),
        itemStyle: {
          color: flowStrengthColor(item.flow),
          borderColor: "#fffaf1",
          borderWidth: 4,
          gapWidth: 4
        }
      })),
      label: {
        show: true,
        color: "#202020",
        fontWeight: 850,
        formatter: params => `${params.data.name}\n资金强度 ${params.data.flowText}\n${params.data.netFlowText}`
      },
      upperLabel: { show: false },
      levels: [
        {
          itemStyle: {
            borderColor: "#fffaf1",
            borderWidth: 4,
            gapWidth: 4
          }
        }
      ]
    }]
  };
}

function styleTimelineOption(data) {
  const rows = data.rotations || [];
  const labels = rows.map(item => item.style);
  const palette = ["#9b5f34", "#b56f2c", "#2f6d8e", "#b74b3b", "#2a8f71", "#a46b2a", "#235d82", "#ba3b2f"];
  const minYear = Math.min(...rows.map(item => Number(item.start)), 2006) - .4;
  const maxYear = Math.max(...rows.map(item => Number(item.end)), 2026) + .6;

  return {
    tooltip: {
      formatter: params => {
        const item = rows[params.dataIndex] || {};
        return `${escapeHtml(item.start)}-${escapeHtml(item.end)}<br>${escapeHtml(item.style)}`;
      }
    },
    grid: chartBaseGrid({ top: 26, right: 28, bottom: 34, left: 110 }),
    xAxis: {
      type: "value",
      min: minYear,
      max: maxYear,
      interval: 2,
      axisLabel: { formatter: value => String(Math.round(value)) },
      splitLine: { lineStyle: { color: "#eee1d0" } }
    },
    yAxis: {
      type: "category",
      data: labels,
      inverse: true,
      axisTick: { show: false },
      axisLabel: { fontWeight: 700 }
    },
    series: [{
      type: "custom",
      data: rows.map((item, index) => [Number(item.start), Number(item.end) + .95, index, item.style]),
      renderItem(params, api) {
        const categoryIndex = api.value(2);
        const start = api.coord([api.value(0), categoryIndex]);
        const end = api.coord([api.value(1), categoryIndex]);
        const height = Math.max(api.size([0, 1])[1] * .58, 18);
        const shape = echarts.graphic.clipRectByRect({
          x: start[0],
          y: start[1] - height / 2,
          width: end[0] - start[0],
          height
        }, {
          x: params.coordSys.x,
          y: params.coordSys.y,
          width: params.coordSys.width,
          height: params.coordSys.height
        });
        if (!shape) return null;
        return {
          type: "group",
          children: [
            {
              type: "rect",
              shape,
              style: {
                fill: palette[params.dataIndex % palette.length],
                opacity: .88
              }
            },
            {
              type: "text",
              style: {
                text: `${api.value(0)}-${Math.round(api.value(1) - .95)}`,
                x: shape.x + 8,
                y: shape.y + height / 2,
                fill: "#fffaf1",
                fontSize: 12,
                fontWeight: 800,
                verticalAlign: "middle"
              }
            }
          ]
        };
      }
    }]
  };
}

function flowScaleOption(data) {
  const rows = data.flowScaleRows || [];
  return {
    color: ["#ba3b2f"],
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: params => {
        const row = rows[params[0]?.dataIndex] || {};
        return `${escapeHtml(row.name)}<br>${escapeHtml(row.amountText)}<br>占比 ${escapeHtml(row.shareText)}<br>${escapeHtml(row.note)}`;
      }
    },
    grid: chartBaseGrid({ top: 12, right: 18, left: 18, bottom: 8 }),
    xAxis: { type: "value", max: 100, axisLabel: { formatter: "{value}%" }, splitLine: { lineStyle: { color: "#eee1d0" } } },
    yAxis: { type: "category", data: rows.map(item => item.name), inverse: true, axisTick: { show: false } },
    series: [{
      name: "占成交额",
      type: "bar",
      data: rows.map(item => ({
        value: Number(item.shareText?.replace("%", "")) || Number(item.width) || 0,
        itemStyle: { color: item.amountClass === "negative" ? "#087d5b" : item.amountClass === "neutral" ? "#9d927f" : "#ba3b2f" }
      })),
      barWidth: 18,
      label: {
        show: true,
        position: "right",
        formatter: params => `${rows[params.dataIndex]?.amountText || ""} · ${rows[params.dataIndex]?.shareText || ""}`
      }
    }]
  };
}

function etfRankingOption(data) {
  const rows = [...(data.etfRanking || [])].reverse();
  return {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: params => {
        const row = rows[params[0]?.dataIndex] || {};
        return `${escapeHtml(row.name)}<br>${escapeHtml(row.theme)}<br>净流入 ${escapeHtml(row.amountText)}<br>占成交 ${escapeHtml(row.shareText)}`;
      }
    },
    grid: chartBaseGrid({ top: 12, right: 42, left: 18, bottom: 22 }),
    xAxis: { type: "value", axisLabel: { formatter: "{value}亿" }, splitLine: { lineStyle: { color: "#eee1d0" } } },
    yAxis: { type: "category", data: rows.map(item => item.name), axisTick: { show: false } },
    series: [{
      type: "bar",
      data: rows.map(item => ({
        value: Number(item.amount),
        itemStyle: { color: Number(item.amount) >= 0 ? "#ba3b2f" : "#087d5b" }
      })),
      barWidth: 16,
      label: { show: true, position: "right", formatter: params => rows[params.dataIndex]?.amountText || "" }
    }]
  };
}

function industryFlowOption(data) {
  const rows = data.industryMatrix || [];
  return {
    tooltip: {
      formatter: params => {
        const row = params.data || {};
        return `${escapeHtml(row.name)}<br>行业市值 ${escapeHtml(row.marketCapText || "--")}<br>净流入 ${escapeHtml(row.amountText || "--")}<br>成交 ${escapeHtml(row.turnoverText || "--")}<br>净流入/成交 ${escapeHtml(row.ratioText || "--")}`;
      }
    },
    series: [{
      type: "treemap",
      roam: false,
      nodeClick: false,
      breadcrumb: { show: false },
      squareRatio: 1.05,
      data: rows.map(item => ({
        ...item,
        value: Math.max(Number(item.marketCap) || 1, 1),
        itemStyle: {
          color: flowAmountColor(item.amount),
          borderColor: "#fffaf1",
          borderWidth: 3,
          gapWidth: 3
        }
      })),
      label: {
        show: true,
        color: "#202020",
        fontWeight: 850,
        formatter: params => `${params.data.name}\n${params.data.amountText}`
      },
      upperLabel: { show: false }
    }]
  };
}

function styleFlowOption(data) {
  const rows = data.styleFlows || [];
  return {
    tooltip: {
      trigger: "item",
      formatter: params => {
        const item = rows[params.dataIndex] || {};
        return [
          `<strong>${escapeHtml(item.name)}</strong>`,
          `净流入：${escapeHtml(item.amountText || "--")}`,
          `资金强度：${escapeHtml(item.strengthText || "--")}`,
          `拥挤度：${escapeHtml(item.crowdingText || "--")}`,
          `成交占比：${escapeHtml(item.shareText || "--")}`,
          `估值位置：${escapeHtml(item.valuationText || "--")}`,
          escapeHtml(item.risk || "")
        ].join("<br>");
      }
    },
    grid: chartBaseGrid({ top: 34, right: 36, bottom: 42, left: 54 }),
    xAxis: {
      type: "value",
      name: "净流入（亿元）",
      splitLine: { lineStyle: { color: "#eee1d0" } },
      axisLine: { onZero: true }
    },
    yAxis: {
      type: "value",
      name: "拥挤度",
      min: 0,
      max: 100,
      axisLabel: { formatter: "{value}%" },
      splitLine: { lineStyle: { color: "#eee1d0" } }
    },
    series: [{
      type: "scatter",
      data: rows.map(item => ({
        value: [Number(item.amount), Number(item.crowding || 0)],
        symbolSize: Math.max(18, Math.min(54, Number(item.turnoverShare || 8) * 2.6)),
        itemStyle: {
          color: flowStrengthColor(item.strength),
          opacity: .86
        }
      })),
      label: {
        show: true,
        formatter: params => rows[params.dataIndex]?.name || "",
        position: "top",
        color: "#202020",
        fontWeight: 800
      },
      markLine: {
        symbol: "none",
        lineStyle: { color: "#cbbda7", type: "dashed" },
        data: [{ xAxis: 0 }, { yAxis: 70 }]
      }
    }]
  };
}

function industryCrowdingOption(data) {
  const rows = [...(data.industries || [])].sort((a, b) => Number(a.marketCap) - Number(b.marketCap));
  return {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: params => {
        const row = rows[params[0]?.dataIndex] || {};
        return `${escapeHtml(row.name)}<br>市值 ${escapeHtml(row.marketCapText)}<br>拥挤度 ${escapeHtml(row.scoreText)}<br>成交占比 ${escapeHtml(row.turnoverShareText)}<br>资金 ${escapeHtml(row.fundFlowText)}`;
      }
    },
    legend: { top: 4, data: ["行业市值", "拥挤度"] },
    grid: chartBaseGrid({ top: 44, right: 64, left: 18, bottom: 28 }),
    xAxis: [
      { type: "value", name: "万亿元", splitLine: { lineStyle: { color: "#eee1d0" } } },
      { type: "value", name: "拥挤度", max: 100, axisLabel: { formatter: "{value}%" }, splitLine: { show: false } }
    ],
    yAxis: { type: "category", data: rows.map(item => item.name), axisTick: { show: false } },
    series: [
      {
        name: "行业市值",
        type: "bar",
        data: rows.map(item => round(Number(item.marketCap) / 1000000000000)),
        barWidth: 16,
        itemStyle: { color: "#d6a351", borderRadius: [0, 8, 8, 0] },
        label: { show: true, position: "right", formatter: params => `${params.value}万亿` }
      },
      {
        name: "拥挤度",
        type: "scatter",
        xAxisIndex: 1,
        data: rows.map(item => Number(item.score)),
        symbolSize: 16,
        itemStyle: { color: "#ba3b2f" }
      }
    ]
  };
}

function crowdingRankOption(data) {
  const rows = [...(data.ranks || [])].reverse();
  return {
    tooltip: { formatter: params => `${escapeHtml(rows[params.dataIndex]?.name)}<br>${escapeHtml(rows[params.dataIndex]?.reason)}<br>拥挤度 ${escapeHtml(rows[params.dataIndex]?.scoreText)}` },
    grid: chartBaseGrid({ top: 12, right: 44, left: 18, bottom: 18 }),
    xAxis: { type: "value", max: 100, axisLabel: { formatter: "{value}%" }, splitLine: { lineStyle: { color: "#eee1d0" } } },
    yAxis: { type: "category", data: rows.map(item => item.name), axisTick: { show: false } },
    series: [{
      type: "bar",
      data: rows.map(item => ({ value: Number(item.score), itemStyle: { color: scoreColor(item.score) } })),
      barWidth: 18,
      label: { show: true, position: "right", formatter: "{c}%" }
    }]
  };
}

function breadthOption(data) {
  const breadth = data.breadth || {};
  return {
    tooltip: { trigger: "item" },
    legend: { bottom: 0 },
    series: [{
      type: "pie",
      radius: ["58%", "78%"],
      center: ["50%", "45%"],
      label: { formatter: "{b}\n{d}%" },
      data: [
        { name: "上涨", value: Number(breadth.up) || 0, itemStyle: { color: "#ba3b2f" } },
        { name: "下跌", value: Number(breadth.down) || 0, itemStyle: { color: "#087d5b" } },
        { name: "平盘", value: Number(breadth.flat) || 0, itemStyle: { color: "#b4aa9b" } }
      ]
    }]
  };
}

function clusterOption(data) {
  const rows = [...(data.fundCluster?.industries || [])].reverse();
  return {
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    grid: chartBaseGrid({ top: 10, right: 22, left: 10, bottom: 16 }),
    xAxis: { type: "value", max: 20, axisLabel: { formatter: "{value}%" }, splitLine: { lineStyle: { color: "#eee1d0" } } },
    yAxis: { type: "category", data: rows.map(item => item.name), axisTick: { show: false } },
    series: [{
      type: "bar",
      data: rows.map(item => Number(item.weight)),
      barWidth: 16,
      itemStyle: { color: "#235d82", borderRadius: [0, 8, 8, 0] },
      label: { show: true, position: "right", formatter: "{c}%" }
    }]
  };
}

function crowdingHistoryOption(data) {
  const rows = data.history || [];
  return {
    tooltip: { trigger: "axis", valueFormatter: value => `${value}%` },
    grid: chartBaseGrid({ top: 28, right: 24, bottom: 30 }),
    xAxis: { type: "category", data: rows.map(item => item.date) },
    yAxis: { type: "value", min: 0, max: 100, axisLabel: { formatter: "{value}%" }, splitLine: { lineStyle: { color: "#eee1d0", type: "dashed" } } },
    series: [{
      name: "主线拥挤度",
      type: "line",
      smooth: .22,
      data: rows.map(item => Number(item.score)),
      areaStyle: { color: "rgba(186, 59, 47, .12)" },
      lineStyle: { width: 3, color: "#ba3b2f" },
      itemStyle: { color: "#ba3b2f" },
      markArea: {
        silent: true,
        label: { color: "#5f554a" },
        data: [
          [{ yAxis: 80, name: "高拥挤：回撤风险高" }, { yAxis: 100 }],
          [{ yAxis: 50, name: "趋势拥挤：主线持续但需跟踪" }, { yAxis: 80 }],
          [{ yAxis: 0, name: "低拥挤：交易不集中" }, { yAxis: 50 }]
        ],
        itemStyle: { color: "rgba(210, 99, 34, .08)" }
      },
      markLine: {
        symbol: "none",
        lineStyle: { type: "dashed" },
        data: [{ yAxis: 80, name: "高拥挤线" }, { yAxis: 50, name: "中性线" }]
      }
    }]
  };
}

function dividendOption(stock) {
  const values = (stock.trend || []).map(Number);
  const currentYear = 2026;
  const labels = values.map((_, index) => `${currentYear - values.length + index + 1}`);
  return {
    grid: { top: 16, right: 6, bottom: 20, left: 6 },
    tooltip: { trigger: "axis", valueFormatter: value => `${Number(value).toFixed(1)}%` },
    xAxis: { type: "category", data: labels, axisLine: { show: false }, axisTick: { show: false }, axisLabel: { color: "#8a8174", fontSize: 10 } },
    yAxis: { type: "value", show: false },
    series: [{
      type: "line",
      data: values,
      smooth: .26,
      symbolSize: 6,
      lineStyle: { width: 3, color: holdColor(stock.holdScore) },
      itemStyle: { color: holdColor(stock.holdScore) },
      areaStyle: { color: `${holdColor(stock.holdScore)}22` },
      label: { show: true, position: "top", formatter: "{c}%", fontSize: 10, color: "#70685c" }
    }]
  };
}

function scoreColor(value) {
  const num = Number(value);
  if (num >= 85) return "#ba3b2f";
  if (num >= 70) return "#d26322";
  if (num >= 45) return "#235d82";
  return "#087d5b";
}

function flowStrengthColor(value) {
  const num = Number(value);
  if (num >= 80) return "#ba3b2f";
  if (num >= 65) return "#d26322";
  if (num >= 45) return "#d6a351";
  if (num >= 30) return "#8ab7a4";
  return "#087d5b";
}

function flowAmountColor(value) {
  const num = Number(value);
  if (num >= 12) return "#ba3b2f";
  if (num >= 5) return "#d26322";
  if (num > 0) return "#d6a351";
  if (num > -5) return "#d7c8ae";
  if (num > -12) return "#7bb39e";
  return "#087d5b";
}

function holdSignal(stock) {
  const dividend = Number(stock.dividendYield) || 0;
  const payout = Number(stock.payout) || 0;
  const pe = Number(stock.pe) || 99;
  const issuePenalty = stock.issueRisk === "低" ? 0 : stock.issueRisk === "中" ? 8 : 16;
  const score = Math.max(0, Math.min(100,
    dividend * 10 +
    (payout >= 30 && payout <= 75 ? 18 : 8) +
    (pe <= 8 ? 20 : pe <= 12 ? 14 : pe <= 20 ? 8 : 2) -
    issuePenalty
  ));
  if (score >= 78) return { score, label: "值得持有", className: "hold-hot" };
  if (score >= 58) return { score, label: "可观察", className: "hold-warm" };
  return { score, label: "谨慎", className: "hold-cool" };
}

function holdColor(score) {
  const num = Number(score);
  if (num >= 78) return "#ba3b2f";
  if (num >= 58) return "#d6a351";
  return "#087d5b";
}

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

function renderSectionHead(title, note = "") {
  return `
    <div class="section-title-row">
      <div>
        <h2>${safeText(title)}</h2>
        ${note ? `<p>${safeText(note)}</p>` : ""}
      </div>
    </div>
  `;
}

function renderSectionUpdated(updatedAtText, usingDemo = false) {
  return `
    <footer class="section-updated">
      ${usingDemo ? "<span>演示数据</span>" : ""}
      <span>更新 ${safeText(updatedAtText)}</span>
    </footer>
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
    <section class="section-block overview-strip-section">
      ${renderSectionHead("主要指数风格", "A股宽基、科创，美股核心和港股科技的当前点位、涨跌幅与市场风格")}
      <div class="market-style-strip">
        ${data.markets.map(item => `
          <a href="#/history/${safeText(item.id)}">
            <div>
              <strong>${safeText(item.name)}</strong>
              <span>${safeText(item.code)}</span>
            </div>
            <em class="${item.changeClass}">${safeText(item.changePctText)}</em>
            <small>${safeText(item.style)}</small>
          </a>
        `).join("")}
      </div>
      ${renderSectionUpdated(data.updatedAtText, data.usingDemo)}
    </section>

    <section class="section-block overview-card-section">
      ${renderSectionHead("指数温度卡片", "点击卡片查看该指数 10 年月度市值、营收、PE 和巴菲特指标")}
      <div class="temperature-card-grid">
        ${data.markets.map(renderTemperatureCard).join("")}
      </div>
      ${renderSectionUpdated(data.updatedAtText, data.usingDemo)}
    </section>
  `;
}

function renderMarketStyle(data) {
  return `
    <section class="section-block style-mainline-section">
      ${renderSectionHead(`当前主线是${data.mainline.name}`, "先给结论，再看资金、拥挤和历史风格证据")}
      <div class="style-mainline-layout">
        <article class="style-mainline-card">
          <span>当前主线</span>
          <strong>${safeText(data.mainline.name)}</strong>
          <p>${safeText(data.mainline.verdict)}</p>
        </article>
        <div class="style-mainline-metrics">
          <div><span>主线热度</span><strong>${safeText(data.mainline.scoreText)}</strong></div>
          <div><span>净流入</span><strong class="${data.mainline.netFlowClass}">${safeText(data.mainline.netFlowText)}</strong></div>
          <div><span>成交占比</span><strong>${safeText(data.mainline.turnoverShareText)}</strong></div>
          <div><span>拥挤度</span><strong>${safeText(data.mainline.crowdingText)}</strong></div>
        </div>
        <div class="style-mainline-reasons">
          ${data.mainline.reasons.map(reason => `<span>${safeText(reason)}</span>`).join("")}
        </div>
      </div>
      ${renderSectionUpdated(data.updatedAtText, data.usingDemo)}
    </section>

    <section class="section-block style-heatmap-section">
      ${renderSectionHead("风格热力图", "10 大市场风格：资金强度、拥挤度、估值位置、市场广度综合观察")}
      <div class="echart style-heatmap-chart" data-chart="style-heatmap"></div>
      <div class="style-catalog-grid">
        ${data.styles.map(item => `
          <article>
            <header>
              <strong>${safeText(item.name)}</strong>
              <span class="${item.heatLevelClass}">${safeText(item.heatText)}</span>
            </header>
            <p>${safeText(item.industries)}</p>
            <footer>
              <span class="${item.netFlowClass}">${safeText(item.netFlowText)}</span>
              <span>${safeText(item.risk)}</span>
            </footer>
          </article>
        `).join("")}
      </div>
      ${renderSectionUpdated(data.updatedAtText, data.usingDemo)}
    </section>

    <section class="section-block style-timeline-section">
      ${renderSectionHead("历史风格轮动时间轴", "用历史主线作为参照，避免把短期交易误判成长期风格")}
      <div class="echart style-timeline-chart" data-chart="style-timeline"></div>
      ${renderSectionUpdated(data.updatedAtText, data.usingDemo)}
    </section>

    <section class="section-block style-evidence-section">
      ${renderSectionHead("钱在交易什么，这个方向是否拥挤", "把资金流向和拥挤度放在一起看：先看资金强度，再判断是否已经过热")}
      <div class="style-evidence-grid">
        <article class="panel module-card wide flow-context-mini">
          <div class="section-head"><h2>资金盘子与净流向</h2><span>净流入 / 今日成交额</span></div>
          <div class="flow-hero compact">
            <div class="flow-summary">
              <p>${safeText(data.summary)}</p>
              <div class="flow-kpi-grid">
                <div><span>全市场成交额</span><strong>${safeText(data.turnoverText)}</strong></div>
                <div><span>主线净流入</span><strong class="${data.marketNetClass}">${safeText(data.marketNetText)}</strong></div>
                <div><span>净流入 / 成交额</span><strong class="${data.marketNetClass}">${safeText(data.marketNetRatioText)}</strong></div>
              </div>
            </div>
            <div class="echart flow-scale-chart" data-chart="flow-scale"></div>
          </div>
          ${renderSectionUpdated(data.updatedAtText, data.usingDemo)}
        </article>
        <article class="panel module-card">
          <div class="section-head"><h2>ETF资金流向排行榜</h2><span>净申赎与成交额占比</span></div>
          <div class="echart etf-ranking-chart" data-chart="etf-ranking"></div>
          ${renderSectionUpdated(data.updatedAtText, data.usingDemo)}
        </article>
        <article class="panel module-card">
          <div class="section-head"><h2>行业资金流</h2><span>31个行业，面积按市值，颜色按流入流出</span></div>
          <div class="echart industry-flow-chart" data-chart="industry-flow"></div>
          ${renderSectionUpdated(data.updatedAtText, data.usingDemo)}
        </article>
        <article class="panel module-card wide">
          <div class="section-head"><h2>10大风格流向</h2><span>横轴净流入，纵轴拥挤度，气泡大小表示成交占比</span></div>
          <div class="echart style-flow-chart" data-chart="style-flow"></div>
          ${renderSectionUpdated(data.updatedAtText, data.usingDemo)}
        </article>
        <article class="panel module-card wide">
          <div class="section-head"><h2>行业规模与拥挤度</h2><span>行业市值 / 拥挤分位</span></div>
          <div class="echart industry-crowding-chart" data-chart="industry-crowding"></div>
          ${renderSectionUpdated(data.updatedAtText, data.usingDemo)}
        </article>
        <article class="panel module-card">
          <div class="section-head"><h2>拥挤度排行榜</h2><span>成交、估值和资金热度</span></div>
          <div class="echart crowding-rank-chart" data-chart="crowding-rank"></div>
          ${renderSectionUpdated(data.updatedAtText, data.usingDemo)}
        </article>
        <article class="panel module-card breadth-card">
          <div class="section-head"><h2>市场广度</h2><span>上涨 / 下跌家数</span></div>
          <div class="echart breadth-chart" data-chart="breadth"></div>
          <div class="breadth-counts">
            <span>上涨 <strong class="positive">${safeText(data.crowding.breadth.upText)}</strong></span>
            <span>下跌 <strong class="negative">${safeText(data.crowding.breadth.downText)}</strong></span>
            <span>指数 <strong class="${data.crowding.breadth.indexClass}">${safeText(data.crowding.breadth.indexText)}</strong></span>
          </div>
          <p>${safeText(data.crowding.breadth.note)}</p>
          ${renderSectionUpdated(data.updatedAtText, data.usingDemo)}
        </article>
        <article class="panel module-card">
          <div class="section-head"><h2>基金抱团</h2><span>重仓股 / 行业集中度</span></div>
          <div class="cluster-score">
            <strong>${safeText(data.crowding.fundCluster.concentrationText)}</strong>
            <span>Top 行业集中度</span>
          </div>
          <div class="tag-row cluster-tags">
            ${data.crowding.fundCluster.topStocks.map(name => `<span>${safeText(name)}</span>`).join("")}
          </div>
          <div class="echart cluster-chart" data-chart="cluster"></div>
          ${renderSectionUpdated(data.updatedAtText, data.usingDemo)}
        </article>
        <article class="panel module-card wide">
          <div class="section-head"><h2>拥挤历史</h2><span>主线交易拥挤度，越高代表越容易出现回撤或风格切换</span></div>
          <p class="chart-explain">这条线用于判断当前主线是不是已经被过度交易：80% 以上是高拥挤区，50%-80% 是趋势拥挤区，50% 以下说明交易还不算集中。</p>
          <div class="echart crowding-history-chart" data-chart="crowding-history"></div>
          ${renderSectionUpdated(data.updatedAtText, data.usingDemo)}
        </article>
      </div>
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
  if (id === "market-style") return demoMarketStyle;
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

function renderValueInvesting(data) {
  return `
    <section class="section-block value-intro-section">
      ${renderSectionHead("大蓝筹股息观察", "固定观察 A 股股息票，先看股息率，再看派息率、增发风险和重大利空")}
      <article class="summary-card">${safeText(data.summary)}</article>
      ${renderSectionUpdated(data.updatedAtText, data.usingDemo)}
    </section>
    <section class="section-block value-list-section">
      <div class="value-stock-grid">
        ${data.stocks.map((item, index) => `
          <a class="value-stock-card ${item.holdClass}" href="${escapeAttr(stockQuoteUrl(item.code))}" target="_blank" rel="noopener noreferrer" aria-label="查看${safeText(item.name)}东方财富行情页">
            <header>
              <div>
                <h2>${safeText(item.name)}</h2>
                <span>${safeText(item.code)}</span>
              </div>
              <div class="value-card-right">
                <strong>${safeText(item.dividendYieldText)}</strong>
                <em>${safeText(item.holdLabel)}</em>
              </div>
            </header>
            ${renderDividendSpark(item.trend, index)}
            <dl>
              <div><dt>PE</dt><dd>${safeText(item.peText)}</dd></div>
              <div><dt>派息率</dt><dd>${safeText(item.payoutText)}</dd></div>
              <div><dt>增发风险</dt><dd>${safeText(item.issueRisk)}</dd></div>
            </dl>
            <footer>${safeText(item.badNews)}</footer>
          </a>
        `).join("")}
      </div>
      ${renderSectionUpdated(data.updatedAtText, data.usingDemo)}
    </section>
  `;
}

function renderDividendSpark(points, index) {
  return `
    <div class="echart dividend-spark" data-chart="dividend" data-stock-index="${safeText(index)}" aria-label="近五年股息率变化"></div>
  `;
}

function renderHistory(data) {
  const series = buildHistorySeries(data.points);
  const market = data.market || {};
  return `
    <article class="history-dashboard-card">
      <a class="history-back-link" href="#/overview">返回市场温度</a>
      <h2 class="history-dashboard-title">${safeText(market.name)}：市值 / 营收 / PE / 巴菲特指标趋势图</h2>
      ${renderHistoryStatStrip(series)}
      <div class="chart-wrap history-main-wrap">
        <div class="echart history-main-chart" data-chart="history-main"></div>
      </div>
      ${renderSectionUpdated(data.updatedAtText, data.usingDemo)}
    </article>
    <section class="history-subchart-grid">
      <article class="history-dashboard-card">
        <h2 class="subchart-title">PE 估值分位（TTM）</h2>
        <div class="echart history-subchart" data-chart="pe-percentile"></div>
        ${renderSectionUpdated(data.updatedAtText, data.usingDemo)}
      </article>
      <article class="history-dashboard-card">
        <h2 class="subchart-title">营收增速（TTM）与市值增速（TTM）</h2>
        <div class="echart history-subchart" data-chart="growth-compare"></div>
        ${renderSectionUpdated(data.updatedAtText, data.usingDemo)}
      </article>
    </section>
    <section class="history-info-grid">
      <article>
        <strong>指标说明</strong>
        <span>PE（TTM）：市盈率，月度采样</span>
        <span>巴菲特指标：指数总市值 / GDP 口径估算</span>
      </article>
      <article>
        <strong>当前状态（示意）</strong>
        ${renderHistoryState(series)}
      </article>
      <article>
        <strong>数据来源</strong>
        <span>市值：${safeText(market.marketCapSource)}</span>
        <span>PE：${safeText(market.peSource)}</span>
      </article>
    </section>
  `;
}

function buildHistorySeries(points) {
  const raw = (Array.isArray(points) ? points : [])
    .filter(item => item.marketCap != null || item.peTtm != null);
  const pes = raw.map(item => Number(item.peTtm)).filter(Number.isFinite);
  const peMin = Math.min(...pes, 0);
  const peMax = Math.max(...pes, 1);

  const list = raw.map((item, index) => {
    const progress = raw.length > 1 ? index / (raw.length - 1) : 1;
    const marketCapT = Number(item.marketCap) / 1000000000000;
    const pe = Number(item.peTtm);
    const wave = Math.sin(progress * Math.PI * 4.2) * .03 + Math.cos(progress * Math.PI * 2.1) * .02;
    const revenueT = Math.max(0, marketCapT * (.68 + progress * .08 + wave));
    const rawPercentile = Number(item.pePercentile);
    const pePercentile = Number.isFinite(rawPercentile)
      ? rawPercentile
      : Math.max(1, Math.min(99, (pe - peMin) / Math.max(peMax - peMin, 1) * 100));

    return {
      date: item.date,
      marketCapT,
      revenueT,
      pe,
      pePercentile,
      buffett: Math.max(15, Math.min(120, 32 + pePercentile * .78 + wave * 120)),
      revenueGrowth: null,
      capGrowth: null
    };
  });

  return list.map((item, index) => {
    const prev = list[index - 12];
    if (!prev) return item;
    return {
      ...item,
      revenueGrowth: prev.revenueT ? (item.revenueT / prev.revenueT - 1) * 100 : null,
      capGrowth: prev.marketCapT ? (item.marketCapT / prev.marketCapT - 1) * 100 : null
    };
  });
}

function renderHistoryStatStrip(series) {
  const latest = series[series.length - 1] || {};
  const stats = [
    ["最新日期", latest.date || "--"],
    ["总市值", `${fixed(latest.marketCapT, 1)} 万亿`],
    ["总营收（TTM）", `${fixed(latest.revenueT, 1)} 万亿`],
    ["PE（TTM）", `${fixed(latest.pe, 1)} 倍`, "negative"],
    ["巴菲特指标", `${fixed(latest.buffett, 1)} %`, "positive"],
    ["营收同比增速（TTM）", pct(latest.revenueGrowth, 1)]
  ];

  return `
    <div class="history-stat-strip">
      ${stats.map(([label, value, className]) => `
        <div>
          <span>${safeText(label)}</span>
          <strong class="${safeText(className || "")}">${safeText(value)}</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function renderHistoryState(series) {
  const latest = series[series.length - 1] || {};
  const items = [
    ["PE", latest.pePercentile < 40 ? "处于合理偏低区间" : latest.pePercentile > 80 ? "处于高估拥挤区间" : "处于中等区间"],
    ["巴菲特指标", latest.buffett > 80 ? "处于偏高水平" : "处于中性水平"],
    ["营收增速", latest.revenueGrowth > 0 ? "稳健增长" : "需要观察"],
    ["市值增速", latest.capGrowth > 10 ? "温和回升" : "弱于趋势"]
  ];

  return items.map(([name, value]) => `<span>✓ ${safeText(name)}：${safeText(value)}</span>`).join("");
}

function normalizeMarketStyle(payload) {
  const data = payload || {};
  const flow = normalizeFundFlow(data.fundFlow || demoFundFlow);
  const crowding = normalizeCrowding(data.crowding || demoCrowding);
  const styles = Array.isArray(data.styles) ? data.styles : [];
  const maxFlow = Math.max(...styles.map(item => Math.abs(Number(item.netFlow) || 0)), 1);
  const normalizedStyles = styles.map(item => ({
    ...item,
    heatText: ratioLabel(item.heat),
    flowText: ratioLabel(item.flow),
    crowdingText: ratioLabel(item.crowding),
    valuationText: ratioLabel(item.valuation),
    breadthText: ratioLabel(item.breadth),
    netFlowText: `${Number(item.netFlow) > 0 ? "+" : ""}${fixed(item.netFlow, 1)}亿`,
    netFlowClass: changeClass(item.netFlow),
    turnoverShareText: ratioLabel(item.turnoverShare),
    heatLevelClass: levelClass(item.heat),
    heatWidth: barWidth(item.heat, 100),
    flowWidth: barWidth(Math.abs(item.netFlow), maxFlow)
  }));
  const strongest = normalizedStyles.reduce((best, item) => Number(item.heat) > Number(best.heat || 0) ? item : best, normalizedStyles[0] || {});
  const mainline = {
    ...(data.mainline || {}),
    name: data.mainline?.name || strongest.name || "--",
    scoreText: ratioLabel(data.mainline?.score ?? strongest.heat),
    netFlowText: `${Number(data.mainline?.netFlow ?? strongest.netFlow) > 0 ? "+" : ""}${fixed(data.mainline?.netFlow ?? strongest.netFlow, 1)}亿`,
    netFlowClass: changeClass(data.mainline?.netFlow ?? strongest.netFlow),
    turnoverShareText: ratioLabel(data.mainline?.turnoverShare ?? strongest.turnoverShare),
    crowdingText: ratioLabel(data.mainline?.crowding ?? strongest.crowding),
    reasons: Array.isArray(data.mainline?.reasons) ? data.mainline.reasons : []
  };
  const styleFlows = normalizedStyles.map(item => ({
    name: item.name,
    amount: item.netFlow,
    strength: item.flow,
    crowding: item.crowding,
    valuation: item.valuation,
    turnoverShare: item.turnoverShare,
    risk: item.risk,
    amountText: item.netFlowText,
    amountClass: item.netFlowClass,
    strengthText: item.flowText,
    crowdingText: item.crowdingText,
    valuationText: item.valuationText,
    shareText: item.turnoverShareText
  }));

  return {
    ...flow,
    source: data.source || "service",
    usingDemo: data.source === "demo",
    demoReason: data.demoReason || "",
    updatedAtText: dateText(data.updatedAt),
    mainline,
    styles: normalizedStyles,
    rotations: Array.isArray(data.rotations) ? data.rotations : [],
    styleFlows,
    crowding
  };
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
      style: item.style,
      status: item.status || levelText(item.pePercentile),
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
  const turnoverTotal = Number(data.turnover?.total || 0);
  const marketNetFlow = Number(data.marketNetFlow || 0);
  const etfRanking = Array.isArray(data.etfRanking) ? data.etfRanking : [];
  const styleFlows = Array.isArray(data.styleFlows) ? data.styleFlows : [];
  const etfNetFlow = etfRanking.reduce((sum, item) => sum + (Number(item.amount) || 0) * 100000000, 0);
  const northboundToday = Number(data.northbound?.today || 0) * 100000000;
  const styleNetFlow = styleFlows.reduce((sum, item) => sum + (Number(item.amount) || 0) * 100000000, 0);
  const scaleMax = Math.max(turnoverTotal, Math.abs(marketNetFlow), Math.abs(etfNetFlow), Math.abs(northboundToday), 1);
  const etfMax = Math.max(...etfRanking.map(item => Math.abs(Number(item.amount) || 0)), 1);
  const matrixMax = Math.max(...(data.industryMatrix || []).map(item => Math.abs(Number(item.amount) || 0)), 1);
  return {
    source: data.source || "service",
    usingDemo: data.source === "demo",
    demoReason: data.demoReason || "",
    updatedAtText: dateText(data.updatedAt),
    summary: data.summary || "",
    turnoverText: turnoverMoney(turnoverTotal, "CNY"),
    marketNetText: flowMoney(marketNetFlow, "CNY"),
    marketNetClass: changeClass(marketNetFlow),
    marketNetRatioText: ratioLabel(turnoverTotal ? marketNetFlow / turnoverTotal * 100 : null),
    flowScaleRows: [
      { name: "全市场成交额", amount: turnoverTotal, note: "今日资金总盘子", amountText: turnoverMoney(turnoverTotal, "CNY"), shareText: "100%", amountClass: "neutral" },
      { name: "主线净流入", amount: marketNetFlow, note: "相对成交额判断是否有效", amountText: flowMoney(marketNetFlow, "CNY"), shareText: ratioLabel(turnoverTotal ? marketNetFlow / turnoverTotal * 100 : null), amountClass: changeClass(marketNetFlow) },
      { name: "ETF榜前净流入", amount: etfNetFlow, note: "宽基和主题 ETF 的合计净申购", amountText: flowMoney(etfNetFlow, "CNY"), shareText: ratioLabel(turnoverTotal ? etfNetFlow / turnoverTotal * 100 : null), amountClass: changeClass(etfNetFlow) },
      { name: "北向净买入", amount: northboundToday, note: "陆股通当日净买入", amountText: flowMoney(northboundToday, "CNY"), shareText: ratioLabel(turnoverTotal ? northboundToday / turnoverTotal * 100 : null), amountClass: changeClass(northboundToday) }
    ].map(item => ({
      ...item,
      width: item.name === "全市场成交额"
        ? 100
        : Math.max(Math.abs(item.amount) / scaleMax * 100, 4).toFixed(1)
    })),
    etfRanking: etfRanking.map(item => {
      const amountYuan = (Number(item.amount) || 0) * 100000000;
      return {
        ...item,
        amountText: `${Number(item.amount) > 0 ? "+" : ""}${fixed(item.amount, 1)}亿`,
        amountClass: changeClass(item.amount),
        shareText: ratioLabel(turnoverTotal ? amountYuan / turnoverTotal * 100 : null),
        width: barWidth(Math.abs(item.amount), etfMax)
      };
    }),
    industryMatrix: (data.industryMatrix || []).map(item => {
      const amount = Number(item.amount) || 0;
      const turnover = Number(item.turnover) || 0;
      return {
        ...item,
        amountText: `${amount > 0 ? "+" : ""}${fixed(amount, 1)}亿`,
        amountClass: changeClass(amount),
        marketCapText: money(item.marketCap, "CNY"),
        turnoverText: turnover ? `${fixed(turnover, 1)}亿` : "--",
        ratioText: ratioLabel(turnover ? amount / turnover * 100 : null),
        heatClass: amount >= 0 ? "heat-in" : "heat-out",
        heat: Math.max(Math.abs(amount) / matrixMax, .18).toFixed(2)
      };
    }),
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
    styleFlows: styleFlows.map(item => {
      const amountYuan = (Number(item.amount) || 0) * 100000000;
      return {
        ...item,
        amountText: `${Number(item.amount) > 0 ? "+" : ""}${fixed(item.amount, 1)}亿`,
        amountClass: changeClass(item.amount),
        strengthText: ratioLabel(item.strength),
        shareText: ratioLabel(turnoverTotal ? amountYuan / turnoverTotal * 100 : null)
      };
    }),
    styleNetText: flowMoney(styleNetFlow, "CNY"),
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
  const industryCapMax = Math.max(...(data.industries || []).map(item => Number(item.marketCap) || 0), 1);
  return {
    source: data.source || "service",
    usingDemo: data.source === "demo",
    demoReason: data.demoReason || "",
    updatedAtText: dateText(data.updatedAt),
    industries: (data.industries || []).map(item => ({
      ...item,
      marketCapText: money(item.marketCap, "CNY"),
      capWidth: barWidth(item.marketCap, industryCapMax),
      scoreText: ratioLabel(item.score),
      levelClass: levelClass(item.score),
      turnoverShareText: ratioLabel(item.turnoverShare),
      fundFlowText: `${Number(item.fundFlow) > 0 ? "+" : ""}${fixed(item.fundFlow, 1)}亿`,
      fundFlowClass: changeClass(item.fundFlow),
      valuationText: ratioLabel(item.valuationPercentile)
    })),
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
    stocks: (data.stocks || []).map(item => {
      const hold = holdSignal(item);
      return {
        ...item,
        dividendYieldText: ratioLabel(item.dividendYield),
        payoutText: ratioLabel(item.payout),
        peText: `${fixed(item.pe, 1)}x`,
        trend: item.trend || [],
        holdScore: hold.score,
        holdLabel: hold.label,
        holdClass: hold.className
      };
    })
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

function turnoverMoney(value, currency) {
  const num = Number(value);
  if (!Number.isFinite(num)) return "--";
  if (currency === "USD") return `${(num / 1000000000000).toFixed(2)}万亿美元`;
  if (currency === "HKD") return `${(num / 1000000000000).toFixed(2)}万亿港元`;
  return `${(num / 1000000000000).toFixed(2)}万亿元`;
}

function stockQuoteUrl(code) {
  const value = String(code || "").toUpperCase();
  const symbol = value.split(".")[0];
  if (/^\d{6}$/.test(symbol)) {
    if (value.endsWith(".SH") || symbol.startsWith("6")) return `https://quote.eastmoney.com/sh${symbol}.html`;
    if (value.endsWith(".SZ") || /^[03]/.test(symbol)) return `https://quote.eastmoney.com/sz${symbol}.html`;
  }
  return "https://quote.eastmoney.com/";
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
