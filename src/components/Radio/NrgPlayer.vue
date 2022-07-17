<script setup>
const playerSource = "https://cast.magicstreams.gr/sc/jziwpfyo/stream";
</script>

<template>
  <div class="p-4">
    <audio controls autoplay>
      <source :src="playerSource" type="audio/mp3" />
      Your browser does not support the audio element.
    </audio>
  </div>
</template>
