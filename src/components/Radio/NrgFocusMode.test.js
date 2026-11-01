import { beforeEach, describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import NrgFocusMode from "./NrgFocusMode.vue";
import { radio } from "@/store";

describe("NrgFocusMode", () => {
  beforeEach(() => {
    radio.focusMode = false;
    radio.meta = "Giom - Light Years (Extended Mix)";
    radio.artwork = "https://img.test/400x400bb.jpg";
  });

  it("is closed by default and opens from the button", async () => {
    const w = mount(NrgFocusMode, { attachTo: document.body });
    expect(w.find("[role=dialog]").exists()).toBe(false);
    await w.find("button[aria-label='Open focus mode']").trigger("click");
    const dialog = w.find("[role=dialog]");
    expect(dialog.text()).toContain("Light Years (Extended Mix)");
    expect(dialog.text()).toContain("Giom");
    w.unmount();
  });

  it("toggles with F and closes with Escape", async () => {
    const w = mount(NrgFocusMode, { attachTo: document.body });
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "f" }));
    await w.vm.$nextTick();
    expect(radio.focusMode).toBe(true);
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    await w.vm.$nextTick();
    expect(radio.focusMode).toBe(false);
    w.unmount();
  });
});
