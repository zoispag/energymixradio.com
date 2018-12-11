<template>
  <audio controls autoplay>
    <source :src="playerSource" type="audio/mp3" />
    Your browser does not support the audio element.
  </audio>
</template>

<script>
export default {
  name: "NrgPlayer",
  data() {
    return {
      playerSource: "https://cast.magicstreams.gr:9117/;stream.mp3"
    };
  }
};
</script>
