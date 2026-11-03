<script setup>
import { computed, ref, watch, onMounted, onBeforeUnmount } from "vue";
import { radio } from "@/store";

const playerSource = "https://cast.magicstreams.gr/sc/jziwpfyo/stream";
const audio = ref(null);
const state = ref("idle"); // idle | loading | playing

const volume = ref(1);
try {
  const saved = parseFloat(localStorage.getItem("emr-volume"));
  if (!Number.isNaN(saved)) volume.value = saved;
} catch {
  /* storage unavailable */
}
watch(volume, (v) => {
  if (audio.value) audio.value.volume = v;
  try {
    localStorage.setItem("emr-volume", String(v));
  } catch {
    /* storage unavailable */
  }
});
onMounted(() => (audio.value.volume = volume.value));

const SITE_TITLE = "EnergyMixRadio";

watch(state, (v) => (radio.playing = v === "playing"));
// Tab title + lock-screen / media-key controls so listening survives a locked phone
watch(
  () => [radio.playing, radio.meta, radio.artwork],
  ([playing, meta, artwork]) => {
    document.title = playing && meta ? `▶ ${meta} · ${SITE_TITLE}` : SITE_TITLE;
    if (!("mediaSession" in navigator) || !playing) return;
    const [artist, ...rest] = meta.split(" - ");
    navigator.mediaSession.metadata = new MediaMetadata({
      title: rest.length ? rest.join(" - ") : meta,
      artist: rest.length ? artist : SITE_TITLE,
      album: SITE_TITLE,
      artwork: artwork ? [{ src: artwork, sizes: "400x400", type: "image/jpeg" }] : [],
    });
    navigator.mediaSession.playbackState = "playing";
    navigator.mediaSession.setActionHandler("pause", toggle);
    navigator.mediaSession.setActionHandler("stop", toggle);
  }
);

function onKey(e) {
  if (e.code !== "Space" || /^(INPUT|TEXTAREA|BUTTON|A)$/.test(e.target.tagName)) return;
  e.preventDefault();
  toggle();
}
onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => window.removeEventListener("keydown", onKey));

const statusText = computed(() => {
  if (state.value === "loading") return reconnecting.value ? "Reconnecting to the stream" : "Tuning in";
  if (state.value === "playing") return "On air. Radio is playing.";
  return failed.value ? "Stream unreachable. Press play to retry." : "";
});

let wantPlay = false;
let retries = 0;
let retryTimer = null;
const reconnecting = ref(false);
const failed = ref(false);

function connect() {
  const el = audio.value;
  // Reload the source so we always join the live edge, not a stale buffer
  el.src = playerSource;
  el.play().catch(() => onDrop());
}

// Mobile networks drop live streams constantly; quietly rejoin instead of going silent
function onDrop() {
  if (!wantPlay) return;
  if (retries >= 6) {
    stop();
    failed.value = true;
    return;
  }
  reconnecting.value = true;
  state.value = "loading";
  clearTimeout(retryTimer);
  retryTimer = setTimeout(connect, Math.min(1000 * 2 ** retries++, 8000));
}

let stallTimer = null;
function onStall() {
  clearTimeout(stallTimer);
  stallTimer = setTimeout(onDrop, 6000);
}
function clearStall() {
  clearTimeout(stallTimer);
}

function onPlaying() {
  retries = 0;
  reconnecting.value = false;
  state.value = "playing";
}

function stop() {
  wantPlay = false;
  retries = 0;
  reconnecting.value = false;
  clearTimeout(retryTimer);
  clearTimeout(stallTimer);
  const el = audio.value;
  el.pause();
  el.removeAttribute("src");
  el.load();
  state.value = "idle";
}

function toggle() {
  if (state.value === "idle") {
    wantPlay = true;
    failed.value = false;
    state.value = "loading";
    connect();
  } else {
    stop();
  }
}
</script>

