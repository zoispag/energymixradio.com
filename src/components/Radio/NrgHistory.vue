<script setup>
import { computed } from "vue";
import { radio } from "@/store";

// The first entry is the track playing right now
const earlier = computed(() => radio.history.slice(1));

function ago(ts) {
  const m = Math.round((Date.now() - ts) / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m} min ago`;
  return `${Math.round(m / 60)} h ago`;
}
</script>

<template>
  <section v-if="earlier.length" class="w-full max-w-sm px-2 pb-6">
    <h2 class="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">Recently played</h2>
    <ol class="relative space-y-2 border-l border-red-900/60 pl-4">
      <li v-for="t in earlier" :key="t.at" class="relative flex items-center gap-3">
        <span class="absolute -left-[21px] h-2 w-2 rounded-full bg-red-600"></span>
        <img v-if="t.art" :src="t.art" alt="" class="h-10 w-10 rounded-md object-cover" loading="lazy" />
        <span v-else class="grid h-10 w-10 place-items-center rounded-md bg-white/5 text-white/50">♪</span>
        <span class="min-w-0 text-left">
          <span class="block truncate text-sm text-gray-200">{{ t.meta }}</span>
          <span class="block text-xs text-gray-500">{{ ago(t.at) }}</span>
        </span>
      </li>
    </ol>
  </section>
</template>
