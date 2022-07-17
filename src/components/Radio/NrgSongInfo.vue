<script setup>
import { ref, onMounted, onBeforeMount } from "vue";

let streamUrl =
  "https://cast.magicstreams.gr:2199/external/rpc.php?m=streaminfo.get&username=jziwpfyo&rid=jziwpfyo";

const interval = ref(null);
const rawResponse = ref("Loading...");

// NrgRawMeta: "Loading...",
// NrgTrackTitle: "Loading...",
// NrgTrackArtist: "Loading...",

onMounted(() => {
  fetchSong();
  interval.value = setInterval(fetchSong, 5000);
});

onBeforeMount(() => {
  clearInterval(interval);
});

function fetchSong() {
  fetch(streamUrl, {
    method: "GET",
    mode: "cors",
  })
    .then((r) => r.json())
    .then(({ data }) => {
      const [info] = data;
      rawResponse.value = info.rawmeta;
    })
    .catch((error) => console.log(error));
}
</script>

<template>
  <div class="py-12 sm:py-2 pb-12 sm:pb-4 text-sm sm:text-base">
    <span class="text-red-500 font-bold">Now Playing:</span>&nbsp;
    <span class="text-gray-300">{{ rawResponse }}</span>
  </div>
</template>
