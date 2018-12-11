<template>
  <div>
    <span class="info-head">Now Playing:</span>&nbsp;
    <span>{{ NrgRawMeta }}</span>
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
      error: {}
    };
  },
  mounted() {
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
};
</script>

<style scoped lang="scss">
.info-head {
  color: red;
  font-weight: bold;
}
</style>
