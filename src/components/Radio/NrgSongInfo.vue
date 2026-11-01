<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { radio, remember, pickAccent, toggleFavorite } from "@/store";

const streamUrl =
  "https://cast.magicstreams.gr:2199/external/rpc.php?m=streaminfo.get&username=jziwpfyo&rid=jziwpfyo";

const interval = ref(null);
const rawResponse = ref("Loading...");
const artwork = ref(null);
const links = computed(() => {
  const q = encodeURIComponent(rawResponse.value);
  return [
    { name: "Spotify", href: `https://open.spotify.com/search/${q}` },
    { name: "Apple Music", href: `https://music.apple.com/search?term=${q}` },
    { name: "YouTube", href: `https://www.youtube.com/results?search_query=${q}` },
  ];
});
let lastLookup = "";

watch(rawResponse, (v) => (radio.meta = v));
watch(artwork, async (v) => {
  radio.artwork = v;
  radio.accent = (v && (await pickAccent(v))) || "rgb(185 28 28)";
});

onMounted(() => {
  fetchSong();
  interval.value = setInterval(fetchSong, 5000);
});

onBeforeUnmount(() => {
  clearInterval(interval.value);
});

function fetchSong() {
  fetch(streamUrl, { method: "GET", mode: "cors" })
    .then((response) => response.json())
    .then((data) => {
      const meta = data.data[0].rawmeta;
      rawResponse.value = meta;
      if (meta !== lastLookup) {
        lastLookup = meta;
        fetchArtwork(meta);
      }
    })
    .catch((error) => console.log(error));
}

function fetchArtwork(meta) {
  artwork.value = null;
  const url = `https://itunes.apple.com/search?media=music&entity=song&limit=1&term=${encodeURIComponent(meta)}`;
  fetch(url)
    .then((r) => r.json())
    .then((res) => {
      if (meta !== lastLookup) return;
      const art = res.results?.[0]?.artworkUrl100;
      artwork.value = art ? art.replace("100x100", "400x400") : null;
      remember(meta, art ? art.replace("100x100", "200x200") : null);
    })
    .catch(() => {
      artwork.value = null;
      remember(meta, null);
    });
}
</script>

<template>
  <div class="relative w-full max-w-sm px-2">
    <!-- Announce track changes to screen readers without moving focus -->
    <p class="sr-only" role="status">{{ rawResponse === "Loading..." ? "" : `Now playing: ${rawResponse}` }}</p>
    <img
      v-if="artwork"
      :key="`bg-${artwork}`"
      :src="artwork"
      alt=""
      class="pointer-events-none absolute inset-0 -z-10 h-full w-full scale-150 rounded-3xl object-cover opacity-30 blur-3xl art-in"
    />
    <div class="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
      <div class="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-linear-to-br from-red-700 to-black">
        <img v-if="artwork" :key="artwork" :src="artwork" :alt="`Cover art for ${rawResponse}`" class="h-full w-full object-cover art-in" />
        <div v-else class="grid h-full w-full place-items-center text-3xl text-white/70" aria-hidden="true">♪</div>
      </div>
      <div class="min-w-0 flex-1 text-left">
        <div class="text-xs font-bold uppercase tracking-widest text-red-500">Now Playing</div>
        <div class="mt-1 text-sm sm:text-base text-gray-100 leading-snug break-words">{{ rawResponse }}</div>
      </div>
      <button
        type="button"
        class="heart grid h-9 w-9 shrink-0 place-items-center self-start text-2xl leading-none transition hover:scale-110"
        :class="radio.favorites.includes(rawResponse) ? 'text-red-500' : 'text-white/70 hover:text-white'"
        :aria-label="radio.favorites.includes(rawResponse) ? `Remove ${rawResponse} from favourites` : `Save ${rawResponse} to favourites`"
        :aria-pressed="radio.favorites.includes(rawResponse)"
        @click="toggleFavorite(rawResponse)"
      >
        <span aria-hidden="true">{{ radio.favorites.includes(rawResponse) ? "♥" : "♡" }}</span>
      </button>
    </div>
    <div v-if="artwork || rawResponse !== 'Loading...'" class="mt-2 flex items-center justify-center gap-2 text-xs">
      <span class="text-gray-400">Find this song:</span>
      <a
        v-for="l in links"
        :key="l.name"
        :href="l.href"
        target="_blank"
        rel="noopener"
        class="rounded-full border border-white/15 px-3 py-1 text-gray-200 transition hover:border-white/60 hover:text-white"
        >{{ l.name }}<span class="sr-only"> (opens in a new tab)</span></a
      >
    </div>
  </div>
</template>

<style scoped>
.art-in {
  animation: art-in 0.8s ease both;
}
@keyframes art-in {
  from { opacity: 0; transform: scale(1.08); }
}
</style>
