<template>
  <div class="py-12 sm:py-2 pb-12 sm:pb-4 text-sm sm:text-base">
    <span class="text-red font-bold">Now Playing:</span>&nbsp;
    <span class="text-grey-light">{{ NrgRawMeta }}</span>
  </div>
</template>

<script>
export default {
  name: "NrgSongInfo",
  data() {
    return {
      aUrl:
        "https://cast.magicstreams.gr:2199/external/rpc.php?m=streaminfo.get&username=jziwpfyo&rid=jziwpfyo",
      NrgRawMeta: "Loading...",
      NrgTrackTitle: "Loading...",
      NrgTrackArtist: "Loading...",
      error: {},
      interval: null
    };
  },
  mounted() {
    this.fetchSong();
    this.interval = setInterval(this.fetchSong, 5000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    fetchSong() {
      fetch(this.aUrl, {
        method: "GET",
        mode: "cors"
      })
        .then(r => r.json())
        .then(({ data }) => {
          const [info] = data;
          this.NrgRawMeta = info.rawmeta;
          this.NrgTrackTitle = info.track.title;
          this.NrgTrackArtist = info.track.artist;
        })
        .catch(e => (this.error = e));
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/styles/tailwind.postcss";
</style>
