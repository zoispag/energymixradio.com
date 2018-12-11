<template>
  <div class="py-2 hidden sm:block">
    <a
      href="https://twitter.com/EnergyMixRadio"
      class="twitter-follow-button"
      data-show-count="true"
      >Follow @EnergyMixRadio
    </a>
  </div>
</template>

<script>
export default {
  name: "NrgSocialTwitter",
  mounted() {
    !(function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = "//platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);
      }
      // eslint-disable-next-line
    })(document,"script","twitter-wjs");
  }
};
</script>

<style scoped lang="scss">
@import "../assets/styles/tailwind.postcss";
</style>
