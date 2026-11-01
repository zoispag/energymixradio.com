import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import NrgPlayer from "./NrgPlayer.vue";
import { radio } from "@/store";

describe("NrgPlayer", () => {
  beforeEach(() => {
    vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
    vi.spyOn(HTMLMediaElement.prototype, "load").mockImplementation(() => {});
    radio.playing = false;
  });
  afterEach(() => vi.restoreAllMocks());

  it("starts idle with a play prompt", () => {
    const w = mount(NrgPlayer);
    expect(w.text()).toContain("Listen live");
    expect(w.find("button").text()).toContain("Listen live");
  });

  it("tunes in on click, goes on air once audio plays, and stops on second click", async () => {
    const w = mount(NrgPlayer);
    await w.find("button").trigger("click");
    expect(w.text()).toContain("Tuning in");
    expect(w.find("audio").element.getAttribute("src")).toContain("magicstreams");

    await w.find("audio").trigger("playing");
    expect(w.text()).toContain("On air");
    expect(radio.playing).toBe(true);
    expect(w.find("input[type=range]").exists()).toBe(true);

    await w.find("button").trigger("click");
    expect(w.text()).toContain("Listen live");
    expect(radio.playing).toBe(false);
  });

  it("tells the listener when the stream stays unreachable after retries", async () => {
    vi.useFakeTimers();
    HTMLMediaElement.prototype.play.mockRejectedValue(new Error("blocked"));
    const w = mount(NrgPlayer);
    await w.find("button").trigger("click");
    await vi.runAllTimersAsync();
    expect(w.text()).toContain("Stream unreachable");
    expect(w.find("button").text()).toContain("Listen live");
    vi.useRealTimers();
  });
});
