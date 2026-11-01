import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("**/rpc.php**", (route) =>
    route.fulfill({ json: { data: [{ rawmeta: "Giom - Light Years (Extended Mix)" }] } })
  );
  await page.route("**/itunes.apple.com/**", (route) => route.fulfill({ json: { results: [] } }));
  await page.addInitScript(() => {
    HTMLMediaElement.prototype.play = function () {
      queueMicrotask(() => this.dispatchEvent(new Event("playing")));
      return Promise.resolve();
    };
    HTMLMediaElement.prototype.pause = () => {};
    HTMLMediaElement.prototype.load = () => {};
  });
});

const scan = (page) =>
  new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"]).analyze();

function summarize(results) {
  return results.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(" ")).join(" | ")}`);
}

test("idle page has no axe violations", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Giom - Light Years").first()).toBeVisible();
  expect(summarize(await scan(page))).toEqual([]);
});

test("playing page (volume, timer, history, favourites) has no axe violations", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Listen live" }).click();
  await expect(page.getByText("On air").first()).toBeVisible();
  await page.getByRole("button", { name: /Save .* to favourites/ }).first().click();
  expect(summarize(await scan(page))).toEqual([]);
});

test("focus mode has no axe violations and manages focus", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Giom - Light Years").first()).toBeVisible();
  const trigger = page.getByRole("button", { name: "Open focus mode" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Focus mode" });
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute("aria-modal", "true");
  await expect(dialog.getByRole("button", { name: /Close/ })).toBeFocused();
  expect(summarize(await scan(page))).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("keyboard-only: every control is reachable and shows a visible focus indicator", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Giom - Light Years").first()).toBeVisible();
  const seen = new Set();
  for (let i = 0; i < 25; i++) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const cs = getComputedStyle(el);
      const visible = (cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0) || cs.boxShadow !== "none";
      return { name: el.getAttribute("aria-label") || el.textContent.trim().slice(0, 30), visible };
    });
    if (info) {
      expect(info.visible, `no focus indicator on "${info.name}"`).toBe(true);
      seen.add(info.name);
    }
  }
  expect(seen.size).toBeGreaterThan(5);
});

test("reduced motion stops decorative animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const running = await page.evaluate(() =>
    document.getAnimations().filter((a) => a.playState === "running" && a.effect?.target?.closest?.("#app")).length
  );
  expect(running).toBe(0);
});
