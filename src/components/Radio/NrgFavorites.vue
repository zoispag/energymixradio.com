<script setup>
import { radio, toggleFavorite } from "@/store";
</script>

<template>
  <details v-if="radio.favorites.length" class="group mb-6 w-full max-w-sm px-2">
    <summary class="cursor-pointer select-none text-center text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300">
      ♥ Your favourites ({{ radio.favorites.length }})
    </summary>
    <ul class="mt-3 space-y-2">
      <li v-for="m in radio.favorites" :key="m" class="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2">
        <span class="min-w-0 flex-1 truncate text-left text-sm text-gray-200">{{ m }}</span>
        <a
          :href="`https://open.spotify.com/search/${encodeURIComponent(m)}`"
          target="_blank"
          rel="noopener"
          class="text-xs text-gray-400 underline hover:text-white"
          >Spotify</a
        >
        <button type="button" class="text-red-500" aria-label="Remove from favourites" @click="toggleFavorite(m)">♥</button>
      </li>
    </ul>
  </details>
</template>
