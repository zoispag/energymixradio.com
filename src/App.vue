<template>
  <div id="app" class="px-2 py-12 bg-black">
    <NrgLogo />
    <NrgPlayer />
    <NrgSongInfo />
    <NrgSocialFacebook class="invisible sm:visible" />
    <NrgSocialTwitter class="hidden sm:block" />
    <NrgFooter class="invisible sm:visible" />
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
  @apply .antialiased .text-center;
}
</style>
