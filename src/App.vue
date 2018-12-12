<template>
  <div id="app" class="px-2 py-12">
    <Snowf
      v-if="showSnow"
      :amount="50"
      :size="5"
      :speed="1.5"
      :wind="0"
      :opacity="0.8"
      :swing="1"
      :image="null"
      :zIndex="null"
      :resize="true"
      color="#fff"
    />
    <NrgLogo />
    <NrgPlayer />
    <NrgSongInfo />
    <NrgSocialFacebook />
    <NrgSocialTwitter />
    <NrgFooter />
  </div>
</template>

<script>
import Snowf from "vue-snowf";
import NrgLogo from "./components/NrgLogo.vue";
import NrgPlayer from "./components/NrgPlayer.vue";
import NrgSongInfo from "./components/NrgSongInfo.vue";
import NrgSocialFacebook from "./components/NrgSocialFacebook.vue";
import NrgSocialTwitter from "./components/NrgSocialTwitter.vue";
import NrgFooter from "./components/NrgFooter.vue";

export default {
  name: "Nrg",
  components: {
    Snowf,
    NrgLogo,
    NrgPlayer,
    NrgSongInfo,
    NrgSocialFacebook,
    NrgSocialTwitter,
    NrgFooter
  },
  methods: {
    showSnow() {
      return new Date().getMonth() === 11;
    }
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
