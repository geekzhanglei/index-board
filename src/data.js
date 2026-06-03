export const API_BASE_URL =
  window.__INDEX_BOARD_CONFIG__?.apiBaseUrl || "https://api.feroad.com";

export const ENABLE_DEMO_FALLBACK =
  window.__INDEX_BOARD_CONFIG__?.enableDemoFallback !== false;

const overview = {
  source: "demo",
  updatedAt: "2026-06-01T18:00:00+08:00",
  heat: {
    score: 62,
    label: "中性偏热",
    summary: "大盘指数估值多数处于中位附近，成长风格 PE 和成交占比更高，港美市场估值偏热。"
  },
  signals: [
    { id: "valuation", label: "估值", value: "中位偏上" },
    { id: "liquidity", label: "流动性", value: "资金分化" },
    { id: "crowding", label: "拥挤度", value: "成长偏高" }
  ],
  markets: [
    {
      id: "csi300",
      code: "000300.SH",
      name: "沪深300",
      region: "A股",
      close: 4844.26,
      changePct: -0.98,
      peTtm: 16.1,
      pePercentile: 58,
      marketCap: 55439553622422,
      marketCapChangePct: 15.8,
      currency: "CNY"
    },
    {
      id: "csi800",
      code: "000906.SH",
      name: "中证800",
      region: "A股",
      close: 5431.52,
      changePct: -0.99,
      peTtm: 16.6,
      pePercentile: 61,
      marketCap: 73934268165916,
      marketCapChangePct: 13.4,
      currency: "CNY"
    },
    {
      id: "csi1000",
      code: "000852.SH",
      name: "中证1000",
      region: "A股",
      close: 8345.13,
      changePct: -0.76,
      peTtm: 35.4,
      pePercentile: 72,
      marketCap: 16377616426542,
      marketCapChangePct: 9.7,
      currency: "CNY"
    },
    {
      id: "star50",
      code: "000688.SH",
      name: "科创50",
      region: "A股",
      close: 1086.43,
      changePct: 1.86,
      peTtm: 48.2,
      pePercentile: 76,
      marketCap: 6400000000000,
      marketCapChangePct: 22.4,
      currency: "CNY"
    },
    {
      id: "hsi",
      code: "HSI.HK",
      name: "港股",
      region: "港股",
      close: 25920.4,
      changePct: 0.42,
      peTtm: 12.7,
      pePercentile: 66,
      marketCap: 41500000000000,
      marketCapChangePct: 19.3,
      currency: "HKD"
    },
    {
      id: "nasdaq",
      code: "COMP.US",
      name: "纳斯达克",
      region: "美股",
      close: 26293.1,
      changePct: 0,
      peTtm: 30,
      pePercentile: 80,
      marketCap: 33000000000000,
      marketCapChangePct: 24.1,
      currency: "USD"
    },
    {
      id: "sp500",
      code: "SPX.US",
      name: "标普500",
      region: "美股",
      close: 7580.06,
      changePct: 0.22,
      peTtm: 28.45,
      pePercentile: 82,
      marketCap: 67799545340000,
      marketCapChangePct: 21.9,
      currency: "USD"
    }
  ],
  marketCapSeries: [
    {
      id: "csi300",
      name: "沪深300",
      currency: "CNY",
      points: [
        { date: "2025-06", value: 47800000000000 },
        { date: "2025-09", value: 51500000000000 },
        { date: "2025-12", value: 53100000000000 },
        { date: "2026-03", value: 54800000000000 },
        { date: "2026-06", value: 55439553622422 }
      ]
    },
    {
      id: "csi1000",
      name: "中证1000",
      currency: "CNY",
      points: [
        { date: "2025-06", value: 14930000000000 },
        { date: "2025-09", value: 16100000000000 },
        { date: "2025-12", value: 17100000000000 },
        { date: "2026-03", value: 15820000000000 },
        { date: "2026-06", value: 16377616426542 }
      ]
    },
    {
      id: "sp500",
      name: "标普500",
      currency: "USD",
      points: [
        { date: "2025-06", value: 55600000000000 },
        { date: "2025-09", value: 60500000000000 },
        { date: "2025-12", value: 64100000000000 },
        { date: "2026-03", value: 65300000000000 },
        { date: "2026-06", value: 67799545340000 }
      ]
    }
  ]
};

const fundFlow = {
  source: "demo",
  updatedAt: "2026-06-01T18:00:00+08:00",
  summary: "北向和宽基 ETF 净流入互有分化，创业成长方向承接更强，周期板块流出。",
  flows: [
    {
      id: "northbound",
      name: "北向资金",
      description: "陆股通当日净买入",
      amount: 3860000000,
      ratio: 0.42,
      currency: "CNY"
    },
    {
      id: "broad-etf",
      name: "宽基 ETF",
      description: "主要宽基 ETF 估算净申购",
      amount: 1280000000,
      ratio: 0.18,
      currency: "CNY"
    },
    {
      id: "hk-connect",
      name: "南向资金",
      description: "港股通当日净买入",
      amount: 5120000000,
      ratio: 0.58,
      currency: "HKD"
    }
  ],
  industryFlows: [
    { id: "ai", name: "AI算力", amount: 2260000000, currency: "CNY", heat: "持续流入" },
    { id: "dividend", name: "红利低波", amount: 880000000, currency: "CNY", heat: "温和流入" },
    { id: "new-energy", name: "新能源", amount: -950000000, currency: "CNY", heat: "分歧流出" },
    { id: "broker", name: "非银金融", amount: -1420000000, currency: "CNY", heat: "资金撤出" }
  ]
};

