import { expect, test } from "@playwright/test";

const TRACKS = [
  "Giom - Light Years (Extended Mix)",
  "Above & Beyond - Sun & Moon",
  "Armin van Buuren - Blah Blah Blah",
  "Paul Thomas & Maze 28 - Abundance (Extended Mix)",
];

test.beforeEach(async ({ page }) => {
  let n = 0;
  await page.route("**/rpc.php**", (route) =>
    route.fulfill({
      json: { data: [{ rawmeta: TRACKS[Math.min(n++, TRACKS.length - 1)] }] },
    })
  );
  await page.route("**/itunes.apple.com/**", (route) =>
    route.fulfill({ json: { results: [] } })
  );
  // No real audio in CI: make play() succeed and report that playback started
  await page.addInitScript(() => {
    HTMLMediaElement.prototype.play = function () {
      queueMicrotask(() => this.dispatchEvent(new Event("playing")));
      return Promise.resolve();
    };
    HTMLMediaElement.prototype.pause = () => {};
    HTMLMediaElement.prototype.load = () => {};
  });
  await page.clock.install();
});

test("shows what's playing and offers the core actions", async ({ page }) => {
  await page.goto("/");
  await page.clock.runFor(100);
  await expect(page.getByText(TRACKS[0]).first()).toBeVisible();
  await expect(page.getByRole("button", { name: "Listen live" })).toBeVisible();
  await expect(page.getByRole("button", { name: /Share/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "Spotify" })).toBeVisible();
  await expect(page.getByText("Request a song")).toHaveCount(0);
});

test("play button goes on air, shows volume and sleep timer, and stops again", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Listen live" }).click();
  await expect(page.getByText("On air").first()).toBeVisible();
  await expect(page.getByLabel("Volume")).toBeVisible();
  await expect(page.getByRole("button", { name: /15 min/ })).toBeVisible();
  await expect(page).toHaveTitle(/^▶ /);

  await page.getByRole("button", { name: /Stop/ }).click();
  await expect(page.getByText("Listen live")).toBeVisible();
  await expect(page).toHaveTitle("EnergyMixRadio");
});

test("sleep timer stops the radio when it runs out", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Listen live" }).click();
  await page.getByRole("button", { name: /15 min/ }).click();
  await expect(page.getByText(/Stopping in/)).toBeVisible();
  await page.clock.runFor(15 * 60 * 1000 + 2000);
  await expect(page.getByText("Listen live")).toBeVisible();
});

test("spacebar toggles playback", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Space");
  await expect(page.getByText("On air").first()).toBeVisible();
  await page.keyboard.press("Space");
  await expect(page.getByText("Listen live")).toBeVisible();
});

test("favourites survive a reload", async ({ page }) => {
  await page.goto("/");
  await page.clock.runFor(100);
  await page.getByRole("button", { name: /Save .* to favourites/ }).first().click();
  await expect(page.getByText(/Your favourites \(1\)/)).toBeVisible();
  await page.reload();
  await expect(page.getByText(/Your favourites \(1\)/)).toBeVisible();
});

for (const size of [
  { width: 1280, height: 520 },
  { width: 1280, height: 600 },
  { width: 1366, height: 650 },
  { width: 1440, height: 700 },
  { width: 1920, height: 900 },
  { width: 1840, height: 1000 },
]) {
  test(`fits without scrolling on a ${size.width}x${size.height} laptop, even while playing`, async ({ page }) => {
    await page.setViewportSize(size);
    await page.goto("/");
    await page.clock.runFor(100);

    // Fill the worst case: playing (volume + sleep timer) with a full history
    await page.getByRole("button", { name: "Listen live" }).click();
    await page.clock.runFor(5100);
    await page.clock.runFor(5100);
    await page.clock.runFor(5100);
    await expect(page.getByText("Recently played")).toBeVisible();
    await page.getByRole("button", { name: /Save .* to favourites/ }).first().click();

    const overflow = await page.evaluate(() => ({
      scroll: document.documentElement.scrollHeight - window.innerHeight,
      sideways: document.documentElement.scrollWidth - window.innerWidth,
    }));
    expect(overflow.scroll).toBeLessThanOrEqual(0);
    expect(overflow.sideways).toBeLessThanOrEqual(0);
    // Everything important is actually inside the viewport
    for (const name of [/Share/, /Facebook/, /Follow/]) {
      const box = await page.getByRole("link", { name }).or(page.getByRole("button", { name })).first().boundingBox();
      expect(box.y + box.height).toBeLessThanOrEqual(size.height);
    }
  });
}

test("stays usable on a phone (scrolls vertically, never sideways)", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.clock.runFor(100);
  const sideways = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(sideways).toBeLessThanOrEqual(0);
  await expect(page.getByRole("button", { name: "Listen live" })).toBeVisible();
});

test("focus mode opens full-screen now-playing and closes with Escape", async ({ page }) => {
  await page.goto("/");
  await page.clock.runFor(100);
  await page.getByRole("button", { name: "Open focus mode" }).click();
  const dialog = page.getByRole("dialog", { name: "Focus mode" });
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("Light Years (Extended Mix)");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("tells the listener when the stream is unreachable, then recovers on retry", async ({ page }) => {
  await page.addInitScript(() => {
    window.__fail = true;
    HTMLMediaElement.prototype.play = function () {
      if (window.__fail) return Promise.reject(new Error("offline"));
      queueMicrotask(() => this.dispatchEvent(new Event("playing")));
      return Promise.resolve();
    };
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Listen live" }).click();
  await page.clock.runFor(60_000);
  await expect(page.getByText("Stream unreachable").first()).toBeVisible();

  await page.evaluate(() => (window.__fail = false));
  await page.getByRole("button", { name: "Listen live" }).click();
  await expect(page.getByText("On air").first()).toBeVisible();
});

test("iPhone visitors are pointed at the browser's own share menu for Add to Home Screen", async ({ browser }) => {
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/130.0 Mobile/15E148 Safari/604.1",
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.route("**/rpc.php**", (route) => route.fulfill({ json: { data: [{ rawmeta: "A - B" }] } }));
  await page.route("**/itunes.apple.com/**", (route) => route.fulfill({ json: { results: [] } }));
  await page.goto("/");
  await page.getByRole("button", { name: "Install app" }).click();
  await expect(page.getByText(/browser's own share button/)).toBeVisible();
  await expect(page.getByText(/Add to Home Screen/)).toBeVisible();
  await context.close();
});
