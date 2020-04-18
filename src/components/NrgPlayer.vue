<template>
  <div class="p-4">
    <audio controls autoplay>
      <source :src="playerSource" type="audio/mp3" />
      Your browser does not support the audio element.
    </audio>
  </div>
</template>

<script>
export default {
  name: "NrgPlayer",
  data() {
    return {
      playerSource: "https://cast.magicstreams.gr/sc/jziwpfyo/stream"
    };
  }
};
</script>

<style scoped lang="scss">
@import "../assets/styles/tailwind.postcss";
</style>
