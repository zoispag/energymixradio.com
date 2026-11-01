<script setup>
import { radio, toggleFavorite } from "@/store";
</script>

<template>
  <details v-if="radio.favorites.length" class="group w-full max-w-sm px-2">
    <summary class="cursor-pointer select-none text-center text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300">
      <span aria-hidden="true">♥</span> Your favourites ({{ radio.favorites.length }})
    </summary>
    <ul class="mt-2 max-h-32 space-y-2 overflow-y-auto">
      <li v-for="m in radio.favorites" :key="m" class="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2">
        <span class="min-w-0 flex-1 truncate text-left text-sm text-gray-200">{{ m }}</span>
        <a
          :href="`https://open.spotify.com/search/${encodeURIComponent(m)}`"
          target="_blank"
          rel="noopener"
          class="text-xs text-gray-400 underline hover:text-white"
          >Spotify<span class="sr-only"> search for {{ m }} (opens in a new tab)</span></a
        >
        <button type="button" class="grid h-9 w-9 place-items-center text-red-500" :aria-label="`Remove ${m} from favourites`" @click="toggleFavorite(m)"><span aria-hidden="true">♥</span></button>
      </li>
    </ul>
  </details>
</template>
