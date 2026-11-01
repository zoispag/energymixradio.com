<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const streamUrl =
  "https://cast.magicstreams.gr:2199/external/rpc.php?m=streaminfo.get&username=jziwpfyo&rid=jziwpfyo";

const interval = ref(null);
const rawResponse = ref("Loading...");
const artwork = ref(null);
let lastLookup = "";

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
    })
    .catch(() => (artwork.value = null));
}
</script>

<template>
  <div class="relative w-full max-w-sm my-6 px-2">
    <img
      v-if="artwork"
      :key="`bg-${artwork}`"
      :src="artwork"
      alt=""
      class="pointer-events-none absolute inset-0 -z-10 h-full w-full scale-150 rounded-3xl object-cover opacity-30 blur-3xl art-in"
    />
    <div class="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
      <div class="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-red-700 to-black">
        <img v-if="artwork" :key="artwork" :src="artwork" alt="Album cover" class="h-full w-full object-cover art-in" />
        <div v-else class="grid h-full w-full place-items-center text-3xl text-white/70">♪</div>
      </div>
      <div class="min-w-0 text-left">
        <div class="text-xs font-bold uppercase tracking-widest text-red-500">Now Playing</div>
        <div class="mt-1 text-sm sm:text-base text-gray-100 leading-snug break-words">{{ rawResponse }}</div>
      </div>
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
