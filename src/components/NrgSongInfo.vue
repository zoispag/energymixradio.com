<template>
	<div>
		<strong>
			<font color="red">Now Playing:</font>
		</strong>
		&nbsp;
		<span>{{ NrgRawMeta }}</span>
	</div>
</template>

<script>
export default {
  name: "NrgSongInfo",
  data () {
  	return {
  		aUrl: 'http://cast.magicstreams.gr:2199/external/rpc.php?m=streaminfo.get&username=jziwpfyo&rid=jziwpfyo',
  		NrgRawMeta: 'Loading...',
  		NrgTrackTitle: 'Loading...',
  		NrgTrackArtist: 'Loading...'
  	}
  },

  mounted () {
  	fetch(this.aUrl).then(r => r.json())
	  .then(({data}) => {
	  	const [info] = data;
	  	this.NrgRawMeta = info.rawmeta;
	  	this.NrgTrackTitle = info.track.title;
	  	this.NrgTrackArtist = info.track.artist;
	  })
	  .catch(e => console.log('Something went wrong'))
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
