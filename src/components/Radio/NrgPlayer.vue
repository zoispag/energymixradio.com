<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { radio } from "@/store";

const playerSource = "https://cast.magicstreams.gr/sc/jziwpfyo/stream";
const audio = ref(null);
const state = ref("idle"); // idle | loading | playing

const SITE_TITLE = "EnergyMixRadio";

watch(state, (v) => (radio.playing = v === "playing"));
// Sleep timer asks the player to stop
watch(
  () => radio.stopRequested,
  () => state.value !== "idle" && toggle()
);

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

function toggle() {
  const el = audio.value;
  if (state.value === "idle") {
    state.value = "loading";
    // Reload the source so we always join the live edge, not a stale buffer
    el.src = playerSource;
    el.play().catch(() => (state.value = "idle"));
  } else {
    el.pause();
    el.removeAttribute("src");
    el.load();
    state.value = "idle";
  }
}
</script>

<template>
  <div class="flex flex-col items-center p-4">
    <button
      type="button"
      class="player-btn relative grid place-items-center h-40 w-40 sm:h-48 sm:w-48 rounded-full text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300"
      :class="{ 'is-live': state === 'playing' }"
      :aria-label="state === 'idle' ? 'Play live radio' : 'Stop radio'"
      @click="toggle"
    >
      <span class="ring ring-1"></span>
      <span class="ring ring-2"></span>
      <span class="relative z-10 flex items-end gap-1.5 h-12" v-if="state === 'playing'">
        <i v-for="n in 5" :key="n" class="eq-bar" :style="{ animationDelay: n * 0.13 + 's' }"></i>
      </span>
      <span v-else-if="state === 'loading'" class="relative z-10 h-10 w-10 rounded-full border-4 border-white/30 border-t-white animate-spin"></span>
      <svg v-else class="relative z-10 h-16 w-16 ml-2" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
      </svg>
    </button>
    <p class="mt-5 text-xs uppercase tracking-[0.3em] text-gray-400">
      <span v-if="state === 'idle'">Tap to listen live</span>
      <span v-else-if="state === 'loading'">Tuning in…</span>
      <span v-else class="text-red-400">● On air</span>
    </p>
    <audio ref="audio" preload="none" @playing="state = 'playing'" @error="state = 'idle'"></audio>
  </div>
</template>

<style scoped>
.player-btn {
  background: radial-gradient(circle at 30% 25%, #ff5a4d, #b3001b 70%);
  box-shadow: 0 0 60px 8px rgba(239, 68, 68, 0.45);
  transition: transform 0.2s, box-shadow 0.3s;
}
.player-btn:hover {
  transform: scale(1.05);
}
.player-btn:active {
  transform: scale(0.97);
}
.ring {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  border: 2px solid rgba(239, 68, 68, 0.6);
  animation: pulse 2.4s ease-out infinite;
}
.ring-2 {
  animation-delay: 1.2s;
}
.is-live .ring {
  animation-duration: 1.4s;
}
.eq-bar {
  display: block;
  width: 8px;
  height: 100%;
  border-radius: 4px;
  background: #fff;
  transform-origin: bottom;
  animation: eq 0.9s ease-in-out infinite alternate;
}
@keyframes pulse {
  from { transform: scale(1); opacity: 0.8; }
  to { transform: scale(1.7); opacity: 0; }
}
@keyframes eq {
  from { transform: scaleY(0.2); }
  to { transform: scaleY(1); }
}
@media (prefers-reduced-motion: reduce) {
  .ring, .eq-bar { animation: none; }
}
</style>
