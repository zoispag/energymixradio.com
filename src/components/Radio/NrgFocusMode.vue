<script setup>
import { computed, onBeforeUnmount, onMounted, watch } from "vue";
import { radio } from "@/store";

const parts = computed(() => {
  const [artist, ...rest] = radio.meta.split(" - ");
  return rest.length ? { artist, title: rest.join(" - ") } : { artist: "EnergyMixRadio", title: radio.meta };
});

function open() {
  radio.focusMode = true;
}
function close() {
  radio.focusMode = false;
}

function onKey(e) {
  if (e.target.tagName === "INPUT") return;
  if (e.key === "Escape") close();
  else if (e.key.toLowerCase() === "f" && !e.metaKey && !e.ctrlKey) radio.focusMode = !radio.focusMode;
}

// Fullscreen is a nicety; the overlay works without it
watch(
  () => radio.focusMode,
  (on) => {
    if (on && document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else if (!on && document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }
);

function onFullscreenChange() {
  if (!document.fullscreenElement) radio.focusMode = false;
}

onMounted(() => {
  window.addEventListener("keydown", onKey);
  document.addEventListener("fullscreenchange", onFullscreenChange);
});
onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKey);
  document.removeEventListener("fullscreenchange", onFullscreenChange);
});
</script>

<template>
  <button
    type="button"
    class="fixed right-4 top-4 z-20 rounded-full border border-white/15 bg-black/30 px-3 py-2 text-xs uppercase tracking-widest text-gray-300 backdrop-blur transition hover:border-white/60 hover:text-white"
    aria-label="Open focus mode"
    title="Focus mode (F)"
    @click="open"
  >
    ⤢ <span class="hidden sm:inline">Focus</span>
  </button>

  <Transition name="focus">
    <div
      v-if="radio.focusMode"
      class="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-black/85 px-6 text-center backdrop-blur-2xl"
      role="dialog"
      aria-label="Focus mode"
      @click="close"
    >
      <img
        v-if="radio.artwork"
        :src="radio.artwork"
        alt="Album cover"
        class="aspect-square w-[min(60vh,80vw)] rounded-2xl object-cover shadow-2xl shadow-black"
        :style="{ boxShadow: `0 0 120px -20px ${radio.accent}` }"
      />
      <div
        v-else
        class="grid aspect-square w-[min(60vh,80vw)] place-items-center rounded-2xl bg-linear-to-br from-red-700 to-black text-8xl text-white/60"
      >
        ♪
      </div>
      <div class="max-w-3xl">
        <div class="text-xs font-bold uppercase tracking-[0.3em] text-red-500">
          {{ radio.playing ? "● On air" : "Now playing" }}
        </div>
        <div class="mt-2 text-3xl font-bold text-white sm:text-5xl">{{ parts.title }}</div>
        <div class="mt-2 text-xl text-gray-300 sm:text-2xl">{{ parts.artist }}</div>
      </div>
      <button
        type="button"
        class="rounded-full border border-white/20 px-5 py-2 text-xs uppercase tracking-widest text-gray-300 hover:text-white"
        @click.stop="close"
      >
        Close · Esc
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.focus-enter-active,
.focus-leave-active {
  transition: opacity 0.4s ease;
}
.focus-enter-from,
.focus-leave-to {
  opacity: 0;
}
</style>