<template>
  <div class="flex flex-col items-center px-4 py-3 lg:py-3">
    <button
      type="button"
      class="player-btn inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] focus:outline-hidden focus-visible:ring-4 focus-visible:ring-white/70"
      :class="{ 'is-live': state === 'playing' }"
      @click="toggle"
    >
      <span v-if="state === 'loading'" class="h-4 w-4 animate-spin rounded-full border-2 border-black/15 border-t-black"></span>
      <svg v-else-if="state === 'idle'" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6 4v16l14-8z" />
      </svg>
      <svg v-else class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <rect x="6" y="6" width="12" height="12" rx="2" />
      </svg>
      <span v-if="state === 'idle'">Listen live</span>
      <span v-else-if="state === 'loading'">{{ reconnecting ? "Reconnecting…" : "Tuning in…" }}</span>
      <span v-else>On air</span>
      <!-- Always-moving bars: signals "audio, click me" without shouting -->
      <span class="eq" aria-hidden="true">
        <i v-for="n in 5" :key="n" class="eq-bar" :style="{ animationDelay: -n * 0.23 + 's' }"></i>
      </span>
    </button>
    <p v-if="state === 'idle' && failed" class="mt-3 text-xs uppercase tracking-[0.2em] text-amber-400" aria-hidden="true">
      Stream unreachable · tap to retry
    </p>
    <div v-if="state !== 'idle'" class="mt-2 flex items-center gap-3 text-gray-400">
      <span aria-hidden="true">{{ volume === 0 ? "🔇" : volume < 0.5 ? "🔉" : "🔊" }}</span>
      <input
        v-model.number="volume"
        :style="{ '--v': volume }"
        :aria-valuetext="`${Math.round(volume * 100)}%`"
        type="range"
        min="0"
        max="1"
        step="0.01"
        aria-label="Volume"
        class="vol"
      />
    </div>
    <p class="sr-only" role="status">{{ statusText }}</p>
    <!-- Live radio has no transcript or captions to offer -->
    <!-- eslint-disable-next-line vuejs-accessibility/media-has-caption -->
    <audio
      ref="audio"
      preload="none"
      @playing="onPlaying"
      @timeupdate="clearStall"
      @error="onDrop"
      @stalled="onStall"
      @ended="onDrop"
    ></audio>
  </div>
</template>

<style scoped>
.vol {
  -webkit-appearance: none;
  appearance: none;
  width: 11rem;
  height: 4px;
  border-radius: 9999px;
  background: linear-gradient(to right, #ef4444 calc(var(--v, 1) * 100%), rgb(255 255 255 / 0.2) 0);
  outline: none;
}
.vol::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 16px;
  width: 16px;
  border-radius: 9999px;
  background: #fff;
  cursor: pointer;
}
.vol::-moz-range-thumb {
  height: 16px;
  width: 16px;
  border: 0;
  border-radius: 9999px;
  background: #fff;
  cursor: pointer;
}
.player-btn {
  /* Calm, neutral "media player" look: no glowing red CTA that reads like an ad */
  background: linear-gradient(160deg, #fafafa, #d4d7dd);
  color: #111;
  box-shadow: 0 6px 20px rgb(0 0 0 / 0.5), 0 0 0 1px rgb(255 255 255 / 0.35);
  transition: transform 0.2s, box-shadow 0.3s;
}
.player-btn:hover {
  transform: translateY(-1px) scale(1.03);
  box-shadow: 0 8px 26px rgb(0 0 0 / 0.55), 0 0 0 1px rgb(255 255 255 / 0.6);
}
.player-btn:active {
  transform: scale(0.97);
}
.eq {
  display: inline-flex;
  align-items: center;
  gap: 2.5px;
  height: 1.1rem;
}
.eq-bar {
  display: block;
  width: 2.5px;
  height: 100%;
  border-radius: 2px;
  background: currentColor;
  transform-origin: center;
  animation: eq 0.9s ease-in-out infinite alternate;
}
.is-live .eq-bar {
  animation-duration: 0.55s;
}
@keyframes eq {
  from { transform: scaleY(0.25); }
  to { transform: scaleY(1); }
}
@media (prefers-reduced-motion: reduce) {
  .eq-bar { animation: none; transform: scaleY(0.6); }
}
</style>
