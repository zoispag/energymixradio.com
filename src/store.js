import { reactive } from "vue";

const KEY = "emr-history";

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch (e) {
    return [];
  }
}

export const radio = reactive({
  meta: "",
  artwork: null,
  playing: false,
  history: load(),
});

export function remember(meta, art) {
  if (!meta || meta === "Loading...") return;
  const list = radio.history.filter((t) => t.meta !== meta);
  list.unshift({ meta, art, at: Date.now() });
  radio.history = list.slice(0, 8);
  try {
    localStorage.setItem(KEY, JSON.stringify(radio.history));
  } catch (e) {
    /* storage unavailable */
  }
}
