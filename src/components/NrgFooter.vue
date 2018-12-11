<template>
  <footer class="text-grey-light text-xs">
    <span>
      <a class="link" href="http://cast.magicstreams.gr:9117">&copy;</a> 2010 -
      {{ new Date().getFullYear() }} EnergyMixRadio. All rights reserved.
      Designed by
      <span><a class="link" href="https://github.com/zoispag">ZP</a></span>
    </span>
  </footer>
</template>

<script>
export default {
  name: "NrgFooter"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/styles/tailwind.postcss";

.link {
  @apply .text-grey-light .no-underline .font-semibold;
}
</style>
