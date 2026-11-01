import { beforeEach, describe, expect, it, vi } from "vitest";

async function freshStore() {
  vi.resetModules();
  return import("@/store");
}

describe("store", () => {
  beforeEach(() => localStorage.clear());

  it("remembers tracks newest-first without duplicates", async () => {
    const { radio, remember } = await freshStore();
    remember("A - One", null);
    remember("B - Two", null);
    remember("A - One", null);
    expect(radio.history.map((t) => t.meta)).toEqual(["A - One", "B - Two"]);
  });

  it("caps history at 10 entries (now playing + 9 earlier) and persists it", async () => {
    const { radio, remember } = await freshStore();
    for (let i = 0; i < 12; i++) remember(`Artist - Track ${i}`, null);
    expect(radio.history).toHaveLength(10);
    expect(JSON.parse(localStorage.getItem("emr-history"))).toHaveLength(10);
  });

  it("ignores the loading placeholder", async () => {
    const { radio, remember } = await freshStore();
    remember("Loading...", null);
    remember("", null);
    expect(radio.history).toHaveLength(0);
  });

  it("toggles favourites and restores them on reload", async () => {
    const first = await freshStore();
    first.toggleFavorite("A - One");
    expect(first.radio.favorites).toEqual(["A - One"]);
    const second = await freshStore();
    expect(second.radio.favorites).toEqual(["A - One"]);
    second.toggleFavorite("A - One");
    expect(second.radio.favorites).toEqual([]);
  });
});
