import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import NrgSongInfo from "./NrgSongInfo.vue";
import { radio } from "@/store";

function mockFetch() {
  vi.stubGlobal(
    "fetch",
    vi.fn((url) => {
      const body = String(url).includes("itunes")
        ? { results: [{ artworkUrl100: "https://img.test/100x100bb.jpg" }] }
        : { data: [{ rawmeta: "Giom - Light Years (Extended Mix)" }] };
      return Promise.resolve({ json: () => Promise.resolve(body) });
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
    expect(w.find("img[alt='Album cover']").attributes("src")).toBe("https://img.test/400x400bb.jpg");
    const links = w.findAll("a").map((a) => a.text());
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

  it("still renders when the stream info request fails", async () => {
    vi.stubGlobal("fetch", vi.fn(() => Promise.reject(new Error("offline"))));
    vi.spyOn(console, "log").mockImplementation(() => {});
    const w = mount(NrgSongInfo);
    await flushPromises();
    expect(w.text()).toContain("Loading...");
    w.unmount();
  });
});
