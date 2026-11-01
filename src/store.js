import { reactive } from "vue";

const KEY = "emr-history";

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

function loadFavs() {
  try {
    return JSON.parse(localStorage.getItem("emr-favs")) || [];
  } catch {
    return [];
  }
}

export const radio = reactive({
  meta: "",
  artwork: null,
  playing: false,
  history: load(),
  favorites: loadFavs(),
  accent: "rgb(185 28 28)",
  focusMode: false,
});

// Average the vivid pixels of the cover to get a background accent colour
export function pickAccent(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const c = document.createElement("canvas");
        c.width = c.height = 24;
        const ctx = c.getContext("2d");
        ctx.drawImage(img, 0, 0, 24, 24);
        const d = ctx.getImageData(0, 0, 24, 24).data;
        let r = 0, g = 0, b = 0, w = 0;
        for (let i = 0; i < d.length; i += 4) {
          const mx = Math.max(d[i], d[i + 1], d[i + 2]);
          const mn = Math.min(d[i], d[i + 1], d[i + 2]);
          const weight = (mx - mn) * 1 + 8; // favour saturated pixels
          r += d[i] * weight; g += d[i + 1] * weight; b += d[i + 2] * weight; w += weight;
        }
        resolve(`rgb(${Math.round(r / w)} ${Math.round(g / w)} ${Math.round(b / w)})`);
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

export function remember(meta, art) {
  if (!meta || meta === "Loading...") return;
  const list = radio.history.filter((t) => t.meta !== meta);
  list.unshift({ meta, art, at: Date.now() });
  radio.history = list.slice(0, 10);
  try {
    localStorage.setItem(KEY, JSON.stringify(radio.history));
  } catch {
    /* storage unavailable */
  }
}

export function toggleFavorite(meta) {
  if (!meta || meta === "Loading...") return;
  radio.favorites = radio.favorites.includes(meta)
    ? radio.favorites.filter((m) => m !== meta)
    : [meta, ...radio.favorites].slice(0, 100);
  try {
    localStorage.setItem("emr-favs", JSON.stringify(radio.favorites));
  } catch {
    /* storage unavailable */
  }
}
