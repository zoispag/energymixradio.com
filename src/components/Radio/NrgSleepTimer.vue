<script setup>
import { ref, computed, watch, onBeforeUnmount } from "vue";
import { radio } from "@/store";

const options = [15, 30, 60];
const endsAt = ref(null);
const now = ref(Date.now());
let tick = null;

const remaining = computed(() => (endsAt.value ? Math.max(0, endsAt.value - now.value) : 0));
const label = computed(() => {
  const s = Math.ceil(remaining.value / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
});

function start(min) {
  endsAt.value = Date.now() + min * 60000;
  now.value = Date.now();
  clearInterval(tick);
  tick = setInterval(() => {
    now.value = Date.now();
    if (now.value >= endsAt.value) {
      cancel();
      radio.stopRequested++;
    }
  }, 1000);
}

function cancel() {
  clearInterval(tick);
  endsAt.value = null;
}

// No point keeping a timer alive after the listener stops manually
watch(
  () => radio.playing,
  (p) => !p && endsAt.value && cancel()
);
onBeforeUnmount(() => clearInterval(tick));
</script>

<template>
  <div v-if="radio.playing" class="flex items-center gap-2 text-xs text-gray-400">
    <template v-if="endsAt">
      <span>😴 Stopping in <span class="font-mono text-gray-100">{{ label }}</span></span>
      <button type="button" class="underline hover:text-white" @click="cancel">cancel</button>
    </template>
    <template v-else>
      <span>Sleep timer:</span>
      <button
        v-for="m in options"
        :key="m"
        type="button"
        class="rounded-full border border-white/15 px-3 py-1 text-gray-200 transition hover:border-white/60 hover:text-white"
        @click="start(m)"
      >
        {{ m }} min
      </button>
    </template>
  </div>
</template>