const crowding = {
  source: "demo",
  updatedAt: "2026-06-01T18:00:00+08:00",
  score: {
    value: 68,
    label: "偏热但未极端",
    summary: "成交额和估值分位抬升，抱团集中度尚未达到极端风险区。"
  },
  indicators: [
    {
      id: "pe-percentile",
      name: "宽基 PE 分位",
      value: 68,
      valueText: "68%",
      percentile: 68,
      description: "主要宽基指数 PE 历史分位中位数。"
    },
    {
      id: "turnover",
      name: "成交额分位",
      value: 76,
      valueText: "76%",
      percentile: 76,
      description: "近一年成交额在五年历史区间的位置。"
    },
    {
      id: "concentration",
      name: "前十权重集中度",
      value: 72,
      valueText: "72%",
      percentile: 72,
      description: "核心指数前十大权重股集中度。"
    },
    {
      id: "margin",
      name: "两融热度",
      value: 59,
      valueText: "中性",
      percentile: 59,
      description: "融资余额相对流通市值的位置。"
    }
  ]
};

const historySeeds = {
  csi300: { cap: 55439553622422, pe: 16.1, name: "沪深300", code: "000300.SH", currency: "CNY" },
  csi800: { cap: 73934268165916, pe: 16.6, name: "中证800", code: "000906.SH", currency: "CNY" },
  csi1000: { cap: 16377616426542, pe: 35.4, name: "中证1000", code: "000852.SH", currency: "CNY" },
  star50: { cap: 6400000000000, pe: 48.2, name: "科创50", code: "000688.SH", currency: "CNY" },
  hsi: { cap: 41500000000000, pe: 12.7, name: "港股", code: "HSI.HK", currency: "HKD" },
  hstech: { cap: 9300000000000, pe: 22.5, name: "恒生科技", code: "HSTECH.HK", currency: "HKD" },
  nasdaq: { cap: 33000000000000, pe: 30, name: "纳斯达克", code: "COMP.US", currency: "USD" },
  sp500: { cap: 67799545340000, pe: 28.45, name: "标普500", code: "SPX.US", currency: "USD" }
};

function buildHistoryPayload(id) {
  const seed = historySeeds[id] || historySeeds.csi300;
  const points = [];
  const now = new Date("2026-06-01T00:00:00+08:00");
  const startCap = seed.cap * 0.52;
  const startPe = seed.pe * 0.76;

  for (let i = 0; i <= 120; i++) {
    const date = new Date(now);
    date.setMonth(date.getMonth() - (120 - i));
    const progress = i / 120;
    const cycle = Math.sin(progress * Math.PI * 4.4) * 0.09 + Math.cos(progress * Math.PI * 2.2) * 0.06;
    const drawdown = Math.sin((progress - 0.18) * Math.PI * 7) * 0.045;
    points.push({
      date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`,
      marketCap: startCap + (seed.cap - startCap) * progress + seed.cap * (cycle + drawdown),
      peTtm: Math.max(5, startPe + (seed.pe - startPe) * progress + seed.pe * cycle * 0.72),
      pePercentile: Math.max(1, Math.min(99, Math.round(45 + progress * 34 + cycle * 180)))
    });
  }

  return {
    source: "demo",
    updatedAt: "2026-06-01T18:00:00+08:00",
    market: {
      id,
      code: seed.code,
      name: seed.name,
      currency: seed.currency,
      peType: "ttm",
      marketCapSource: "demo-monthly",
      peSource: "demo-monthly"
    },
    points
  };
}

const mockPayloads = {
  "/blogapi/market/overview": overview,
  "/blogapi/market/fund-flow": fundFlow,
  "/blogapi/market/crowding": crowding
};

export function getMockPayload(path, data = {}) {
  if (path === "/blogapi/market/history") {
    return buildHistoryPayload(data.id || "csi300");
  }
  return mockPayloads[path] ? structuredClone(mockPayloads[path]) : null;
}

export async function requestMarket(path, params = {}) {
  const url = new URL(path, API_BASE_URL);
  for (const [key, value] of Object.entries(params)) {
    if (value != null && value !== "") {
      url.searchParams.set(key, value);
    }
  }

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json"
      }
    });
    const body = await response.json().catch(() => null);

    if (!response.ok || body?.code !== 0) {
      throw new Error(body?.msg || `接口请求失败：${response.status}`);
    }

    return body.data;
  } catch (error) {
    const fallback = getMockPayload(path, params);
    if (ENABLE_DEMO_FALLBACK && fallback) {
      fallback.source = "demo";
      fallback.demoReason = error.message || "自有服务接口暂未返回数据";
      return fallback;
    }
    throw error;
  }
}
