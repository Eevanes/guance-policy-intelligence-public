import { expect, test } from "@playwright/test";

test("public demo: current research interface on desktop and mobile", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "今天想研究什么？" })).toBeVisible();
    await expect(page.getByRole("group", { name: "研究模式", exact: true }).getByRole("button")).toHaveCount(5);
    await expect(page.getByRole("textbox", { name: "研究需求" })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  expect(errors).toEqual([]);
});

test("public demo: question produces synthetic answer and references", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("textbox", { name: "研究需求" }).fill("示例人才方案提供什么支持？");
  await page.getByRole("button", { name: "发送消息" }).click();
  await expect(page.locator(".result-message")).toBeVisible({ timeout: 15000 });
  await expect(page.locator(".qa-reference-title").first()).toBeVisible();
  await expect(page.locator(".result-message")).toContainText("示例");
});

test("public demo: catalog search and original reading require no backend", async ({ page }) => {
  const apiCalls: string[] = [];
  page.on("request", request => { if (new URL(request.url()).pathname.startsWith("/api/")) apiCalls.push(request.url()); });
  await page.goto("/");
  await page.getByRole("navigation", { name: "主导航" }).getByRole("button", { name: "文献", exact: true }).click();
  await expect(page.getByText("当前库共有 3 篇政策文献")).toBeVisible();
  await page.getByRole("searchbox", { name: "关键词字面检索" }).fill("示例人才");
  await page.getByRole("button", { name: "检索目录" }).click();
  const result = page.getByRole("button", { name: /示例人才支持方案 A/ });
  await expect(result).toBeVisible();
  await result.click();
  await expect(page.getByRole("main", { name: "政策原文阅读" })).toBeVisible();
  await expect(page.getByText(/此内容为合成演示文本/)).toBeVisible();
  await page.getByRole("button", { name: "返回检索结果" }).click();
  await expect(page.getByRole("searchbox", { name: "关键词字面检索" })).toHaveValue("示例人才");
  expect(apiCalls).toEqual([]);
});
