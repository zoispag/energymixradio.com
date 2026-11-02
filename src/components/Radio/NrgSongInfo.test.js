import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import NrgSongInfo from "./NrgSongInfo.vue";
import { radio } from "@/store";

function mockFetch() {
  vi.stubGlobal(
    "fetch",
    vi.fn((url) => {
      if (String(url).includes("itunes")) {
        const body = { results: [{ artworkUrl100: "https://img.test/100x100bb.jpg" }] };
        return Promise.resolve({ ok: true, json: () => Promise.resolve(body) });
      }
      return Promise.resolve({ ok: true, text: () => Promise.resolve("Giom - Light Years (Extended Mix)\n") });
    })
  );
}

describe("NrgSongInfo", () => {
  beforeEach(() => {
    localStorage.clear();
    radio.favorites = [];
    radio.history = [];
    mockFetch();
  });
  afterEach(() => vi.unstubAllGlobals());

  it("shows the current track, its artwork and search links", async () => {
    const w = mount(NrgSongInfo);
    await flushPromises();
    expect(w.text()).toContain("Giom - Light Years (Extended Mix)");
    expect(w.find("img[alt^='Cover art for']").attributes("src")).toBe("https://img.test/400x400bb.jpg");
    const links = w.findAll("a").map((a) => a.text().replace(" (opens in a new tab)", ""));
    expect(links).toEqual(["Spotify", "Apple Music", "YouTube"]);
    expect(radio.history[0].meta).toBe("Giom - Light Years (Extended Mix)");
    w.unmount();
  });

  it("lets the listener favourite the current track", async () => {
    const w = mount(NrgSongInfo);
    await flushPromises();
    await w.find("button.heart").trigger("click");
    expect(radio.favorites).toEqual(["Giom - Light Years (Extended Mix)"]);
    expect(w.find("button.heart").text()).toBe("♥");
    w.unmount();
  });

  it("falls back to the Centova API when the proxied endpoint is missing", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn((url) => {
        const u = String(url);
        if (u.includes("now-playing")) return Promise.resolve({ ok: true, text: () => Promise.resolve("<!doctype html>") });
        if (u.includes("rpc.php")) return Promise.resolve({ ok: true, json: () => Promise.resolve({ data: [{ rawmeta: "Fallback - Track" }] }) });
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ results: [] }) });
      })
    );
    const w = mount(NrgSongInfo);
    await flushPromises();
    expect(w.text()).toContain("Fallback - Track");
    w.unmount();
  });

  it("still renders when the stream info request fails", async () => {
    vi.stubGlobal("fetch", vi.fn(() => Promise.reject(new Error("offline"))));
    vi.spyOn(console, "log").mockImplementation(() => {});
    const w = mount(NrgSongInfo);
    await flushPromises();
    expect(w.text()).toContain("Loading...");
    w.unmount();
  });
});
