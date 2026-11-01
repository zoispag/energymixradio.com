import { describe, expect, it, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import App from "./App.vue";

describe("App", () => {
  it("renders the core listening UI and no longer offers song requests", async () => {
    vi.stubGlobal("fetch", vi.fn(() => Promise.reject(new Error("offline"))));
    vi.spyOn(console, "log").mockImplementation(() => {});
    const w = mount(App);
    await flushPromises();
    expect(w.find("img[alt='EnergyMixRadio']").exists()).toBe(true);
    expect(w.findAll("button").some((b) => b.text().includes("Listen live"))).toBe(true);
    expect(w.text()).toContain("Share");
    expect(w.text()).toContain("Facebook");
    expect(w.text()).not.toContain("Request a song");
    w.unmount();
    vi.unstubAllGlobals();
  });
});
