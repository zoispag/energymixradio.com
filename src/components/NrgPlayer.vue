<template>
	<audio controls autoplay="autoplay">
		<source :src="playerSource" type="audio/mp3">Your browser does not support the audio element.
	</audio>
</template>

<script>
export default {
  name: "NrgPlayer",
  data () {
  	return {
  	  playerSource: 'http://cast.magicstreams.gr:9117/;stream.mp3'
  	}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
