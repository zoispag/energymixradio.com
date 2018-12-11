<template>
	<div>
		<strong><font color="red">Now Playing:</font></strong>
		&nbsp;
		<!-- <span class="cc_streaminfo" data-type="song" data-username="jziwpfyo">Loading...</span> -->
	</div>
</template>

<script>
export default {
  name: "NrgSongInfo",
  data () {
  	return {
  		url: 'http://cast.magicstreams.gr:9117/stats?sid=1&json=1&callback=func'
  	}
  },
  mounted () {
  	fetch(this.url).then(r => r.json())
	  .then(data => console.log(data))
	  .catch(e => console.log("Booo"))
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
