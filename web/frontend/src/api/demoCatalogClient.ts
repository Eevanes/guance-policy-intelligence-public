import type { PolicyContentResponse, PolicyDetailResponse, PolicyListParams, PolicyListResponse } from "../types";

const policies = ["A", "B", "C"].map((letter, index) => ({
  planid: `DEMO-${letter}`,
  title: `示例人才支持方案 ${letter}（演示）`,
  area: `示例地区${["甲", "乙", "丙"][index]}`,
  fyp: "演示规划期",
  plantype_label: "演示专项方案",
  body: `# 示例人才支持方案 ${letter}\n\n此内容为合成演示文本，不来自真实政策库。\n\n示例方案 ${letter}${["提供培训补助", "提供创新项目辅导", "支持短期使用共享空间"][index]}。`,
}));
const dataset = { generation_id: "demo-generation", revision: 1, total_documents: policies.length, partial: null, source: "demo_synthetic" as const };

function check(signal?: AbortSignal) {
  if (signal?.aborted) throw new DOMException("请求已取消", "AbortError");
}
function find(planid: string) {
  const policy = policies.find(item => item.planid === planid);
  if (!policy) throw new Error("未找到该演示政策");
  return policy;
}

export const demoCatalogClient = {
  async list(params: PolicyListParams = {}, signal?: AbortSignal): Promise<PolicyListResponse> {
    check(signal);
    const page = params.page ?? 1;
    const pageSize = params.page_size ?? 20;
    const query = params.q?.trim() ?? "";
    const items = policies.filter(policy =>
      (!query || policy.title.includes(query) || policy.body.includes(query))
      && (!params.area || policy.area === params.area)
      && (!params.fyp || policy.fyp === params.fyp)
      && (!params.plantype || policy.plantype_label === params.plantype),
    ).map(policy => ({
      planid: policy.planid, title: policy.title, area: policy.area,
      fyp: policy.fyp, plantype_label: policy.plantype_label,
      matches: query ? [{ field: policy.title.includes(query) ? "title" as const : "body" as const,
        offset: (policy.title.includes(query) ? policy.title : policy.body).indexOf(query),
        snippet: policy.title.includes(query) ? policy.title : policy.body }] : [],
    }));
    return {
      dataset, query: { q: query || null, area: params.area ?? null, fyp: params.fyp ?? null,
        plantype: params.plantype ?? null, match_mode: query ? "literal" : null },
      matched_documents: items.length, page, page_size: pageSize,
      total_pages: Math.ceil(items.length / pageSize),
      items: items.slice((page - 1) * pageSize, page * pageSize),
    };
  },
  async detail(planid: string, signal?: AbortSignal): Promise<PolicyDetailResponse> {
    check(signal);
    const policy = find(planid);
    const size = Array.from(policy.body).length;
    return { dataset, policy: { planid, title: policy.title, area: policy.area, fyp: policy.fyp,
      plantype_label: policy.plantype_label, body_chars: size,
      sections: [{ index: 0, level: 1, path: "演示文本", start: 0, end: size }] } };
  },
  async content(planid: string, offset = 0, limit = 4000, signal?: AbortSignal): Promise<PolicyContentResponse> {
    check(signal);
    const policy = find(planid);
    const chars = Array.from(policy.body);
    const text = chars.slice(offset, offset + limit).join("");
    return { dataset, planid, title: policy.title, offset, limit,
      total_chars: chars.length, has_more: offset + Array.from(text).length < chars.length, text };
  },
};
