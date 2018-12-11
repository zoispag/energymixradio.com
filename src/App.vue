<template>
  <div id="app">
    <NrgLogo />
    <NrgPlayer />
    <NrgSongInfo />
    <NrgSocialFacebook />
    <NrgSocialTwitter />
    <NrgFooter />
  </div>
</template>

<script>
import NrgLogo from "./components/NrgLogo.vue";
import NrgPlayer from "./components/NrgPlayer.vue";
import NrgSongInfo from "./components/NrgSongInfo.vue";
import NrgSocialFacebook from "./components/NrgSocialFacebook.vue";
import NrgSocialTwitter from "./components/NrgSocialTwitter.vue";
import NrgFooter from "./components/NrgFooter.vue";

export default {
  name: "Nrg",
  components: {
    NrgLogo,
    NrgPlayer,
    NrgSongInfo,
    NrgSocialFacebook,
    NrgSocialTwitter,
    NrgFooter
  }
};
</script>

<style lang="scss">
@import "assets/styles/tailwind.postcss";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
