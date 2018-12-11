<template>
  <div class="py-2">
    <iframe
      src="https://www.facebook.com/plugins/likebox.php?href=https%3A%2F%2Fwww.facebook.com%2Fpages%2FEnergyMixRadio%2F109462505812616&amp;width=292&amp;colorscheme=dark&amp;show_faces=false&amp;border_color&amp;stream=false&amp;header=false&amp;height=65"
      scrolling="no"
      frameborder="0"
      class="fb"
      allowTransparency="true"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: "NrgSocialFacebook"
};
</script>

<style scoped lang="scss">
@import "../assets/styles/tailwind.postcss";

.fb {
  border: none;
  overflow: hidden;
  width: 292px;
  height: 65px;
}
</style>
