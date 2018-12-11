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
      playerSource: "http://cast.magicstreams.gr:9117/;stream.mp3"
    };
  }
};
</script>

<style scoped lang="scss">
@import "../assets/styles/tailwind.postcss";
</style>
