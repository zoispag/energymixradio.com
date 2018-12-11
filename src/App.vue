<template>
  <div id="app" class="px-2 py-12">
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

body {
  @apply .bg-black;
}

#app {
  @apply .antialiased .text-center;
}
</style>
